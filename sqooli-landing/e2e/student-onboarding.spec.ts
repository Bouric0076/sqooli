import { expect, test } from '@playwright/test'

test('assigned incomplete Student reaches dashboard with setup reminder', async ({ page }) => {
	await page.route('**/api/**', async (route) => {
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) })
	})
	await page.route('**/api/Auth/login*', async (route) => {
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
			status: true,
			message: 'Login Success',
			user: { userId: 'student-test', firstName: 'Test', lastName: 'Student', email: 'student@example.test', isEmailConfirmed: true, userType: 'Student', userRole: 'Student', dashboard: 'student', role: ['Student'], isProfileComplete: false, studentEnrollment: null },
			access_token: 'e2e-token',
		}) })
	})
	await page.route('**/api/Auth/me*', async (route) => {
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Current user retrieved successfully', data: { id: 'student-test', firstName: 'Test', lastName: 'Student', email: 'student@example.test', isVerified: true, userType: 'Student', roles: ['Student'], isProfileComplete: false, studentEnrollment: null } }) })
	})

	await page.goto('/login')
	await page.locator('#login-email').fill('student@example.test')
	await page.locator('#login-password').fill('not-a-real-password')
	await page.locator('button[type="submit"]').click()

	await expect(page).toHaveURL(/\/student$/)
	await expect(page.getByText('Complete your student profile', { exact: true })).toBeVisible()
	await expect(page.getByRole('link', { name: 'Add student information' })).toHaveAttribute('href', '/student/profile')
})

test('student account creation sends the optional phone to register init', async ({ page }) => {
	let requestBody: Record<string, unknown> | undefined
	await page.route('**/api/Auth/register/init*', async (route) => {
		requestBody = route.request().postDataJSON() as Record<string, unknown>
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Registration initiated' }) })
	})

	await page.goto('/onboarding/account?role=student')
	await page.getByLabel('First Name').fill('Test')
	await page.getByLabel('Last Name').fill('Student')
	await page.getByLabel('Email Address').fill('student-registration@example.test')
	await page.getByLabel('Phone Number (optional)').fill('0743000000')
	await page.getByLabel('Password', { exact: true }).fill('StrongPass123!')
	await page.getByLabel('Confirm Password').fill('StrongPass123!')
	await page.getByRole('button', { name: 'Create Account' }).click()

	await expect(page).toHaveURL(/\/onboarding\/verification-sent\?/) 
	await expect.poll(() => requestBody).toMatchObject({ firstName: 'Test', lastName: 'Student', email: 'student-registration@example.test', phone: '0743000000', password: 'StrongPass123!' })
})

test('student account creation explains the missing password symbol before submission', async ({ page }) => {
	let requestCount = 0
	await page.route('**/api/Auth/register/init*', async (route) => {
		requestCount += 1
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true }) })
	})

	await page.goto('/onboarding/account?role=student')
	await page.getByLabel('First Name').fill('Test')
	await page.getByLabel('Last Name').fill('Student')
	await page.getByLabel('Email Address').fill('password-policy@example.test')
	await page.getByLabel('Password', { exact: true }).fill('StrongPass123')
	await page.getByLabel('Confirm Password').fill('StrongPass123')
	await page.getByRole('button', { name: 'Create Account' }).click()

	await expect(page.getByText('Include at least one symbol, such as ! or @.', { exact: true })).toBeVisible()
	expect(requestCount).toBe(0)
})

test('unverified student is sent to verification with a resend action instead of the dashboard', async ({ page }) => {
	await page.route('**/api/Auth/login*', async (route) => {
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
			status: true,
			message: 'Login Success',
			user: { userId: 'unverified-student', email: 'unverified@example.test', isEmailConfirmed: false, userType: 'Pending', userRole: 'Pending', dashboard: 'student' },
			access_token: 'should-not-be-stored',
		}) })
	})
	let resendBody: Record<string, unknown> | undefined
	await page.route('**/api/Auth/resend-verification-email*', async (route) => {
		resendBody = route.request().postDataJSON() as Record<string, unknown>
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'If the email exists, a verification link has been sent' }) })
	})

	await page.goto('/login')
	await page.getByLabel('Email Address').fill('unverified@example.test')
	await page.getByLabel('Password', { exact: true }).fill('StrongPass123!')
	await page.getByRole('button', { name: 'Sign In', exact: true }).click()

	await expect(page).toHaveURL(/\/onboarding\/verification-sent\?/) 
	await expect(page.getByRole('heading', { name: 'Check your inbox' })).toBeVisible()
	await page.getByRole('button', { name: 'Resend verification email' }).click()
	await expect.poll(() => resendBody).toMatchObject({ email: 'unverified@example.test' })
})

test('pending login completes registration with an authenticated refresh before routing to Student', async ({ page }) => {
	let completionBody: Record<string, unknown> | undefined
	let meCalls = 0
	await page.route('**/api/Auth/login*', async (route) => {
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
			status: true,
			message: 'Login Success',
			user: { userId: 'pending-student', firstName: 'Test', lastName: 'Student', email: 'pending@example.test', isEmailConfirmed: true, userType: 'Pending', userRole: 'Pending', dashboard: 'admin', role: [], isProfileComplete: false },
			access_token: 'pending-token',
		}) })
	})
	await page.route('**/api/Auth/me*', async (route) => {
		meCalls += 1
		const pending = meCalls === 1
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: {
			id: 'pending-student', firstName: 'Test', lastName: 'Student', email: 'pending@example.test', isVerified: true,
			userType: pending ? 'Pending' : 'Student', userRole: pending ? 'Pending' : 'Student', roles: pending ? [] : ['Student'],
			isProfileComplete: pending ? false : true, dashboard: pending ? 'admin' : 'student',
		} }) })
	})
	await page.route('**/api/Auth/register/complete*', async (route) => {
		completionBody = route.request().postDataJSON() as Record<string, unknown>
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Registration completed successfully' }) })
	})

	await page.goto('/login')
	await page.getByLabel('Email Address').fill('pending@example.test')
	await page.getByLabel('Password', { exact: true }).fill('TemporaryPass123!')
	await page.getByRole('button', { name: 'Sign In', exact: true }).click()

	await expect(page).toHaveURL(/\/onboarding\/complete\?/) 
	await expect(page.getByRole('heading', { name: 'Complete your registration' })).toBeVisible()
	await page.getByLabel('Choose your Sqooli profile').selectOption('Student')
	await page.getByLabel('Gender').selectOption('Male')
	await page.getByLabel('Date of birth').fill('2005-04-22')
	await page.getByLabel('Address').fill('Nairobi')
	await page.getByRole('button', { name: 'Complete registration' }).click()

	await expect.poll(() => completionBody).toMatchObject({ email: 'pending@example.test', role: 'Student', gender: 'Male', dob: '2005-04-22', address: 'Nairobi' })
	await expect(page).toHaveURL(/\/student$/)
	await expect(page.getByRole('heading', { name: 'Welcome to Sqooli' })).toBeVisible()
	await expect(page.getByText('Add Student Information', { exact: true })).toBeVisible()
	expect(meCalls).toBe(3)
})

test('Student information modal syncs profile fields and enrollment IDs before refreshing the session', async ({ page }) => {
	let profileBody: Record<string, unknown> | undefined
	let enrollmentBody: Record<string, unknown> | undefined
	let meCalls = 0
	let enrollmentSaved = false
	await page.addInitScript(() => sessionStorage.setItem('sqooli-auth-session', JSON.stringify({ accessToken: 'student-token', user: { userId: 'student-setup', firstName: 'Test', lastName: 'Student', email: 'setup@example.test', isEmailConfirmed: true, userType: 'Student', userRole: 'Student', dashboard: 'student', role: ['Student'], gender: 'Male', dob: '2005-04-22', address: 'Nairobi', phone: '0743000000', isProfileComplete: false } })))
	await page.route('**/api/**', async (route) => {
		const url = route.request().url()
		if (/\/api\/Curricula(\?|$)/.test(url)) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [{ id: 1, name: 'CBC' }] }) })
		if (/\/api\/Educationlevels(\?|$)/.test(url)) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [{ id: 10, name: 'Secondary', curriculumId: 1 }] }) })
		if (/\/api\/GradeLevels(\?|$)/.test(url)) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [{ id: 20, name: 'Grade 10', curriculumId: 1, educationLevelId: 10 }] }) })
		if (/\/api\/Subject(\?|$)/.test(url)) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [{ id: 30, name: 'Mathematics', curriculumId: 1, educationLevelId: 10, gradeLevelId: 20 }, { id: 31, name: 'Chemistry', curriculumId: 1, educationLevelId: 10, gradeLevelId: 99 }] }) })
		if (/\/api\/Student\/my-enrollments(\?|$)/.test(url)) {
			const data = enrollmentSaved ? [{ curriculumId: 1, gradeLevelId: 20, subjects: [{ id: 30, name: 'Mathematics' }] }] : []
			return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data }) })
		}
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) })
	})
	await page.route('**/api/Auth/update-profile*', async (route) => {
		profileBody = route.request().postDataJSON() as Record<string, unknown>
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Profile updated successfully' }) })
	})
	await page.route('**/api/Auth/register/complete*', async (route) => {
		enrollmentBody = route.request().postDataJSON() as Record<string, unknown>
		enrollmentSaved = true
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Registration completed successfully' }) })
	})
	await page.route('**/api/Auth/me*', async (route) => {
		meCalls += 1
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: { id: 'student-setup', firstName: 'Test', lastName: 'Student', email: 'setup@example.test', isVerified: true, userType: 'Student', userRole: 'Student', roles: ['Student'], dashboard: 'student', isProfileComplete: false } }) })
	})

	await page.goto('/student')
	await page.getByRole('button', { name: 'Go' }).first().click()
	await expect(page.getByRole('dialog', { name: 'Add Student Information' })).toBeVisible()
	const meCallsBeforeSave = meCalls
	await page.locator('#student-curriculum').selectOption('1')
	await page.locator('#student-education').selectOption('10')
	await page.locator('#student-grade').selectOption('20')
	await expect(page.getByRole('button', { name: /Chemistry/ })).toHaveCount(0)
	await page.getByRole('button', { name: /Mathematics/ }).click()
	await page.getByRole('button', { name: 'Save Changes' }).click()

	await expect.poll(() => profileBody).toMatchObject({ role: 'Student', gender: 'Male', dob: '2005-04-22', address: 'Nairobi' })
	await expect.poll(() => enrollmentBody).toMatchObject({ role: 'Student', studentEnrollments: [{ curriculumId: 1, gradeLevelId: 20, schoolId: null, subjectIds: [30] }] })
	await expect.poll(() => meCalls).toBeGreaterThan(meCallsBeforeSave)
	await expect(page.getByRole('dialog', { name: 'Add Student Information' })).toBeHidden()
})

test('Student wallet activation persists the documented setup payload', async ({ page }) => {
	let setupBody: Record<string, unknown> | undefined
	await page.addInitScript(() => sessionStorage.setItem('sqooli-auth-session', JSON.stringify({ accessToken: 'student-token', user: { userId: 'student-wallet', firstName: 'Test', lastName: 'Student', email: 'wallet@example.test', isEmailConfirmed: true, userType: 'Student', userRole: 'Student', dashboard: 'student', role: ['Student'], isProfileComplete: true } })))
	await page.route('**/api/**', async (route) => {
		const url = route.request().url()
		if (/\/api\/wallet\/setup(\?|$)/.test(url)) {
			setupBody = route.request().postDataJSON() as Record<string, unknown>
			return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Wallet setup successful' }) })
		}
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) })
	})

	await page.goto('/student/wallet')
	await page.getByRole('button', { name: 'Activate Wallet' }).click()
	await page.getByLabel('Wallet phone number').fill('074300000')
	await page.getByRole('button', { name: 'Save & Continue' }).click()
	for (let index = 1; index <= 6; index += 1) await page.getByLabel(`Enter PIN digit ${index}`).fill(String(index))
	for (let index = 1; index <= 6; index += 1) await page.getByLabel(`Confirm PIN digit ${index}`).fill(String(index))
	await page.getByRole('dialog').getByRole('button', { name: 'Activate Wallet' }).click()

	await expect.poll(() => setupBody).toMatchObject({ pin: '123456', confirmPin: '123456', topUpMethodType: 'MPESA', topUpPhoneNumber: '074300000', topUpProvider: 'MPESA' })
	await expect(page.getByRole('heading', { name: 'Wallet activated successfully' })).toBeVisible()
})

test('invited student sets a password and returns to the student dashboard', async ({ page }) => {
	let passwordBody: Record<string, unknown> | undefined
	await page.addInitScript(() => sessionStorage.setItem('sqooli-auth-session', JSON.stringify({ accessToken: 'invite-token', user: { userId: 'invite-student', firstName: 'Invited', lastName: 'Student', email: 'invite@example.test', isEmailConfirmed: true, userType: 'Student', userRole: 'Student', dashboard: 'student', role: ['Student'], isProfileComplete: false } })))
	await page.route('**/api/**', async (route) => {
		const url = route.request().url()
		if (/\/api\/Auth\/set-password(\?|$)/.test(url)) {
			passwordBody = route.request().postDataJSON() as Record<string, unknown>
			return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Password set successfully' }) })
		}
		if (/\/api\/Auth\/me(\?|$)/.test(url)) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: { id: 'invite-student', firstName: 'Invited', lastName: 'Student', email: 'invite@example.test', isVerified: true, userType: 'Student', userRole: 'Student', roles: ['Student'], dashboard: 'student', isProfileComplete: false } }) })
		return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) })
	})

	await page.goto('/set-password?redirect=%2Fstudent&email=invite%40example.test')
	await expect(page.getByRole('heading', { name: 'Set your password' })).toBeVisible()
	await page.getByLabel('New password').fill('StrongPass123!')
	await page.getByLabel('Confirm password').fill('StrongPass123!')
	await page.getByRole('button', { name: 'Set password' }).click()

	await expect.poll(() => passwordBody).toMatchObject({ password: 'StrongPass123!', confirmPassword: 'StrongPass123!', currentPassword: null })
	await expect(page).toHaveURL(/\/student$/)
})
