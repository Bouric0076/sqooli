import { expect, test, type Page } from '@playwright/test'

test.describe('public layout regressions', () => {
  async function seedStudentSession(page: Page) {
    await page.addInitScript(() => sessionStorage.setItem('sqooli-auth-session', JSON.stringify({
      accessToken: 'layout-e2e-token',
      user: { userId: 'layout-student', firstName: 'Layout', lastName: 'Student', email: 'layout@example.test', isEmailConfirmed: true, userType: 'Student', userRole: 'Student', dashboard: 'student', role: ['Student'], isProfileComplete: false },
    })))
    await page.route('**/api/**', async route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) }))
  }

  test('course detail keeps the shared header styled at desktop and mobile widths', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/courses/detail')

    await expect(page.locator('.udbc-brand img')).toHaveCSS('width', '90px')
    await expect(page.locator('.udbc-site-nav')).toBeVisible()
    await expect(page.locator('.udbc-menu-toggle')).toBeHidden()

    await page.setViewportSize({ width: 768, height: 720 })
    await expect(page.locator('.udbc-menu-toggle')).toBeVisible()
    await expect(page.locator('.udbc-site-nav')).toBeHidden()
    await page.getByRole('button', { name: 'Toggle UDBC navigation' }).click()
    await expect(page.locator('.udbc-site-nav')).toBeVisible()
    await expect(page.locator('.udbc-site-nav a')).toHaveCount(4)
  })

  test('class result actions use the branded focus treatment', async ({ page }) => {
    await page.goto('/search?tab=Classes')
    const addToCart = page.getByRole('button', { name: 'Add to Cart' }).first()

    await expect(addToCart).toBeVisible()
    await addToCart.click()
    await expect(addToCart).toHaveCSS('outline-style', 'none')
  })

  test('booking dialog stays within the viewport and scrolls its content', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/search?tab=Classes')
    await page.getByRole('button', { name: 'Book a Slot' }).first().click()

    const dialog = page.getByRole('dialog', { name: 'Book a Slot' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Save & Continue' })).toHaveCSS('border-radius', '999px')
    await expect(dialog.getByRole('button', { name: 'Back' }).last()).toHaveCSS('border-radius', '999px')
    const box = await dialog.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.y).toBeGreaterThanOrEqual(0)
    expect(box!.y + box!.height).toBeLessThanOrEqual(720)
    expect(await dialog.locator('.booking-flow-modal__content').evaluate(element => element.scrollHeight >= element.clientHeight)).toBeTruthy()
  })

  test('student dashboard exposes styled assignments search and performance page', async ({ page }) => {
    await seedStudentSession(page)
    await page.goto('/student/assignments')
    await expect(page.locator('.student-assignments-page__header label')).toHaveCSS('border-radius', '999px')

    await page.goto('/student/performance')
    await expect(page.getByRole('heading', { name: 'Performance insights are coming soon', exact: true })).toBeVisible()
    await expect(page.getByText('Detailed scores, progress trends, and subject insights will appear here once assessment results are available.', { exact: true })).toBeVisible()

    await page.goto('/student/wallet')
    await expect(page.getByRole('heading', { name: 'Wallet', exact: true })).toBeVisible()

    await page.goto('/student/cart')
    await expect(page.getByRole('heading', { name: 'Shopping Cart is coming soon', exact: true })).toBeVisible()
  })

  test('lesson details route explains that the feature is coming soon', async ({ page }) => {
    await seedStudentSession(page)
    await page.unroute('**/api/**')
    let requestedUrl = ''
    await page.route('**/api/Lesson/47*', async route => {
      requestedUrl = route.request().url()
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: true, data: { id: 47, name: 'Physics – Form 4', description: 'A physics lesson', subject: 'Physics', status: 'Available' } }),
      })
    })

    await page.goto('/student/lessons/47')

    await expect(page.getByRole('heading', { name: 'Lesson details are coming soon', exact: true })).toBeVisible()
    await expect(page.getByText('Detailed topics, resources, assessments, tutor information, and lesson actions will be available here soon.', { exact: true })).toBeVisible()
    expect(requestedUrl).toBe('')
  })

  test('student lesson cards collapse to one column on narrow screens', async ({ page }) => {
    await seedStudentSession(page)
    await page.unroute('**/api/**')
    await page.route('**/api/Student/my-enrollments*', async route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: true, data: [{ id: 1, isEnrollmentComplete: true }] }),
    }))
    await page.route('**/api/Lesson?*', async route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: true, data: [{ id: 2, name: 'Responsive lesson', description: 'A lesson for narrow screens' }] }),
    }))
    await page.setViewportSize({ width: 360, height: 720 })
    await page.goto('/student/lessons')

    const grid = page.locator('.student-lessons-page__grid')
    await expect(grid).toBeVisible()
    await expect(page.locator('.student-lesson-card')).toHaveCount(1)
    expect((await grid.evaluate(element => getComputedStyle(element).gridTemplateColumns)).trim().split(/\s+/)).toHaveLength(1)
    expect(await page.locator('.student-lessons-page').evaluate(element => element.scrollWidth <= element.clientWidth)).toBeTruthy()
  })

  test('student forums page does not preserve a desktop minimum width on mobile', async ({ page }) => {
    await seedStudentSession(page)
    await page.setViewportSize({ width: 360, height: 720 })
    await page.goto('/student/forums')

    const unavailable = page.locator('.student-feature-unavailable')
    await expect(unavailable).toBeVisible()
    expect(await unavailable.evaluate(element => element.scrollWidth <= element.clientWidth)).toBeTruthy()
  })

  test('teacher lessons renders the authenticated lesson collection', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('sqooli-auth-session', JSON.stringify({
      accessToken: 'layout-teacher-token',
      user: { userId: 'layout-teacher', firstName: 'Layout', lastName: 'Teacher', email: 'teacher@example.test', isEmailConfirmed: true, userType: 'Teacher', userRole: 'Teacher', dashboard: 'teacher', role: ['Teacher'], isProfileComplete: true },
    })))
    await page.route('**/api/**', async route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) }))
    await page.unroute('**/api/**')
    await page.route('**/api/Lesson?*', async route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: true, data: [{ id: 91, name: 'Teacher API lesson', createdAt: '2026-08-27T08:00:00Z' }] }),
    }))
    await page.goto('/teacher/lessons')

    await expect(page.getByRole('heading', { name: 'Teacher API lesson', exact: true })).toBeVisible()
    await expect(page.getByText('No lessons match your search.', { exact: true })).toHaveCount(0)
  })

  test('teacher create lesson submits catalog IDs and backend timing fields', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('sqooli-auth-session', JSON.stringify({
      accessToken: 'create-teacher-token',
      user: { userId: 'create-teacher', firstName: 'Create', lastName: 'Teacher', email: 'teacher@example.test', isEmailConfirmed: true, userType: 'Teacher', userRole: 'Teacher', dashboard: 'teacher', role: ['Teacher'], isProfileComplete: true },
    })))
    await page.route('**/api/**', async route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) }))
    await page.unroute('**/api/**')
    const catalog = (items: unknown[]) => ({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: items }) })
    await page.route('**/api/LessonType*', async route => route.fulfill(catalog([{ id: 1, name: 'Lecture' }])))
    await page.route('**/api/Programs*', async route => route.fulfill(catalog([{ id: 10, name: 'CBC Term 1', curriculumId: 11, curriculum: { id: 11, name: 'CBC' }, subPrograms: [{ id: 14, name: 'Term 1' }] }])))
    await page.route('**/api/Curricula*', async route => route.fulfill(catalog([{ id: 11, name: 'CBC' }])))
    await page.route('**/api/Educationlevels*', async route => route.fulfill(catalog([{ id: 12, name: 'Secondary' }])))
    await page.route('**/api/GradeLevels*', async route => route.fulfill(catalog([{ id: 13, name: 'Form 4', curriculumId: 11, educationLevelId: 12 }])))
    await page.route('**/api/Subject*', async route => route.fulfill(catalog([{ id: 20, name: 'Physics', curriculumId: 11, gradeLevelId: 13, educationLevelId: 12 }])))
    await page.route('**/api/Topics*', async route => route.fulfill(catalog([{ id: 30, name: 'Mechanics', curriculumId: 11, subjectId: 20, gradeLevelId: 13, educationLevelId: 12 }])))
    await page.route('**/api/Lesson?*', async route => route.fulfill(catalog([])))
    let requestBody: Record<string, unknown> | undefined
    await page.route('**/api/Lesson?api-version=*', async route => {
      if (route.request().method() === 'POST') {
        requestBody = route.request().postDataJSON() as Record<string, unknown>
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, message: 'Lesson created successfully' }) })
      } else await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: true, data: [] }) })
    })
    await page.goto('/teacher/lessons')
    await page.getByRole('button', { name: 'Create Lesson' }).click()
    await page.getByLabel('Lesson Title').fill('Mechanics introduction')
    const selects = page.locator('.teacher-create-lesson__content select')
    await selects.nth(0).selectOption('1')
    await selects.nth(1).selectOption('10')
    await selects.nth(2).selectOption('12')
    await selects.nth(3).selectOption('13')
    await selects.nth(4).selectOption('14')
    await selects.nth(5).selectOption('20')
    await page.getByRole('button', { name: /Mechanics/ }).click()
    await page.getByLabel('Start Date').fill('2026-09-01')
    await selects.nth(6).selectOption({ label: '08:00 AM' })
    await page.getByLabel('Duration').fill('60')
    for (let step = 0; step < 5; step += 1) await page.getByRole('button', { name: /Save & Continue/ }).click()
    await page.getByRole('button', { name: 'Submit Lesson' }).click()

    await expect.poll(() => requestBody).toMatchObject({ lessonTypeId: '1', curriculumId: 11, subjectId: '20', gradeLevelId: '13', educationLevelId: '12', topicId: '30', programId: '10', subProgramId: 14, name: 'Mechanics introduction', date: '2026-09-01' })
    expect(requestBody?.start).toBe('08:00')
    expect(requestBody?.end).toBe('09:00')
  })
})
