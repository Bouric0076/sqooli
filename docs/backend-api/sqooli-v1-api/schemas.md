# Data models

[Back to index](README.md)

Schemas from `components.schemas` in the OpenAPI document.

## Index

- [`AcceptSlotInvitationDto`](#schema-acceptslotinvitationdto)
- [`AcceptTeacherInviteRequest`](#schema-acceptteacherinviterequest)
- [`AcceptTermsRequest`](#schema-accepttermsrequest)
- [`AdminModel`](#schema-adminmodel)
- [`ApiResponseOfLessonDetailsDto`](#schema-apiresponseoflessondetailsdto)
- [`ApiResponseOfListOfInvitedTeacherDto`](#schema-apiresponseoflistofinvitedteacherdto)
- [`ApiResponseOfObject`](#schema-apiresponseofobject)
- [`ApiResponseOfstring`](#schema-apiresponseofstring)
- [`AssessmentType`](#schema-assessmenttype)
- [`AssignTeacherToLessonRequest`](#schema-assignteachertolessonrequest)
- [`AssignedTeacherDto`](#schema-assignedteacherdto)
- [`AttachResourceRequest`](#schema-attachresourcerequest)
- [`BookLessonRequest`](#schema-booklessonrequest)
- [`BookingStatus`](#schema-bookingstatus)
- [`BreakRequest`](#schema-breakrequest)
- [`BulkInviteRequest`](#schema-bulkinviterequest)
- [`BulkLessonObjectiveRequest`](#schema-bulklessonobjectiverequest)
- [`BusinessHourRequest`](#schema-businesshourrequest)
- [`CProgramRequest`](#schema-cprogramrequest)
- [`CertificateLevelModel`](#schema-certificatelevelmodel)
- [`ContractGetResponse`](#schema-contractgetresponse)
- [`ContractModel`](#schema-contractmodel)
- [`ContractRequest`](#schema-contractrequest)
- [`ContractType`](#schema-contracttype)
- [`CreateAssignmentRequest`](#schema-createassignmentrequest)
- [`CreateExamRequest`](#schema-createexamrequest)
- [`CreateQuestionOptionRequest`](#schema-createquestionoptionrequest)
- [`CreateQuestionRequest`](#schema-createquestionrequest)
- [`CreateQuestionTypeDto`](#schema-createquestiontypedto)
- [`CreateQuizRequest`](#schema-createquizrequest)
- [`CreateResourceRequest`](#schema-createresourcerequest)
- [`CurriculaModel`](#schema-curriculamodel)
- [`CurriculaRequest`](#schema-curricularequest)
- [`DayOfWeek`](#schema-dayofweek)
- [`EducationlevelsGetResponse`](#schema-educationlevelsgetresponse)
- [`EducationlevelsModel`](#schema-educationlevelsmodel)
- [`EducationlevelsRequest`](#schema-educationlevelsrequest)
- [`EnrollmentItem`](#schema-enrollmentitem)
- [`ExamAnswerRequest`](#schema-examanswerrequest)
- [`GoogleLoginRequest`](#schema-googleloginrequest)
- [`GradeAssignmentRequest`](#schema-gradeassignmentrequest)
- [`GradeExamRequest`](#schema-gradeexamrequest)
- [`GradeLevelsGetResponse`](#schema-gradelevelsgetresponse)
- [`GradeLevelsModel`](#schema-gradelevelsmodel)
- [`GradeLevelsRequest`](#schema-gradelevelsrequest)
- [`HolidayRequest`](#schema-holidayrequest)
- [`InviteRequest`](#schema-inviterequest)
- [`InviteTeacherRequest`](#schema-inviteteacherrequest)
- [`InvitedTeacherDto`](#schema-invitedteacherdto)
- [`LessonBookingModel`](#schema-lessonbookingmodel)
- [`LessonContentRequest`](#schema-lessoncontentrequest)
- [`LessonDetailsDto`](#schema-lessondetailsdto)
- [`LessonLectureDto`](#schema-lessonlecturedto)
- [`LessonLectureItemDto`](#schema-lessonlectureitemdto)
- [`LessonLectureItemType`](#schema-lessonlectureitemtype)
- [`LessonModel`](#schema-lessonmodel)
- [`LessonObjectiveRequest`](#schema-lessonobjectiverequest)
- [`LessonPricingDto`](#schema-lessonpricingdto)
- [`LessonRequest`](#schema-lessonrequest)
- [`LessonSectionDto`](#schema-lessonsectiondto)
- [`LessonTypeGetResponse`](#schema-lessontypegetresponse)
- [`LessonTypeModel`](#schema-lessontypemodel)
- [`LessonTypeRequest`](#schema-lessontyperequest)
- [`LicenseDto`](#schema-licensedto)
- [`LoginRequest`](#schema-loginrequest)
- [`MpesaPaymentNotification`](#schema-mpesapaymentnotification)
- [`MpesaTopupRequest`](#schema-mpesatopuprequest)
- [`MpesaWithdrawRequest`](#schema-mpesawithdrawrequest)
- [`NewTeacherItem`](#schema-newteacheritem)
- [`OptionDto`](#schema-optiondto)
- [`ParentModel`](#schema-parentmodel)
- [`PaymentModel`](#schema-paymentmodel)
- [`PaymentStatus`](#schema-paymentstatus)
- [`PinRequest`](#schema-pinrequest)
- [`ProgramBusinessHourModel`](#schema-programbusinesshourmodel)
- [`ProgramGetResponse`](#schema-programgetresponse)
- [`ProgramHolidayModel`](#schema-programholidaymodel)
- [`ProgramModel`](#schema-programmodel)
- [`ProgramRequest`](#schema-programrequest)
- [`ProgramScheduleModel`](#schema-programschedulemodel)
- [`ProgramTypeModel`](#schema-programtypemodel)
- [`ProgramTypeRequest`](#schema-programtyperequest)
- [`ProgramsModel`](#schema-programsmodel)
- [`QuestionDto`](#schema-questiondto)
- [`QuestionGrade`](#schema-questiongrade)
- [`QuizAnswerRequest`](#schema-quizanswerrequest)
- [`RegisterCompleteRequest`](#schema-registercompleterequest)
- [`RegisterInitRequest`](#schema-registerinitrequest)
- [`RejectSlotInvitationDto`](#schema-rejectslotinvitationdto)
- [`ResendVerificationEmailRequest`](#schema-resendverificationemailrequest)
- [`RevenueShareDto`](#schema-revenuesharedto)
- [`SaveQualificationsDto`](#schema-savequalificationsdto)
- [`ScheduleBreakModel`](#schema-schedulebreakmodel)
- [`ScheduleRequest`](#schema-schedulerequest)
- [`SchoolAdminModel`](#schema-schooladminmodel)
- [`SchoolModel`](#schema-schoolmodel)
- [`SchoolType`](#schema-schooltype)
- [`SchoolTypeCreateDto`](#schema-schooltypecreatedto)
- [`SchoolTypeUpdateDto`](#schema-schooltypeupdatedto)
- [`SectionDto`](#schema-sectiondto)
- [`SlotInvitationModel`](#schema-slotinvitationmodel)
- [`SlotItem`](#schema-slotitem)
- [`SlotResponseRequest`](#schema-slotresponserequest)
- [`SlotStatus`](#schema-slotstatus)
- [`StudentEnrollmentRequest`](#schema-studentenrollmentrequest)
- [`StudentModel`](#schema-studentmodel)
- [`SubProgramGradeLevelModel`](#schema-subprogramgradelevelmodel)
- [`SubProgramModel`](#schema-subprogrammodel)
- [`SubProgramRequest`](#schema-subprogramrequest)
- [`SubProgramSlotModel`](#schema-subprogramslotmodel)
- [`SubProgramSubjectModel`](#schema-subprogramsubjectmodel)
- [`SubjectCategoryGetResponse`](#schema-subjectcategorygetresponse)
- [`SubjectCategoryModel`](#schema-subjectcategorymodel)
- [`SubjectCategoryRequest`](#schema-subjectcategoryrequest)
- [`SubjectGetResponse`](#schema-subjectgetresponse)
- [`SubjectItem`](#schema-subjectitem)
- [`SubjectModel`](#schema-subjectmodel)
- [`SubjectRequest`](#schema-subjectrequest)
- [`SubmitAssignmentRequest`](#schema-submitassignmentrequest)
- [`SubmitExamRequest`](#schema-submitexamrequest)
- [`SubmitQuizRequest`](#schema-submitquizrequest)
- [`TeacherEnrollmentRequest`](#schema-teacherenrollmentrequest)
- [`TeacherModel`](#schema-teachermodel)
- [`TeacherSelfEnrollmentRequest`](#schema-teacherselfenrollmentrequest)
- [`TopicGetResponse`](#schema-topicgetresponse)
- [`TopicRequest`](#schema-topicrequest)
- [`TopicsModel`](#schema-topicsmodel)
- [`TransferRequest`](#schema-transferrequest)
- [`UpdateLessonRequirementsRequest`](#schema-updatelessonrequirementsrequest)
- [`UpdateProfileRequest`](#schema-updateprofilerequest)
- [`UserModel`](#schema-usermodel)
- [`VerificationEmailRequest`](#schema-verificationemailrequest)

### AcceptSlotInvitationDto {#schema-acceptslotinvitationdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | no |  |

Example:

```json
{
  "token": "string"
}
```

### AcceptTeacherInviteRequest {#schema-acceptteacherinviterequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | yes |  |
| `password` | `string` | yes |  |

Example:

```json
{
  "token": "string",
  "password": "string"
}
```

### AcceptTermsRequest {#schema-accepttermsrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptTerms` | `boolean` | no |  |

Example:

```json
{
  "acceptTerms": true
}
```

### AdminModel {#schema-adminmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `schoolId` | `integer` (int32) \| `null` | no |  |
| `school` | `null` \| [`SchoolModel`](#schema-schoolmodel) | no |  |
| `avatarUrl` | `string` \| `null` | no |  |

Example:

```json
{
  "id": 0,
  "userId": "string",
  "user": {
    "firstName": "string",
    "lastName": "string",
    "userType": "string",
    "nationalId": "string",
    "nationality": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "isActive": true,
    "isVerified": true,
    "address": "string",
    "chatId": "string",
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "createdAt": "2026-01-15T08:00:00Z",
    "lastLoginAt": "2026-01-15T08:00:00Z",
    "transactionPinHash": "string",
    "referralCode": "string",
    "referredByUserId": "string",
    "referredByUser": null,
    "referrals": null,
    "adminProfileId": 0,
    "teacherProfileId": 0,
    "studentProfileId": 0,
    "parentProfileId": 0,
    "adminProfile": null,
    "teacherProfile": null,
    "studentProfile": null,
    "parentProfile": null,
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2026-01-15T08:00:00Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
  },
  "schoolId": 0,
  "school": null,
  "avatarUrl": "string"
}
```

### ApiResponseOfLessonDetailsDto {#schema-apiresponseoflessondetailsdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `null` \| [`LessonDetailsDto`](#schema-lessondetailsdto) | no |  |
| `error` | `null` \| [`LessonDetailsDto`](#schema-lessondetailsdto) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": null,
  "error": null
}
```

### ApiResponseOfListOfInvitedTeacherDto {#schema-apiresponseoflistofinvitedteacherdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `array` of [`InvitedTeacherDto`](#schema-invitedteacherdto) \| `null` | no |  |
| `error` | `array` of [`InvitedTeacherDto`](#schema-invitedteacherdto) \| `null` | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "string",
      "accepted": true,
      "expiresAt": "2026-01-15T08:00:00Z",
      "isExpired": true,
      "invitedAt": "2026-01-15T08:00:00Z"
    }
  ],
  "error": [
    {
      "id": 0,
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "string",
      "accepted": true,
      "expiresAt": "2026-01-15T08:00:00Z",
      "isExpired": true,
      "invitedAt": "2026-01-15T08:00:00Z"
    }
  ]
}
```

### ApiResponseOfObject {#schema-apiresponseofobject}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `any` | no |  |
| `error` | `any` | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": null,
  "error": null
}
```

### ApiResponseOfstring {#schema-apiresponseofstring}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `string` \| `null` | no |  |
| `error` | `string` \| `null` | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": "string",
  "error": "string"
}
```

### AssessmentType {#schema-assessmenttype}

Type: `integer`

Example:

```json
0
```

### AssignTeacherToLessonRequest {#schema-assignteachertolessonrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | yes |  |
| `teacherId` | `integer` (int32) | yes |  |

Example:

```json
{
  "lessonId": 0,
  "teacherId": 0
}
```

### AssignedTeacherDto {#schema-assignedteacherdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `teacherId` | `integer` (int32) | no |  |
| `name` | `string` | no |  |
| `email` | `string` | no |  |

Example:

```json
{
  "teacherId": 0,
  "name": "string",
  "email": "string"
}
```

### AttachResourceRequest {#schema-attachresourcerequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entityType` | `string` | no |  |
| `entityId` | `integer` (int32) | no |  |
| `usageType` | `string` \| `null` | no |  |
| `order` | `integer` (int32) \| `null` | no |  |

Example:

```json
{
  "entityType": "string",
  "entityId": 0,
  "usageType": "string",
  "order": 0
}
```

### BookLessonRequest {#schema-booklessonrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | yes |  |
| `paymentMethod` | `string` | yes |  |
| `email` | `string` \| `null` | no |  |

Example:

```json
{
  "lessonId": 0,
  "paymentMethod": "string",
  "email": "string"
}
```

### BookingStatus {#schema-bookingstatus}

Type: `integer`

Example:

```json
0
```

### BreakRequest {#schema-breakrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `startTime` | `string` | no |  |
| `endTime` | `string` | no |  |

Example:

```json
{
  "name": "string",
  "startTime": "string",
  "endTime": "string"
}
```

### BulkInviteRequest {#schema-bulkinviterequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `subjectId` | `integer` (int32) | no |  |
| `teacherIds` | `array` of `integer` (int32) | no |  |
| `slots` | `array` of [`SlotItem`](#schema-slotitem) | no |  |
| `teachers` | `array` of [`NewTeacherItem`](#schema-newteacheritem) | no |  |

Example:

```json
{
  "subjectId": 0,
  "teacherIds": [
    0
  ],
  "slots": [
    {
      "slotId": 0
    }
  ],
  "teachers": [
    {
      "id": 0,
      "fullName": "string",
      "phone": "string",
      "email": "string",
      "bio": "string",
      "workplace": "string",
      "isNew": true,
      "address": "string",
      "nationalId": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "enrollments": [
        {
          "curriculumId": null,
          "gradeLevelId": null,
          "subjects": null
        }
      ]
    }
  ]
}
```

### BulkLessonObjectiveRequest {#schema-bulklessonobjectiverequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `objectives` | `array` of `string` | no |  |

Example:

```json
{
  "lessonId": 0,
  "objectives": [
    "string"
  ]
}
```

### BusinessHourRequest {#schema-businesshourrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `day` | [`DayOfWeek`](#schema-dayofweek) | no |  |
| `isActive` | `boolean` | no |  |

Example:

```json
{
  "day": 0,
  "isActive": true
}
```

### CProgramRequest {#schema-cprogramrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `programName` | `string` | no |  |
| `programTypeId` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | no |  |
| `programStartDate` | `string` (date-time) | no |  |
| `programEndDate` | `string` (date-time) | no |  |
| `hasSubPrograms` | `boolean` | no |  |
| `subPrograms` | `array` of [`SubProgramRequest`](#schema-subprogramrequest) | no |  |
| `schedules` | `array` of [`ScheduleRequest`](#schema-schedulerequest) | no |  |
| `holidays` | `array` of [`HolidayRequest`](#schema-holidayrequest) | no |  |
| `businessHours` | `array` of [`BusinessHourRequest`](#schema-businesshourrequest) | no |  |
| `slotDurationMinutes` | `integer` (int32) | no |  |

Example:

```json
{
  "programName": "string",
  "programTypeId": 0,
  "curriculumId": 0,
  "programStartDate": "2026-01-15T08:00:00Z",
  "programEndDate": "2026-01-15T08:00:00Z",
  "hasSubPrograms": true,
  "subPrograms": [
    {
      "name": "string",
      "educationLevelId": 0,
      "gradeLevelIds": [
        0
      ],
      "gradeLevelId": 0,
      "subjectIds": [
        0
      ],
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z",
      "slotDurationMinutes": 0
    }
  ],
  "schedules": [
    {
      "dayOfWeek": 0,
      "isActive": true,
      "startTime": "string",
      "endTime": "string",
      "breaks": [
        {
          "name": null,
          "startTime": null,
          "endTime": null
        }
      ]
    }
  ],
  "holidays": [
    {
      "holidayName": "string",
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z"
    }
  ],
  "businessHours": [
    {
      "day": 0,
      "isActive": true
    }
  ],
  "slotDurationMinutes": 0
}
```

### CertificateLevelModel {#schema-certificatelevelmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "id": 0,
  "name": "string"
}
```

### ContractGetResponse {#schema-contractgetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`ContractModel`](#schema-contractmodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "content": "string",
    "contractType": 0
  }
}
```

### ContractModel {#schema-contractmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `title` | `string` | yes |  |
| `content` | `string` | yes |  |
| `contractType` | [`ContractType`](#schema-contracttype) | yes |  |

Example:

```json
{
  "id": 0,
  "title": "string",
  "content": "string",
  "contractType": 0
}
```

### ContractRequest {#schema-contractrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | yes |  |
| `content` | `string` | yes |  |
| `contractType` | [`ContractType`](#schema-contracttype) | yes |  |

Example:

```json
{
  "title": "string",
  "content": "string",
  "contractType": 0
}
```

### ContractType {#schema-contracttype}

Type: `integer`

Example:

```json
0
```

### CreateAssignmentRequest {#schema-createassignmentrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `type` | [`AssessmentType`](#schema-assessmenttype) | no |  |
| `sections` | `array` of [`SectionDto`](#schema-sectiondto) | no |  |

Example:

```json
{
  "name": "string",
  "description": "string",
  "type": 0,
  "sections": [
    {
      "title": "string",
      "questions": [
        {
          "text": null,
          "type": null,
          "options": null,
          "correctAnswerIndex": null,
          "educationLevelId": null,
          "gradeLevelId": null,
          "subjectId": null,
          "topicId": null
        }
      ]
    }
  ]
}
```

### CreateExamRequest {#schema-createexamrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `title` | `string` | no |  |
| `description` | `string` | no |  |
| `startTime` | `string` (date-time) | no |  |
| `endTime` | `string` (date-time) | no |  |
| `isPublished` | `boolean` | no |  |
| `questionIds` | `array` of `integer` (int32) | no |  |

Example:

```json
{
  "lessonId": 0,
  "title": "string",
  "description": "string",
  "startTime": "2026-01-15T08:00:00Z",
  "endTime": "2026-01-15T08:00:00Z",
  "isPublished": true,
  "questionIds": [
    0
  ]
}
```

### CreateQuestionOptionRequest {#schema-createquestionoptionrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `optionText` | `string` | yes |  |
| `optionLabel` | `string` | yes |  |
| `isCorrect` | `boolean` | no |  |

Example:

```json
{
  "optionText": "string",
  "optionLabel": "string",
  "isCorrect": true
}
```

### CreateQuestionRequest {#schema-createquestionrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `topicId` | `integer` (int32) | yes |  |
| `text` | `string` | yes |  |
| `questionTypeId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `subjectId` | `integer` (int32) | yes |  |
| `options` | `array` of [`CreateQuestionOptionRequest`](#schema-createquestionoptionrequest) \| `null` | no |  |

Example:

```json
{
  "topicId": 0,
  "text": "string",
  "questionTypeId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "subjectId": 0,
  "options": [
    {
      "optionText": "string",
      "optionLabel": "string",
      "isCorrect": true
    }
  ]
}
```

### CreateQuestionTypeDto {#schema-createquestiontypedto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | no |  |
| `name` | `string` | no |  |
| `isAutomaticallyGradable` | `boolean` | no |  |

Example:

```json
{
  "code": "string",
  "name": "string",
  "isAutomaticallyGradable": true
}
```

### CreateQuizRequest {#schema-createquizrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `title` | `string` | no |  |
| `description` | `string` \| `null` | no |  |
| `isPublished` | `boolean` | no |  |
| `questionIds` | `array` of `integer` (int32) | no |  |

Example:

```json
{
  "lessonId": 0,
  "title": "string",
  "description": "string",
  "isPublished": true,
  "questionIds": [
    0
  ]
}
```

### CreateResourceRequest {#schema-createresourcerequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resourceType` | `string` | no |  |
| `title` | `string` | no |  |
| `description` | `string` \| `null` | no |  |
| `isPublic` | `boolean` | no |  |

Example:

```json
{
  "resourceType": "string",
  "title": "string",
  "description": "string",
  "isPublic": true
}
```

### CurriculaModel {#schema-curriculamodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |
| `acronym` | `string` | yes |  |
| `schools` | [`schools`](#schema-schools) | no |  |

Example:

```json
{
  "id": 0,
  "name": "string",
  "acronym": "string",
  "schools": null
}
```

### CurriculaRequest {#schema-curricularequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |
| `acronym` | `string` | yes |  |

Example:

```json
{
  "name": "string",
  "acronym": "string"
}
```

### DayOfWeek {#schema-dayofweek}

Type: `integer`

Example:

```json
0
```

### EducationlevelsGetResponse {#schema-educationlevelsgetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  }
}
```

### EducationlevelsModel {#schema-educationlevelsmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "id": 0,
  "curriculumId": 0,
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "name": "string"
}
```

### EducationlevelsRequest {#schema-educationlevelsrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "curriculumId": 0,
  "name": "string"
}
```

### EnrollmentItem {#schema-enrollmentitem}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) \| `null` | no |  |
| `gradeLevelId` | `integer` (int32) \| `null` | no |  |
| `subjects` | `array` of [`SubjectItem`](#schema-subjectitem) \| `null` | no |  |

Example:

```json
{
  "curriculumId": 0,
  "gradeLevelId": 0,
  "subjects": [
    {
      "id": 0,
      "name": "string",
      "curriculumId": 0,
      "gradeLevelId": 0
    }
  ]
}
```

### ExamAnswerRequest {#schema-examanswerrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `questionId` | `integer` (int32) | no |  |
| `answerText` | `string` \| `null` | no |  |
| `selectedOptionLabel` | `string` \| `null` | no |  |

Example:

```json
{
  "questionId": 0,
  "answerText": "string",
  "selectedOptionLabel": "string"
}
```

### GoogleLoginRequest {#schema-googleloginrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idToken` | `string` | no |  |
| `referralCode` | `string` \| `null` | no |  |

Example:

```json
{
  "idToken": "string",
  "referralCode": "string"
}
```

### GradeAssignmentRequest {#schema-gradeassignmentrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionId` | `integer` (int32) | no |  |
| `score` | `integer` (int32) | no |  |
| `feedback` | `string` | no |  |

Example:

```json
{
  "submissionId": 0,
  "score": 0,
  "feedback": "string"
}
```

### GradeExamRequest {#schema-gradeexamrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grades` | `array` of [`QuestionGrade`](#schema-questiongrade) | no |  |

Example:

```json
{
  "grades": [
    {
      "questionId": 0,
      "score": 0,
      "feedback": "string"
    }
  ]
}
```

### GradeLevelsGetResponse {#schema-gradelevelsgetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "name": "string"
  }
}
```

### GradeLevelsModel {#schema-gradelevelsmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `educationLevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "id": 0,
  "curriculumId": 0,
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "educationLevelId": 0,
  "educationLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  },
  "name": "string"
}
```

### GradeLevelsRequest {#schema-gradelevelsrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "curriculumId": 0,
  "educationLevelId": 0,
  "name": "string"
}
```

### HolidayRequest {#schema-holidayrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `holidayName` | `string` | no |  |
| `startDate` | `string` (date-time) | no |  |
| `endDate` | `string` (date-time) | no |  |

Example:

```json
{
  "holidayName": "string",
  "startDate": "2026-01-15T08:00:00Z",
  "endDate": "2026-01-15T08:00:00Z"
}
```

### InviteRequest {#schema-inviterequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `emails` | `array` of `string` | no |  |

Example:

```json
{
  "emails": [
    "string"
  ]
}
```

### InviteTeacherRequest {#schema-inviteteacherrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fullName` | `string` | no |  |
| `email` | `string` | no |  |
| `phone` | `string` | no |  |
| `role` | `string` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `curriculumId` | `integer` (int32) \| `null` | no |  |
| `educationLevelId` | `integer` (int32) \| `null` | no |  |
| `gradeLevelId` | `integer` (int32) \| `null` | no |  |
| `certificateLevelId` | `integer` (int32) \| `null` | no |  |
| `subjectId` | `integer` (int32) \| `null` | no |  |
| `address` | `string` \| `null` | no |  |
| `gender` | `string` \| `null` | no |  |
| `tscNumber` | `string` \| `null` | no |  |
| `dob` | `string` (date) \| `null` | no |  |
| `workplace` | `string` \| `null` | no |  |

Example:

```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "role": "string",
  "nationalId": "string",
  "curriculumId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "certificateLevelId": 0,
  "subjectId": 0,
  "address": "string",
  "gender": "string",
  "tscNumber": "string",
  "dob": "2026-01-15",
  "workplace": "string"
}
```

### InvitedTeacherDto {#schema-invitedteacherdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `fullName` | `string` | no |  |
| `email` | `string` | no |  |
| `phone` | `string` | no |  |
| `role` | `string` | no |  |
| `accepted` | `boolean` | no |  |
| `expiresAt` | `string` (date-time) | no |  |
| `isExpired` | `boolean` | no |  |
| `invitedAt` | `string` (date-time) | no |  |

Example:

```json
{
  "id": 0,
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "role": "string",
  "accepted": true,
  "expiresAt": "2026-01-15T08:00:00Z",
  "isExpired": true,
  "invitedAt": "2026-01-15T08:00:00Z"
}
```

### LessonBookingModel {#schema-lessonbookingmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `studentId` | `integer` (int32) | no |  |
| `student` | [`StudentModel`](#schema-studentmodel) | no |  |
| `lessonId` | `integer` (int32) | no |  |
| `lesson` | [`LessonModel`](#schema-lessonmodel) | no |  |
| `teacherId` | `integer` (int32) | no |  |
| `teacher` | [`TeacherModel`](#schema-teachermodel) | no |  |
| `status` | [`BookingStatus`](#schema-bookingstatus) | no |  |
| `amount` | `number` | no |  |
| `start` | `string` (date-time) | yes |  |
| `end` | `string` (date-time) | yes |  |
| `scheduledAt` | `string` (date-time) | no |  |
| `meetingLink` | `string` \| `null` | no |  |
| `eventId` | `string` \| `null` | no |  |
| `createdAt` | `string` (date-time) | no |  |

Example:

```json
{
  "id": 0,
  "studentId": 0,
  "student": {
    "id": 0,
    "userId": "string",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "admissionNumber": "string",
    "fullName": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "createdAt": "2026-01-15T08:00:00Z",
    "avatarUrl": "string"
  },
  "lessonId": 0,
  "lesson": {
    "id": 0,
    "createdByUserId": "string",
    "createdByUser": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "lessonTypeId": 0,
    "curriculumId": 0,
    "subjectId": 0,
    "gradeLevelId": 0,
    "educationLevelId": 0,
    "topicId": 0,
    "programId": 0,
    "name": "string",
    "description": "string",
    "requirements": "string",
    "link": "string",
    "eventId": "string",
    "isDeleted": true,
    "isApproved": true,
    "start": "2026-01-15T08:00:00Z",
    "end": "2026-01-15T08:00:00Z",
    "created_at": "2026-01-15T08:00:00Z",
    "status": "string",
    "price": 0,
    "isStarted": true,
    "startedAt": "2026-01-15T08:00:00Z",
    "endedAt": "2026-01-15T08:00:00Z",
    "liveRoomId": "string",
    "schoolId": 0,
    "school": null,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "subject": {
      "id": 0,
      "categoryId": 0,
      "category": {
        "id": null,
        "name": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationlevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "gradeLevelId": 0,
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "name": "string",
      "colorCode": "string",
      "subProgramSubjects": []
    },
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "lessonType": {
      "id": 0,
      "name": "string"
    },
    "topic": {
      "id": 0,
      "curriculumId": 0,
      "subjectId": 0,
      "gradeLevelId": 0,
      "educationLevelId": 0,
      "name": "string",
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "subject": {
        "id": null,
        "categoryId": null,
        "category": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationlevel": null,
        "gradeLevelId": null,
        "gradeLevel": null,
        "name": null,
        "colorCode": null,
        "subProgramSubjects": null
      },
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "educationlevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      }
    },
    "slotId": 0,
    "slot": {
      "id": 0,
      "subProgramId": 0,
      "subProgram": {
        "id": null,
        "programId": null,
        "program": null,
        "name": null,
        "educationLevelId": null,
        "educationLevel": null,
        "startDate": null,
        "endDate": null,
        "slotDurationMinutes": null,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      },
      "gradeLevelId": 0,
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "slotDate": "2026-01-15T08:00:00Z",
      "startTime": "string",
      "endTime": "string",
      "status": 0,
      "code": "string",
      "subjectId": 0,
      "subjectName": "string",
      "subject": {
        "id": null,
        "categoryId": null,
        "category": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationlevel": null,
        "gradeLevelId": null,
        "gradeLevel": null,
        "name": null,
        "colorCode": null,
        "subProgramSubjects": null
      },
      "teacherId": 0,
      "teacherName": "string",
      "teacher": {
        "id": null,
        "userId": null,
        "user": null,
        "certificateLevelId": null,
        "certificateLevel": null,
        "fullName": null,
        "nationalId": null,
        "phone": null,
        "address": null,
        "bio": null,
        "gender": null,
        "tscNumber": null,
        "dob": null,
        "workplace": null,
        "nationality": null,
        "createdAt": null,
        "isIndependent": null,
        "hasAcceptedContract": null,
        "hasAcceptedTerms": null,
        "termsAcceptedAt": null,
        "avatarUrl": null
      },
      "lessonId": 0,
      "lesson": null,
      "invitations": []
    },
    "program": {
      "id": 0,
      "programName": "string",
      "programTypeId": 0,
      "programType": {
        "id": null,
        "name": null,
        "colorCode": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "programStartDate": "2026-01-15T08:00:00Z",
      "programEndDate": "2026-01-15T08:00:00Z",
      "hasSubPrograms": true,
      "subPrograms": [],
      "schedules": [],
      "holidays": null,
      "businessHours": null
    }
  },
  "teacherId": 0,
  "teacher": {
    "id": 0,
    "userId": "string",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "certificateLevelId": 0,
    "certificateLevel": {
      "id": 0,
      "name": "string"
    },
    "fullName": "string",
    "nationalId": "string",
    "phone": "string",
    "address": "string",
    "bio": "string",
    "gender": "string",
    "tscNumber": "string",
    "dob": "2026-01-15",
    "workplace": "string",
    "nationality": "string",
    "createdAt": "2026-01-15T08:00:00Z",
    "isIndependent": true,
    "hasAcceptedContract": true,
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "avatarUrl": "string"
  },
  "status": 0,
  "amount": 0,
  "start": "2026-01-15T08:00:00Z",
  "end": "2026-01-15T08:00:00Z",
  "scheduledAt": "2026-01-15T08:00:00Z",
  "meetingLink": "string",
  "eventId": "string",
  "createdAt": "2026-01-15T08:00:00Z"
}
```

### LessonContentRequest {#schema-lessoncontentrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `sections` | `array` of [`LessonSectionDto`](#schema-lessonsectiondto) | no |  |

Example:

```json
{
  "lessonId": 0,
  "sections": [
    {
      "title": "string",
      "order": 0,
      "lectures": [
        {
          "title": null,
          "description": null,
          "order": null,
          "items": null
        }
      ]
    }
  ]
}
```

### LessonDetailsDto {#schema-lessondetailsdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `lessonTypeId` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | no |  |
| `subjectId` | `integer` (int32) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `educationLevelId` | `integer` (int32) | no |  |
| `topicId` | `integer` (int32) | no |  |
| `programId` | `integer` (int32) | no |  |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `requirements` | `string` | no |  |
| `curriculum` | `string` | no |  |
| `subject` | `string` | no |  |
| `topic` | `string` | no |  |
| `gradeLevel` | `string` | no |  |
| `educationLevel` | `string` | no |  |
| `price` | `number` | no |  |
| `start` | `string` (date-time) | no |  |
| `end` | `string` (date-time) | no |  |
| `isApproved` | `boolean` | yes |  |
| `status` | `string` | no |  |
| `assignedTeachers` | `array` of [`AssignedTeacherDto`](#schema-assignedteacherdto) | no |  |

Example:

```json
{
  "id": 0,
  "lessonTypeId": 0,
  "curriculumId": 0,
  "subjectId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "topicId": 0,
  "programId": 0,
  "name": "string",
  "description": "string",
  "requirements": "string",
  "curriculum": "string",
  "subject": "string",
  "topic": "string",
  "gradeLevel": "string",
  "educationLevel": "string",
  "price": 0,
  "start": "2026-01-15T08:00:00Z",
  "end": "2026-01-15T08:00:00Z",
  "isApproved": true,
  "status": "string",
  "assignedTeachers": [
    {
      "teacherId": 0,
      "name": "string",
      "email": "string"
    }
  ]
}
```

### LessonLectureDto {#schema-lessonlecturedto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | no |  |
| `description` | `string` | no |  |
| `order` | `integer` (int32) | no |  |
| `items` | `array` of [`LessonLectureItemDto`](#schema-lessonlectureitemdto) | no |  |

Example:

```json
{
  "title": "string",
  "description": "string",
  "order": 0,
  "items": [
    {
      "title": "string",
      "type": 0,
      "referenceId": 0,
      "order": 0
    }
  ]
}
```

### LessonLectureItemDto {#schema-lessonlectureitemdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | no |  |
| `type` | [`LessonLectureItemType`](#schema-lessonlectureitemtype) | no |  |
| `referenceId` | `integer` (int32) | no |  |
| `order` | `integer` (int32) | no |  |

Example:

```json
{
  "title": "string",
  "type": 0,
  "referenceId": 0,
  "order": 0
}
```

### LessonLectureItemType {#schema-lessonlectureitemtype}

Type: `integer`

Example:

```json
0
```

### LessonModel {#schema-lessonmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `createdByUserId` | `string` | no |  |
| `createdByUser` | [`UserModel`](#schema-usermodel) | no |  |
| `lessonTypeId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `subjectId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `topicId` | `integer` (int32) | yes |  |
| `programId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `description` | `string` | yes |  |
| `requirements` | `string` \| `null` | no |  |
| `link` | `string` | yes |  |
| `eventId` | `string` \| `null` | no |  |
| `isDeleted` | `boolean` | yes |  |
| `isApproved` | `boolean` | yes |  |
| `start` | `string` (date-time) | yes |  |
| `end` | `string` (date-time) | yes |  |
| `created_at` | `string` (date-time) | yes |  |
| `status` | `string` | no |  |
| `price` | `number` | yes |  |
| `isStarted` | `boolean` | no |  |
| `startedAt` | `string` (date-time) \| `null` | no |  |
| `endedAt` | `string` (date-time) \| `null` | no |  |
| `liveRoomId` | `string` \| `null` | no |  |
| `schoolId` | `integer` (int32) \| `null` | no |  |
| `school` | `null` \| [`SchoolModel`](#schema-schoolmodel) | no |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `subject` | [`SubjectModel`](#schema-subjectmodel) | no |  |
| `gradeLevel` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |
| `educationlevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |
| `lessonType` | [`LessonTypeModel`](#schema-lessontypemodel) | no |  |
| `topic` | [`TopicsModel`](#schema-topicsmodel) | no |  |
| `slotId` | `integer` (int32) \| `null` | no |  |
| `slot` | [`SubProgramSlotModel`](#schema-subprogramslotmodel) | no |  |
| `program` | [`ProgramModel`](#schema-programmodel) | no |  |

Example:

```json
{
  "id": 0,
  "createdByUserId": "string",
  "createdByUser": {
    "firstName": "string",
    "lastName": "string",
    "userType": "string",
    "nationalId": "string",
    "nationality": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "isActive": true,
    "isVerified": true,
    "address": "string",
    "chatId": "string",
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "createdAt": "2026-01-15T08:00:00Z",
    "lastLoginAt": "2026-01-15T08:00:00Z",
    "transactionPinHash": "string",
    "referralCode": "string",
    "referredByUserId": "string",
    "referredByUser": null,
    "referrals": null,
    "adminProfileId": 0,
    "teacherProfileId": 0,
    "studentProfileId": 0,
    "parentProfileId": 0,
    "adminProfile": null,
    "teacherProfile": null,
    "studentProfile": null,
    "parentProfile": null,
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2026-01-15T08:00:00Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
  },
  "lessonTypeId": 0,
  "curriculumId": 0,
  "subjectId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "topicId": 0,
  "programId": 0,
  "name": "string",
  "description": "string",
  "requirements": "string",
  "link": "string",
  "eventId": "string",
  "isDeleted": true,
  "isApproved": true,
  "start": "2026-01-15T08:00:00Z",
  "end": "2026-01-15T08:00:00Z",
  "created_at": "2026-01-15T08:00:00Z",
  "status": "string",
  "price": 0,
  "isStarted": true,
  "startedAt": "2026-01-15T08:00:00Z",
  "endedAt": "2026-01-15T08:00:00Z",
  "liveRoomId": "string",
  "schoolId": 0,
  "school": null,
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "subject": {
    "id": 0,
    "categoryId": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "name": "string",
    "colorCode": "string",
    "subProgramSubjects": [
      {
        "id": 0,
        "subProgramId": 0,
        "subProgram": null,
        "subjectId": 0,
        "subject": null
      }
    ]
  },
  "gradeLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "name": "string"
  },
  "educationlevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  },
  "lessonType": {
    "id": 0,
    "name": "string"
  },
  "topic": {
    "id": 0,
    "curriculumId": 0,
    "subjectId": 0,
    "gradeLevelId": 0,
    "educationLevelId": 0,
    "name": "string",
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "subject": {
      "id": 0,
      "categoryId": 0,
      "category": {
        "id": null,
        "name": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationlevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "gradeLevelId": 0,
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "name": "string",
      "colorCode": "string",
      "subProgramSubjects": []
    },
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    }
  },
  "slotId": 0,
  "slot": {
    "id": 0,
    "subProgramId": 0,
    "subProgram": {
      "id": 0,
      "programId": 0,
      "program": {
        "id": null,
        "programName": null,
        "programTypeId": null,
        "programType": null,
        "curriculumId": null,
        "curriculum": null,
        "programStartDate": null,
        "programEndDate": null,
        "hasSubPrograms": null,
        "subPrograms": null,
        "schedules": null,
        "holidays": null,
        "businessHours": null
      },
      "name": "string",
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z",
      "slotDurationMinutes": 0,
      "subProgramGradeLevels": null,
      "subProgramSubjects": null
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "slotDate": "2026-01-15T08:00:00Z",
    "startTime": "string",
    "endTime": "string",
    "status": 0,
    "code": "string",
    "subjectId": 0,
    "subjectName": "string",
    "subject": {
      "id": 0,
      "categoryId": 0,
      "category": {
        "id": null,
        "name": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationlevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "gradeLevelId": 0,
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "name": "string",
      "colorCode": "string",
      "subProgramSubjects": []
    },
    "teacherId": 0,
    "teacherName": "string",
    "teacher": {
      "id": 0,
      "userId": "string",
      "user": {
        "firstName": null,
        "lastName": null,
        "userType": null,
        "nationalId": null,
        "nationality": null,
        "gender": null,
        "dob": null,
        "isActive": null,
        "isVerified": null,
        "address": null,
        "chatId": null,
        "hasAcceptedTerms": null,
        "termsAcceptedAt": null,
        "createdAt": null,
        "lastLoginAt": null,
        "transactionPinHash": null,
        "referralCode": null,
        "referredByUserId": null,
        "referredByUser": null,
        "referrals": null,
        "adminProfileId": null,
        "teacherProfileId": null,
        "studentProfileId": null,
        "parentProfileId": null,
        "adminProfile": null,
        "teacherProfile": null,
        "studentProfile": null,
        "parentProfile": null,
        "id": null,
        "userName": null,
        "normalizedUserName": null,
        "email": null,
        "normalizedEmail": null,
        "emailConfirmed": null,
        "passwordHash": null,
        "securityStamp": null,
        "concurrencyStamp": null,
        "phoneNumber": null,
        "phoneNumberConfirmed": null,
        "twoFactorEnabled": null,
        "lockoutEnd": null,
        "lockoutEnabled": null,
        "accessFailedCount": null
      },
      "certificateLevelId": 0,
      "certificateLevel": {
        "id": null,
        "name": null
      },
      "fullName": "string",
      "nationalId": "string",
      "phone": "string",
      "address": "string",
      "bio": "string",
      "gender": "string",
      "tscNumber": "string",
      "dob": "2026-01-15",
      "workplace": "string",
      "nationality": "string",
      "createdAt": "2026-01-15T08:00:00Z",
      "isIndependent": true,
      "hasAcceptedContract": true,
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "avatarUrl": "string"
    },
    "lessonId": 0,
    "lesson": null,
    "invitations": [
      {
        "id": 0,
        "slotId": 0,
        "slot": null,
        "teacherId": 0,
        "teacherName": "string",
        "teacher": null,
        "status": "string",
        "createdAt": "2026-01-15T08:00:00Z",
        "token": "string",
        "expiresAt": "2026-01-15T08:00:00Z",
        "isUsed": true
      }
    ]
  },
  "program": {
    "id": 0,
    "programName": "string",
    "programTypeId": 0,
    "programType": {
      "id": 0,
      "name": "string",
      "colorCode": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "programStartDate": "2026-01-15T08:00:00Z",
    "programEndDate": "2026-01-15T08:00:00Z",
    "hasSubPrograms": true,
    "subPrograms": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "name": "string",
        "educationLevelId": 0,
        "educationLevel": null,
        "startDate": "2026-01-15T08:00:00Z",
        "endDate": "2026-01-15T08:00:00Z",
        "slotDurationMinutes": 0,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      }
    ],
    "schedules": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "dayOfWeek": null,
        "isActive": true,
        "startTime": "string",
        "endTime": "string",
        "breaks": []
      }
    ],
    "holidays": null,
    "businessHours": null
  }
}
```

### LessonObjectiveRequest {#schema-lessonobjectiverequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `objective` | `string` | no |  |

Example:

```json
{
  "lessonId": 0,
  "objective": "string"
}
```

### LessonPricingDto {#schema-lessonpricingdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `price` | `number` | no |  |
| `revenueShares` | `array` of [`RevenueShareDto`](#schema-revenuesharedto) \| `null` | no |  |

Example:

```json
{
  "lessonId": 0,
  "price": 0,
  "revenueShares": [
    {
      "userId": "string",
      "commissionType": "string",
      "value": 0
    }
  ]
}
```

### LessonRequest {#schema-lessonrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) \| `null` | no |  |
| `lessonTypeId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `subjectId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `topicId` | `integer` (int32) | yes |  |
| `programId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `description` | `string` | yes |  |
| `start` | `string` (date-time) | yes |  |
| `end` | `string` (date-time) | yes |  |
| `token` | `string` \| `null` | no |  |

Example:

```json
{
  "lessonId": 0,
  "lessonTypeId": 0,
  "curriculumId": 0,
  "subjectId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "topicId": 0,
  "programId": 0,
  "name": "string",
  "description": "string",
  "start": "2026-01-15T08:00:00Z",
  "end": "2026-01-15T08:00:00Z",
  "token": "string"
}
```

### LessonSectionDto {#schema-lessonsectiondto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | no |  |
| `order` | `integer` (int32) | no |  |
| `lectures` | `array` of [`LessonLectureDto`](#schema-lessonlecturedto) | no |  |

Example:

```json
{
  "title": "string",
  "order": 0,
  "lectures": [
    {
      "title": "string",
      "description": "string",
      "order": 0,
      "items": [
        {
          "title": null,
          "type": null,
          "referenceId": null,
          "order": null
        }
      ]
    }
  ]
}
```

### LessonTypeGetResponse {#schema-lessontypegetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`LessonTypeModel`](#schema-lessontypemodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string"
  }
}
```

### LessonTypeModel {#schema-lessontypemodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "id": 0,
  "name": "string"
}
```

### LessonTypeRequest {#schema-lessontyperequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |

Example:

```json
{
  "name": "string"
}
```

### LicenseDto {#schema-licensedto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `organization` | `string` | no |  |
| `month` | `string` | no |  |
| `year` | `string` | no |  |
| `expiryMonth` | `string` | no |  |
| `expiryYear` | `string` | no |  |
| `url` | `string` | no |  |

Example:

```json
{
  "name": "string",
  "organization": "string",
  "month": "string",
  "year": "string",
  "expiryMonth": "string",
  "expiryYear": "string",
  "url": "string"
}
```

### LoginRequest {#schema-loginrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | no |  |
| `password` | `string` | no |  |

Example:

```json
{
  "email": "string",
  "password": "string"
}
```

### MpesaPaymentNotification {#schema-mpesapaymentnotification}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `reference` | `string` | no |  |
| `isSuccess` | `boolean` | no |  |

Example:

```json
{
  "reference": "string",
  "isSuccess": true
}
```

### MpesaTopupRequest {#schema-mpesatopuprequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `phoneNumber` | `string` | no |  |
| `amount` | `number` | no |  |

Example:

```json
{
  "phoneNumber": "string",
  "amount": 0
}
```

### MpesaWithdrawRequest {#schema-mpesawithdrawrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `phoneNumber` | `string` | no |  |
| `amount` | `number` | no |  |
| `pin` | `string` | no |  |

Example:

```json
{
  "phoneNumber": "string",
  "amount": 0,
  "pin": "string"
}
```

### NewTeacherItem {#schema-newteacheritem}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int64) | no |  |
| `fullName` | `string` | no |  |
| `phone` | `string` | no |  |
| `email` | `string` \| `null` | no |  |
| `bio` | `string` \| `null` | no |  |
| `workplace` | `string` \| `null` | no |  |
| `isNew` | `boolean` | no |  |
| `address` | `string` \| `null` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `gender` | `string` \| `null` | no |  |
| `dob` | `string` (date) \| `null` | no |  |
| `enrollments` | `array` of [`EnrollmentItem`](#schema-enrollmentitem) \| `null` | no |  |

Example:

```json
{
  "id": 0,
  "fullName": "string",
  "phone": "string",
  "email": "string",
  "bio": "string",
  "workplace": "string",
  "isNew": true,
  "address": "string",
  "nationalId": "string",
  "gender": "string",
  "dob": "2026-01-15",
  "enrollments": [
    {
      "curriculumId": 0,
      "gradeLevelId": 0,
      "subjects": [
        {
          "id": null,
          "name": null,
          "curriculumId": null,
          "gradeLevelId": null
        }
      ]
    }
  ]
}
```

### OptionDto {#schema-optiondto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `string` | no |  |

Example:

```json
{
  "text": "string"
}
```

### ParentModel {#schema-parentmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `fullName` | `string` | yes |  |
| `nationalId` | `string` | yes |  |
| `phone` | `string` | yes |  |
| `address` | `string` | yes |  |
| `gender` | `string` | yes |  |
| `createdAt` | `string` (date-time) | no |  |

Example:

```json
{
  "id": 0,
  "userId": "string",
  "user": {
    "firstName": "string",
    "lastName": "string",
    "userType": "string",
    "nationalId": "string",
    "nationality": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "isActive": true,
    "isVerified": true,
    "address": "string",
    "chatId": "string",
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "createdAt": "2026-01-15T08:00:00Z",
    "lastLoginAt": "2026-01-15T08:00:00Z",
    "transactionPinHash": "string",
    "referralCode": "string",
    "referredByUserId": "string",
    "referredByUser": null,
    "referrals": null,
    "adminProfileId": 0,
    "teacherProfileId": 0,
    "studentProfileId": 0,
    "parentProfileId": 0,
    "adminProfile": null,
    "teacherProfile": null,
    "studentProfile": null,
    "parentProfile": null,
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2026-01-15T08:00:00Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
  },
  "fullName": "string",
  "nationalId": "string",
  "phone": "string",
  "address": "string",
  "gender": "string",
  "createdAt": "2026-01-15T08:00:00Z"
}
```

### PaymentModel {#schema-paymentmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `lessonBookingId` | `integer` (int32) | no |  |
| `lessonBooking` | [`LessonBookingModel`](#schema-lessonbookingmodel) | no |  |
| `amount` | `number` | no |  |
| `provider` | `string` | no |  |
| `reference` | `string` | no |  |
| `email` | `string` \| `null` | no |  |
| `gatewayResponse` | `string` \| `null` | no |  |
| `channel` | `string` \| `null` | no |  |
| `status` | [`PaymentStatus`](#schema-paymentstatus) | no |  |
| `createdAt` | `string` (date-time) | no |  |
| `paidAt` | `string` (date-time) | no |  |

Example:

```json
{
  "id": 0,
  "lessonBookingId": 0,
  "lessonBooking": {
    "id": 0,
    "studentId": 0,
    "student": {
      "id": 0,
      "userId": "string",
      "user": {
        "firstName": null,
        "lastName": null,
        "userType": null,
        "nationalId": null,
        "nationality": null,
        "gender": null,
        "dob": null,
        "isActive": null,
        "isVerified": null,
        "address": null,
        "chatId": null,
        "hasAcceptedTerms": null,
        "termsAcceptedAt": null,
        "createdAt": null,
        "lastLoginAt": null,
        "transactionPinHash": null,
        "referralCode": null,
        "referredByUserId": null,
        "referredByUser": null,
        "referrals": null,
        "adminProfileId": null,
        "teacherProfileId": null,
        "studentProfileId": null,
        "parentProfileId": null,
        "adminProfile": null,
        "teacherProfile": null,
        "studentProfile": null,
        "parentProfile": null,
        "id": null,
        "userName": null,
        "normalizedUserName": null,
        "email": null,
        "normalizedEmail": null,
        "emailConfirmed": null,
        "passwordHash": null,
        "securityStamp": null,
        "concurrencyStamp": null,
        "phoneNumber": null,
        "phoneNumberConfirmed": null,
        "twoFactorEnabled": null,
        "lockoutEnd": null,
        "lockoutEnabled": null,
        "accessFailedCount": null
      },
      "admissionNumber": "string",
      "fullName": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "createdAt": "2026-01-15T08:00:00Z",
      "avatarUrl": "string"
    },
    "lessonId": 0,
    "lesson": {
      "id": 0,
      "createdByUserId": "string",
      "createdByUser": {
        "firstName": null,
        "lastName": null,
        "userType": null,
        "nationalId": null,
        "nationality": null,
        "gender": null,
        "dob": null,
        "isActive": null,
        "isVerified": null,
        "address": null,
        "chatId": null,
        "hasAcceptedTerms": null,
        "termsAcceptedAt": null,
        "createdAt": null,
        "lastLoginAt": null,
        "transactionPinHash": null,
        "referralCode": null,
        "referredByUserId": null,
        "referredByUser": null,
        "referrals": null,
        "adminProfileId": null,
        "teacherProfileId": null,
        "studentProfileId": null,
        "parentProfileId": null,
        "adminProfile": null,
        "teacherProfile": null,
        "studentProfile": null,
        "parentProfile": null,
        "id": null,
        "userName": null,
        "normalizedUserName": null,
        "email": null,
        "normalizedEmail": null,
        "emailConfirmed": null,
        "passwordHash": null,
        "securityStamp": null,
        "concurrencyStamp": null,
        "phoneNumber": null,
        "phoneNumberConfirmed": null,
        "twoFactorEnabled": null,
        "lockoutEnd": null,
        "lockoutEnabled": null,
        "accessFailedCount": null
      },
      "lessonTypeId": 0,
      "curriculumId": 0,
      "subjectId": 0,
      "gradeLevelId": 0,
      "educationLevelId": 0,
      "topicId": 0,
      "programId": 0,
      "name": "string",
      "description": "string",
      "requirements": "string",
      "link": "string",
      "eventId": "string",
      "isDeleted": true,
      "isApproved": true,
      "start": "2026-01-15T08:00:00Z",
      "end": "2026-01-15T08:00:00Z",
      "created_at": "2026-01-15T08:00:00Z",
      "status": "string",
      "price": 0,
      "isStarted": true,
      "startedAt": "2026-01-15T08:00:00Z",
      "endedAt": "2026-01-15T08:00:00Z",
      "liveRoomId": "string",
      "schoolId": 0,
      "school": null,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "subject": {
        "id": null,
        "categoryId": null,
        "category": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationlevel": null,
        "gradeLevelId": null,
        "gradeLevel": null,
        "name": null,
        "colorCode": null,
        "subProgramSubjects": null
      },
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "educationlevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "lessonType": {
        "id": null,
        "name": null
      },
      "topic": {
        "id": null,
        "curriculumId": null,
        "subjectId": null,
        "gradeLevelId": null,
        "educationLevelId": null,
        "name": null,
        "curriculum": null,
        "subject": null,
        "gradeLevel": null,
        "educationlevel": null
      },
      "slotId": 0,
      "slot": {
        "id": null,
        "subProgramId": null,
        "subProgram": null,
        "gradeLevelId": null,
        "gradeLevel": null,
        "slotDate": null,
        "startTime": null,
        "endTime": null,
        "status": null,
        "code": null,
        "subjectId": null,
        "subjectName": null,
        "subject": null,
        "teacherId": null,
        "teacherName": null,
        "teacher": null,
        "lessonId": null,
        "lesson": null,
        "invitations": null
      },
      "program": {
        "id": null,
        "programName": null,
        "programTypeId": null,
        "programType": null,
        "curriculumId": null,
        "curriculum": null,
        "programStartDate": null,
        "programEndDate": null,
        "hasSubPrograms": null,
        "subPrograms": null,
        "schedules": null,
        "holidays": null,
        "businessHours": null
      }
    },
    "teacherId": 0,
    "teacher": {
      "id": 0,
      "userId": "string",
      "user": {
        "firstName": null,
        "lastName": null,
        "userType": null,
        "nationalId": null,
        "nationality": null,
        "gender": null,
        "dob": null,
        "isActive": null,
        "isVerified": null,
        "address": null,
        "chatId": null,
        "hasAcceptedTerms": null,
        "termsAcceptedAt": null,
        "createdAt": null,
        "lastLoginAt": null,
        "transactionPinHash": null,
        "referralCode": null,
        "referredByUserId": null,
        "referredByUser": null,
        "referrals": null,
        "adminProfileId": null,
        "teacherProfileId": null,
        "studentProfileId": null,
        "parentProfileId": null,
        "adminProfile": null,
        "teacherProfile": null,
        "studentProfile": null,
        "parentProfile": null,
        "id": null,
        "userName": null,
        "normalizedUserName": null,
        "email": null,
        "normalizedEmail": null,
        "emailConfirmed": null,
        "passwordHash": null,
        "securityStamp": null,
        "concurrencyStamp": null,
        "phoneNumber": null,
        "phoneNumberConfirmed": null,
        "twoFactorEnabled": null,
        "lockoutEnd": null,
        "lockoutEnabled": null,
        "accessFailedCount": null
      },
      "certificateLevelId": 0,
      "certificateLevel": {
        "id": null,
        "name": null
      },
      "fullName": "string",
      "nationalId": "string",
      "phone": "string",
      "address": "string",
      "bio": "string",
      "gender": "string",
      "tscNumber": "string",
      "dob": "2026-01-15",
      "workplace": "string",
      "nationality": "string",
      "createdAt": "2026-01-15T08:00:00Z",
      "isIndependent": true,
      "hasAcceptedContract": true,
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "avatarUrl": "string"
    },
    "status": 0,
    "amount": 0,
    "start": "2026-01-15T08:00:00Z",
    "end": "2026-01-15T08:00:00Z",
    "scheduledAt": "2026-01-15T08:00:00Z",
    "meetingLink": "string",
    "eventId": "string",
    "createdAt": "2026-01-15T08:00:00Z"
  },
  "amount": 0,
  "provider": "string",
  "reference": "string",
  "email": "string",
  "gatewayResponse": "string",
  "channel": "string",
  "status": 0,
  "createdAt": "2026-01-15T08:00:00Z",
  "paidAt": "2026-01-15T08:00:00Z"
}
```

### PaymentStatus {#schema-paymentstatus}

Type: `integer`

Example:

```json
0
```

### PinRequest {#schema-pinrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pin` | `string` | no |  |

Example:

```json
{
  "pin": "string"
}
```

### ProgramBusinessHourModel {#schema-programbusinesshourmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `programId` | `integer` (int32) | no |  |
| `day` | [`DayOfWeek`](#schema-dayofweek) | no |  |
| `isActive` | `boolean` | no |  |
| `program` | [`ProgramModel`](#schema-programmodel) | no |  |

Example:

```json
{
  "id": 0,
  "programId": 0,
  "day": 0,
  "isActive": true,
  "program": {
    "id": 0,
    "programName": "string",
    "programTypeId": 0,
    "programType": {
      "id": 0,
      "name": "string",
      "colorCode": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "programStartDate": "2026-01-15T08:00:00Z",
    "programEndDate": "2026-01-15T08:00:00Z",
    "hasSubPrograms": true,
    "subPrograms": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "name": "string",
        "educationLevelId": 0,
        "educationLevel": null,
        "startDate": "2026-01-15T08:00:00Z",
        "endDate": "2026-01-15T08:00:00Z",
        "slotDurationMinutes": 0,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      }
    ],
    "schedules": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "dayOfWeek": null,
        "isActive": true,
        "startTime": "string",
        "endTime": "string",
        "breaks": []
      }
    ],
    "holidays": null,
    "businessHours": null
  }
}
```

### ProgramGetResponse {#schema-programgetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`ProgramsModel`](#schema-programsmodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "curriculumId": 0,
    "name": "string",
    "colorCode": "string",
    "startDate": "2026-01-15",
    "endDate": "2026-01-15",
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    }
  }
}
```

### ProgramHolidayModel {#schema-programholidaymodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `programId` | `integer` (int32) | no |  |
| `program` | [`ProgramModel`](#schema-programmodel) | no |  |
| `holidayName` | `string` | no |  |
| `startDate` | `string` (date-time) | no |  |
| `endDate` | `string` (date-time) | no |  |

Example:

```json
{
  "id": 0,
  "programId": 0,
  "program": {
    "id": 0,
    "programName": "string",
    "programTypeId": 0,
    "programType": {
      "id": 0,
      "name": "string",
      "colorCode": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "programStartDate": "2026-01-15T08:00:00Z",
    "programEndDate": "2026-01-15T08:00:00Z",
    "hasSubPrograms": true,
    "subPrograms": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "name": "string",
        "educationLevelId": 0,
        "educationLevel": null,
        "startDate": "2026-01-15T08:00:00Z",
        "endDate": "2026-01-15T08:00:00Z",
        "slotDurationMinutes": 0,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      }
    ],
    "schedules": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "dayOfWeek": null,
        "isActive": true,
        "startTime": "string",
        "endTime": "string",
        "breaks": []
      }
    ],
    "holidays": null,
    "businessHours": null
  },
  "holidayName": "string",
  "startDate": "2026-01-15T08:00:00Z",
  "endDate": "2026-01-15T08:00:00Z"
}
```

### ProgramModel {#schema-programmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `programName` | `string` | no |  |
| `programTypeId` | `integer` (int32) | no |  |
| `programType` | [`ProgramTypeModel`](#schema-programtypemodel) | no |  |
| `curriculumId` | `integer` (int32) | no |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `programStartDate` | `string` (date-time) | no |  |
| `programEndDate` | `string` (date-time) | no |  |
| `hasSubPrograms` | `boolean` | no |  |
| `subPrograms` | `array` of [`SubProgramModel`](#schema-subprogrammodel) | no |  |
| `schedules` | `array` of [`ProgramScheduleModel`](#schema-programschedulemodel) | no |  |
| `holidays` | [`holidays`](#schema-holidays) | no |  |
| `businessHours` | [`businessHours`](#schema-businesshours) | no |  |

Example:

```json
{
  "id": 0,
  "programName": "string",
  "programTypeId": 0,
  "programType": {
    "id": 0,
    "name": "string",
    "colorCode": "string"
  },
  "curriculumId": 0,
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "programStartDate": "2026-01-15T08:00:00Z",
  "programEndDate": "2026-01-15T08:00:00Z",
  "hasSubPrograms": true,
  "subPrograms": [
    {
      "id": 0,
      "programId": 0,
      "program": {
        "id": 0,
        "programName": "string",
        "programTypeId": 0,
        "programType": null,
        "curriculumId": 0,
        "curriculum": null,
        "programStartDate": "2026-01-15T08:00:00Z",
        "programEndDate": "2026-01-15T08:00:00Z",
        "hasSubPrograms": true,
        "subPrograms": [],
        "schedules": [],
        "holidays": null,
        "businessHours": null
      },
      "name": "string",
      "educationLevelId": 0,
      "educationLevel": {
        "id": 0,
        "curriculumId": 0,
        "curriculum": null,
        "name": "string"
      },
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z",
      "slotDurationMinutes": 0,
      "subProgramGradeLevels": null,
      "subProgramSubjects": null
    }
  ],
  "schedules": [
    {
      "id": 0,
      "programId": 0,
      "program": {
        "id": 0,
        "programName": "string",
        "programTypeId": 0,
        "programType": null,
        "curriculumId": 0,
        "curriculum": null,
        "programStartDate": "2026-01-15T08:00:00Z",
        "programEndDate": "2026-01-15T08:00:00Z",
        "hasSubPrograms": true,
        "subPrograms": [],
        "schedules": [],
        "holidays": null,
        "businessHours": null
      },
      "dayOfWeek": 0,
      "isActive": true,
      "startTime": "string",
      "endTime": "string",
      "breaks": [
        {
          "id": null,
          "programScheduleId": null,
          "programSchedule": null,
          "name": null,
          "breakStart": null,
          "breakEnd": null
        }
      ]
    }
  ],
  "holidays": null,
  "businessHours": null
}
```

### ProgramRequest {#schema-programrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `startDate` | `string` (date) | yes |  |
| `endDate` | `string` (date) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |

Example:

```json
{
  "startDate": "2026-01-15",
  "endDate": "2026-01-15",
  "curriculumId": 0,
  "name": "string",
  "colorCode": "string"
}
```

### ProgramScheduleModel {#schema-programschedulemodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `programId` | `integer` (int32) | no |  |
| `program` | [`ProgramModel`](#schema-programmodel) | no |  |
| `dayOfWeek` | [`DayOfWeek`](#schema-dayofweek) | no |  |
| `isActive` | `boolean` | no |  |
| `startTime` | `string` | no |  |
| `endTime` | `string` | no |  |
| `breaks` | `array` of [`ScheduleBreakModel`](#schema-schedulebreakmodel) | no |  |

Example:

```json
{
  "id": 0,
  "programId": 0,
  "program": {
    "id": 0,
    "programName": "string",
    "programTypeId": 0,
    "programType": {
      "id": 0,
      "name": "string",
      "colorCode": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "programStartDate": "2026-01-15T08:00:00Z",
    "programEndDate": "2026-01-15T08:00:00Z",
    "hasSubPrograms": true,
    "subPrograms": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "name": "string",
        "educationLevelId": 0,
        "educationLevel": null,
        "startDate": "2026-01-15T08:00:00Z",
        "endDate": "2026-01-15T08:00:00Z",
        "slotDurationMinutes": 0,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      }
    ],
    "schedules": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "dayOfWeek": null,
        "isActive": true,
        "startTime": "string",
        "endTime": "string",
        "breaks": []
      }
    ],
    "holidays": null,
    "businessHours": null
  },
  "dayOfWeek": 0,
  "isActive": true,
  "startTime": "string",
  "endTime": "string",
  "breaks": [
    {
      "id": 0,
      "programScheduleId": 0,
      "programSchedule": {
        "id": 0,
        "programId": 0,
        "program": null,
        "dayOfWeek": null,
        "isActive": true,
        "startTime": "string",
        "endTime": "string",
        "breaks": []
      },
      "name": "string",
      "breakStart": "string",
      "breakEnd": "string"
    }
  ]
}
```

### ProgramTypeModel {#schema-programtypemodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` \| `null` | no |  |

Example:

```json
{
  "id": 0,
  "name": "string",
  "colorCode": "string"
}
```

### ProgramTypeRequest {#schema-programtyperequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |
| `colorCode` | `string` \| `null` | no |  |

Example:

```json
{
  "name": "string",
  "colorCode": "string"
}
```

### ProgramsModel {#schema-programsmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |
| `startDate` | `string` (date) | yes |  |
| `endDate` | `string` (date) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |

Example:

```json
{
  "id": 0,
  "curriculumId": 0,
  "name": "string",
  "colorCode": "string",
  "startDate": "2026-01-15",
  "endDate": "2026-01-15",
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  }
}
```

### QuestionDto {#schema-questiondto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `string` | no |  |
| `type` | `string` | no |  |
| `options` | `array` of [`OptionDto`](#schema-optiondto) | no |  |
| `correctAnswerIndex` | `string` \| `null` | no |  |
| `educationLevelId` | `integer` (int32) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `subjectId` | `integer` (int32) | no |  |
| `topicId` | `integer` (int32) | no |  |

Example:

```json
{
  "text": "string",
  "type": "string",
  "options": [
    {
      "text": "string"
    }
  ],
  "correctAnswerIndex": "string",
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "subjectId": 0,
  "topicId": 0
}
```

### QuestionGrade {#schema-questiongrade}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `questionId` | `integer` (int32) | no |  |
| `score` | `number` | no |  |
| `feedback` | `string` \| `null` | no |  |

Example:

```json
{
  "questionId": 0,
  "score": 0,
  "feedback": "string"
}
```

### QuizAnswerRequest {#schema-quizanswerrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `questionId` | `integer` (int32) | no |  |
| `selectedOptionLabel` | `string` \| `null` | no |  |
| `answerText` | `string` \| `null` | no |  |

Example:

```json
{
  "questionId": 0,
  "selectedOptionLabel": "string",
  "answerText": "string"
}
```

### RegisterCompleteRequest {#schema-registercompleterequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | no |  |
| `role` | `string` | no |  |
| `gender` | `string` \| `null` | no |  |
| `firstName` | `string` \| `null` | no |  |
| `lastName` | `string` \| `null` | no |  |
| `phone` | `string` | no |  |
| `address` | `string` \| `null` | no |  |
| `referralCode` | `string` \| `null` | no |  |
| `certificateLevelId` | `integer` (int32) \| `null` | no |  |
| `teacherEnrollments` | `array` of [`TeacherEnrollmentRequest`](#schema-teacherenrollmentrequest) \| `null` | no |  |
| `studentEnrollments` | `array` of [`StudentEnrollmentRequest`](#schema-studentenrollmentrequest) \| `null` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `nationality` | `string` \| `null` | no |  |
| `schoolName` | `string` \| `null` | no |  |
| `code` | `string` \| `null` | no |  |
| `schoolEmail` | `string` \| `null` | no |  |
| `adminEmail` | `string` \| `null` | no |  |
| `website` | `string` \| `null` | no |  |
| `motto` | `string` \| `null` | no |  |
| `description` | `string` \| `null` | no |  |
| `logoPath` | `string` \| `null` | no |  |
| `schoolTypeId` | `integer` (int32) | no |  |
| `curriculumIds` | `array` of `integer` (int32) | no |  |

Example:

```json
{
  "email": "string",
  "role": "string",
  "gender": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "address": "string",
  "referralCode": "string",
  "certificateLevelId": 0,
  "teacherEnrollments": [
    {
      "curriculumId": 0,
      "gradeLevelId": 0,
      "schoolId": 0,
      "subjectIds": [
        0
      ]
    }
  ],
  "studentEnrollments": [
    {
      "curriculumId": 0,
      "gradeLevelId": 0,
      "schoolId": 0,
      "subjectIds": [
        0
      ]
    }
  ],
  "nationalId": "string",
  "nationality": "string",
  "schoolName": "string",
  "code": "string",
  "schoolEmail": "string",
  "adminEmail": "string",
  "website": "string",
  "motto": "string",
  "description": "string",
  "logoPath": "string",
  "schoolTypeId": 0,
  "curriculumIds": [
    0
  ]
}
```

### RegisterInitRequest {#schema-registerinitrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chatId` | `string` \| `null` | no |  |
| `firstName` | `string` | no |  |
| `lastName` | `string` | no |  |
| `email` | `string` | no |  |
| `password` | `string` | no |  |
| `referralCode` | `string` \| `null` | no |  |

Example:

```json
{
  "chatId": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "referralCode": "string"
}
```

### RejectSlotInvitationDto {#schema-rejectslotinvitationdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | no |  |

Example:

```json
{
  "token": "string"
}
```

### ResendVerificationEmailRequest {#schema-resendverificationemailrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | no |  |

Example:

```json
{
  "email": "string"
}
```

### RevenueShareDto {#schema-revenuesharedto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | `string` | no |  |
| `commissionType` | `string` | no |  |
| `value` | `number` | no |  |

Example:

```json
{
  "userId": "string",
  "commissionType": "string",
  "value": 0
}
```

### SaveQualificationsDto {#schema-savequalificationsdto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | no |  |
| `certificateLevelId` | `integer` (int32) | no |  |
| `licenses` | `array` of [`LicenseDto`](#schema-licensedto) | no |  |

Example:

```json
{
  "bio": "string",
  "certificateLevelId": 0,
  "licenses": [
    {
      "name": "string",
      "organization": "string",
      "month": "string",
      "year": "string",
      "expiryMonth": "string",
      "expiryYear": "string",
      "url": "string"
    }
  ]
}
```

### ScheduleBreakModel {#schema-schedulebreakmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `programScheduleId` | `integer` (int32) | no |  |
| `programSchedule` | [`ProgramScheduleModel`](#schema-programschedulemodel) | no |  |
| `name` | `string` | no |  |
| `breakStart` | `string` | no |  |
| `breakEnd` | `string` | no |  |

Example:

```json
{
  "id": 0,
  "programScheduleId": 0,
  "programSchedule": {
    "id": 0,
    "programId": 0,
    "program": {
      "id": 0,
      "programName": "string",
      "programTypeId": 0,
      "programType": {
        "id": null,
        "name": null,
        "colorCode": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "programStartDate": "2026-01-15T08:00:00Z",
      "programEndDate": "2026-01-15T08:00:00Z",
      "hasSubPrograms": true,
      "subPrograms": [],
      "schedules": [],
      "holidays": null,
      "businessHours": null
    },
    "dayOfWeek": 0,
    "isActive": true,
    "startTime": "string",
    "endTime": "string",
    "breaks": [
      {
        "id": 0,
        "programScheduleId": 0,
        "programSchedule": null,
        "name": "string",
        "breakStart": "string",
        "breakEnd": "string"
      }
    ]
  },
  "name": "string",
  "breakStart": "string",
  "breakEnd": "string"
}
```

### ScheduleRequest {#schema-schedulerequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dayOfWeek` | [`DayOfWeek`](#schema-dayofweek) | no |  |
| `isActive` | `boolean` | no |  |
| `startTime` | `string` | no |  |
| `endTime` | `string` | no |  |
| `breaks` | `array` of [`BreakRequest`](#schema-breakrequest) | no |  |

Example:

```json
{
  "dayOfWeek": 0,
  "isActive": true,
  "startTime": "string",
  "endTime": "string",
  "breaks": [
    {
      "name": "string",
      "startTime": "string",
      "endTime": "string"
    }
  ]
}
```

### SchoolAdminModel {#schema-schooladminmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `schoolId` | `integer` (int32) | yes |  |
| `school` | [`SchoolModel`](#schema-schoolmodel) | no |  |
| `createdAt` | `string` (date-time) | no |  |

Example:

```json
{
  "id": 0,
  "userId": "string",
  "user": {
    "firstName": "string",
    "lastName": "string",
    "userType": "string",
    "nationalId": "string",
    "nationality": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "isActive": true,
    "isVerified": true,
    "address": "string",
    "chatId": "string",
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "createdAt": "2026-01-15T08:00:00Z",
    "lastLoginAt": "2026-01-15T08:00:00Z",
    "transactionPinHash": "string",
    "referralCode": "string",
    "referredByUserId": "string",
    "referredByUser": null,
    "referrals": null,
    "adminProfileId": 0,
    "teacherProfileId": 0,
    "studentProfileId": 0,
    "parentProfileId": 0,
    "adminProfile": null,
    "teacherProfile": null,
    "studentProfile": null,
    "parentProfile": null,
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2026-01-15T08:00:00Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
  },
  "schoolId": 0,
  "school": {
    "id": 0,
    "name": "string",
    "motto": "string",
    "code": "string",
    "email": "string",
    "website": "string",
    "description": "string",
    "logo": "string",
    "adminEmail": "string",
    "phone": "string",
    "address": "string",
    "schoolTypeId": 0,
    "schoolType": {
      "id": 0,
      "name": "string",
      "description": "string",
      "schools": []
    },
    "schoolAdminId": "string",
    "schoolAdmin": {
      "id": 0,
      "userId": "string",
      "user": {
        "firstName": null,
        "lastName": null,
        "userType": null,
        "nationalId": null,
        "nationality": null,
        "gender": null,
        "dob": null,
        "isActive": null,
        "isVerified": null,
        "address": null,
        "chatId": null,
        "hasAcceptedTerms": null,
        "termsAcceptedAt": null,
        "createdAt": null,
        "lastLoginAt": null,
        "transactionPinHash": null,
        "referralCode": null,
        "referredByUserId": null,
        "referredByUser": null,
        "referrals": null,
        "adminProfileId": null,
        "teacherProfileId": null,
        "studentProfileId": null,
        "parentProfileId": null,
        "adminProfile": null,
        "teacherProfile": null,
        "studentProfile": null,
        "parentProfile": null,
        "id": null,
        "userName": null,
        "normalizedUserName": null,
        "email": null,
        "normalizedEmail": null,
        "emailConfirmed": null,
        "passwordHash": null,
        "securityStamp": null,
        "concurrencyStamp": null,
        "phoneNumber": null,
        "phoneNumberConfirmed": null,
        "twoFactorEnabled": null,
        "lockoutEnd": null,
        "lockoutEnabled": null,
        "accessFailedCount": null
      },
      "schoolId": 0,
      "school": {
        "id": null,
        "name": null,
        "motto": null,
        "code": null,
        "email": null,
        "website": null,
        "description": null,
        "logo": null,
        "adminEmail": null,
        "phone": null,
        "address": null,
        "schoolTypeId": null,
        "schoolType": null,
        "schoolAdminId": null,
        "schoolAdmin": null
      },
      "createdAt": "2026-01-15T08:00:00Z"
    }
  },
  "createdAt": "2026-01-15T08:00:00Z"
}
```

### SchoolModel {#schema-schoolmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |
| `motto` | `string` \| `null` | no |  |
| `code` | `string` | yes |  |
| `email` | `string` | yes |  |
| `website` | `string` \| `null` | no |  |
| `description` | `string` | yes |  |
| `logo` | `string` \| `null` | no |  |
| `adminEmail` | `string` | yes |  |
| `phone` | `string` | yes |  |
| `address` | `string` \| `null` | no |  |
| `schoolTypeId` | `integer` (int32) | no |  |
| `schoolType` | [`SchoolType`](#schema-schooltype) | no |  |
| `schoolAdminId` | `string` | no |  |
| `schoolAdmin` | [`SchoolAdminModel`](#schema-schooladminmodel) | no |  |

Example:

```json
{
  "id": 0,
  "name": "string",
  "motto": "string",
  "code": "string",
  "email": "string",
  "website": "string",
  "description": "string",
  "logo": "string",
  "adminEmail": "string",
  "phone": "string",
  "address": "string",
  "schoolTypeId": 0,
  "schoolType": {
    "id": 0,
    "name": "string",
    "description": "string",
    "schools": [
      {
        "id": 0,
        "name": "string",
        "motto": "string",
        "code": "string",
        "email": "string",
        "website": "string",
        "description": "string",
        "logo": "string",
        "adminEmail": "string",
        "phone": "string",
        "address": "string",
        "schoolTypeId": 0,
        "schoolType": null,
        "schoolAdminId": "string",
        "schoolAdmin": null
      }
    ]
  },
  "schoolAdminId": "string",
  "schoolAdmin": {
    "id": 0,
    "userId": "string",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "schoolId": 0,
    "school": {
      "id": 0,
      "name": "string",
      "motto": "string",
      "code": "string",
      "email": "string",
      "website": "string",
      "description": "string",
      "logo": "string",
      "adminEmail": "string",
      "phone": "string",
      "address": "string",
      "schoolTypeId": 0,
      "schoolType": {
        "id": null,
        "name": null,
        "description": null,
        "schools": null
      },
      "schoolAdminId": "string",
      "schoolAdmin": {
        "id": null,
        "userId": null,
        "user": null,
        "schoolId": null,
        "school": null,
        "createdAt": null
      }
    },
    "createdAt": "2026-01-15T08:00:00Z"
  }
}
```

### SchoolType {#schema-schooltype}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |
| `description` | `string` \| `null` | no |  |
| `schools` | `array` of [`SchoolModel`](#schema-schoolmodel) | no |  |

Example:

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "schools": [
    {
      "id": 0,
      "name": "string",
      "motto": "string",
      "code": "string",
      "email": "string",
      "website": "string",
      "description": "string",
      "logo": "string",
      "adminEmail": "string",
      "phone": "string",
      "address": "string",
      "schoolTypeId": 0,
      "schoolType": {
        "id": 0,
        "name": "string",
        "description": "string",
        "schools": []
      },
      "schoolAdminId": "string",
      "schoolAdmin": {
        "id": 0,
        "userId": "string",
        "user": null,
        "schoolId": 0,
        "school": null,
        "createdAt": "2026-01-15T08:00:00Z"
      }
    }
  ]
}
```

### SchoolTypeCreateDto {#schema-schooltypecreatedto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |
| `description` | `string` \| `null` | no |  |

Example:

```json
{
  "name": "string",
  "description": "string"
}
```

### SchoolTypeUpdateDto {#schema-schooltypeupdatedto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |
| `description` | `string` \| `null` | no |  |

Example:

```json
{
  "id": 0,
  "name": "string",
  "description": "string"
}
```

### SectionDto {#schema-sectiondto}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | no |  |
| `questions` | `array` of [`QuestionDto`](#schema-questiondto) | no |  |

Example:

```json
{
  "title": "string",
  "questions": [
    {
      "text": "string",
      "type": "string",
      "options": [
        {
          "text": null
        }
      ],
      "correctAnswerIndex": "string",
      "educationLevelId": 0,
      "gradeLevelId": 0,
      "subjectId": 0,
      "topicId": 0
    }
  ]
}
```

### SlotInvitationModel {#schema-slotinvitationmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `slotId` | `integer` (int32) | no |  |
| `slot` | [`SubProgramSlotModel`](#schema-subprogramslotmodel) | no |  |
| `teacherId` | `integer` (int32) | no |  |
| `teacherName` | `string` | no |  |
| `teacher` | [`TeacherModel`](#schema-teachermodel) | no |  |
| `status` | `string` | no |  |
| `createdAt` | `string` (date-time) | no |  |
| `token` | `string` | no |  |
| `expiresAt` | `string` (date-time) \| `null` | no |  |
| `isUsed` | `boolean` | no |  |

Example:

```json
{
  "id": 0,
  "slotId": 0,
  "slot": {
    "id": 0,
    "subProgramId": 0,
    "subProgram": {
      "id": 0,
      "programId": 0,
      "program": {
        "id": null,
        "programName": null,
        "programTypeId": null,
        "programType": null,
        "curriculumId": null,
        "curriculum": null,
        "programStartDate": null,
        "programEndDate": null,
        "hasSubPrograms": null,
        "subPrograms": null,
        "schedules": null,
        "holidays": null,
        "businessHours": null
      },
      "name": "string",
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z",
      "slotDurationMinutes": 0,
      "subProgramGradeLevels": null,
      "subProgramSubjects": null
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "slotDate": "2026-01-15T08:00:00Z",
    "startTime": "string",
    "endTime": "string",
    "status": 0,
    "code": "string",
    "subjectId": 0,
    "subjectName": "string",
    "subject": {
      "id": 0,
      "categoryId": 0,
      "category": {
        "id": null,
        "name": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationlevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "gradeLevelId": 0,
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "name": "string",
      "colorCode": "string",
      "subProgramSubjects": []
    },
    "teacherId": 0,
    "teacherName": "string",
    "teacher": {
      "id": 0,
      "userId": "string",
      "user": {
        "firstName": null,
        "lastName": null,
        "userType": null,
        "nationalId": null,
        "nationality": null,
        "gender": null,
        "dob": null,
        "isActive": null,
        "isVerified": null,
        "address": null,
        "chatId": null,
        "hasAcceptedTerms": null,
        "termsAcceptedAt": null,
        "createdAt": null,
        "lastLoginAt": null,
        "transactionPinHash": null,
        "referralCode": null,
        "referredByUserId": null,
        "referredByUser": null,
        "referrals": null,
        "adminProfileId": null,
        "teacherProfileId": null,
        "studentProfileId": null,
        "parentProfileId": null,
        "adminProfile": null,
        "teacherProfile": null,
        "studentProfile": null,
        "parentProfile": null,
        "id": null,
        "userName": null,
        "normalizedUserName": null,
        "email": null,
        "normalizedEmail": null,
        "emailConfirmed": null,
        "passwordHash": null,
        "securityStamp": null,
        "concurrencyStamp": null,
        "phoneNumber": null,
        "phoneNumberConfirmed": null,
        "twoFactorEnabled": null,
        "lockoutEnd": null,
        "lockoutEnabled": null,
        "accessFailedCount": null
      },
      "certificateLevelId": 0,
      "certificateLevel": {
        "id": null,
        "name": null
      },
      "fullName": "string",
      "nationalId": "string",
      "phone": "string",
      "address": "string",
      "bio": "string",
      "gender": "string",
      "tscNumber": "string",
      "dob": "2026-01-15",
      "workplace": "string",
      "nationality": "string",
      "createdAt": "2026-01-15T08:00:00Z",
      "isIndependent": true,
      "hasAcceptedContract": true,
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "avatarUrl": "string"
    },
    "lessonId": 0,
    "lesson": null,
    "invitations": [
      {
        "id": 0,
        "slotId": 0,
        "slot": null,
        "teacherId": 0,
        "teacherName": "string",
        "teacher": null,
        "status": "string",
        "createdAt": "2026-01-15T08:00:00Z",
        "token": "string",
        "expiresAt": "2026-01-15T08:00:00Z",
        "isUsed": true
      }
    ]
  },
  "teacherId": 0,
  "teacherName": "string",
  "teacher": {
    "id": 0,
    "userId": "string",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "certificateLevelId": 0,
    "certificateLevel": {
      "id": 0,
      "name": "string"
    },
    "fullName": "string",
    "nationalId": "string",
    "phone": "string",
    "address": "string",
    "bio": "string",
    "gender": "string",
    "tscNumber": "string",
    "dob": "2026-01-15",
    "workplace": "string",
    "nationality": "string",
    "createdAt": "2026-01-15T08:00:00Z",
    "isIndependent": true,
    "hasAcceptedContract": true,
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "avatarUrl": "string"
  },
  "status": "string",
  "createdAt": "2026-01-15T08:00:00Z",
  "token": "string",
  "expiresAt": "2026-01-15T08:00:00Z",
  "isUsed": true
}
```

### SlotItem {#schema-slotitem}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `slotId` | `integer` (int32) | no |  |

Example:

```json
{
  "slotId": 0
}
```

### SlotResponseRequest {#schema-slotresponserequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `teacherId` | `integer` (int32) | no |  |
| `action` | `string` | no |  |

Example:

```json
{
  "teacherId": 0,
  "action": "string"
}
```

### SlotStatus {#schema-slotstatus}

Type: `integer`

Example:

```json
0
```

### StudentEnrollmentRequest {#schema-studentenrollmentrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `schoolId` | `integer` (int32) \| `null` | no |  |
| `subjectIds` | `array` of `integer` (int32) | no |  |

Example:

```json
{
  "curriculumId": 0,
  "gradeLevelId": 0,
  "schoolId": 0,
  "subjectIds": [
    0
  ]
}
```

### StudentModel {#schema-studentmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `admissionNumber` | `string` | yes |  |
| `fullName` | `string` | yes |  |
| `gender` | `string` | yes |  |
| `dob` | `string` (date) | yes |  |
| `createdAt` | `string` (date-time) | no |  |
| `avatarUrl` | `string` \| `null` | no |  |

Example:

```json
{
  "id": 0,
  "userId": "string",
  "user": {
    "firstName": "string",
    "lastName": "string",
    "userType": "string",
    "nationalId": "string",
    "nationality": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "isActive": true,
    "isVerified": true,
    "address": "string",
    "chatId": "string",
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "createdAt": "2026-01-15T08:00:00Z",
    "lastLoginAt": "2026-01-15T08:00:00Z",
    "transactionPinHash": "string",
    "referralCode": "string",
    "referredByUserId": "string",
    "referredByUser": null,
    "referrals": null,
    "adminProfileId": 0,
    "teacherProfileId": 0,
    "studentProfileId": 0,
    "parentProfileId": 0,
    "adminProfile": null,
    "teacherProfile": null,
    "studentProfile": null,
    "parentProfile": null,
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2026-01-15T08:00:00Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
  },
  "admissionNumber": "string",
  "fullName": "string",
  "gender": "string",
  "dob": "2026-01-15",
  "createdAt": "2026-01-15T08:00:00Z",
  "avatarUrl": "string"
}
```

### SubProgramGradeLevelModel {#schema-subprogramgradelevelmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `subProgramId` | `integer` (int32) | no |  |
| `subProgram` | [`SubProgramModel`](#schema-subprogrammodel) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `gradeLevel` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |

Example:

```json
{
  "id": 0,
  "subProgramId": 0,
  "subProgram": {
    "id": 0,
    "programId": 0,
    "program": {
      "id": 0,
      "programName": "string",
      "programTypeId": 0,
      "programType": {
        "id": null,
        "name": null,
        "colorCode": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "programStartDate": "2026-01-15T08:00:00Z",
      "programEndDate": "2026-01-15T08:00:00Z",
      "hasSubPrograms": true,
      "subPrograms": [],
      "schedules": [],
      "holidays": null,
      "businessHours": null
    },
    "name": "string",
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "startDate": "2026-01-15T08:00:00Z",
    "endDate": "2026-01-15T08:00:00Z",
    "slotDurationMinutes": 0,
    "subProgramGradeLevels": null,
    "subProgramSubjects": null
  },
  "gradeLevelId": 0,
  "gradeLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "name": "string"
  }
}
```

### SubProgramModel {#schema-subprogrammodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `programId` | `integer` (int32) | no |  |
| `program` | [`ProgramModel`](#schema-programmodel) | no |  |
| `name` | `string` | no |  |
| `educationLevelId` | `integer` (int32) | no |  |
| `educationLevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |
| `startDate` | `string` (date-time) | no |  |
| `endDate` | `string` (date-time) | no |  |
| `slotDurationMinutes` | `integer` (int32) | no |  |
| `subProgramGradeLevels` | [`subProgramGradeLevels`](#schema-subprogramgradelevels) | no |  |
| `subProgramSubjects` | [`subProgramSubjects`](#schema-subprogramsubjects) | no |  |

Example:

```json
{
  "id": 0,
  "programId": 0,
  "program": {
    "id": 0,
    "programName": "string",
    "programTypeId": 0,
    "programType": {
      "id": 0,
      "name": "string",
      "colorCode": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "programStartDate": "2026-01-15T08:00:00Z",
    "programEndDate": "2026-01-15T08:00:00Z",
    "hasSubPrograms": true,
    "subPrograms": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "name": "string",
        "educationLevelId": 0,
        "educationLevel": null,
        "startDate": "2026-01-15T08:00:00Z",
        "endDate": "2026-01-15T08:00:00Z",
        "slotDurationMinutes": 0,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      }
    ],
    "schedules": [
      {
        "id": 0,
        "programId": 0,
        "program": null,
        "dayOfWeek": null,
        "isActive": true,
        "startTime": "string",
        "endTime": "string",
        "breaks": []
      }
    ],
    "holidays": null,
    "businessHours": null
  },
  "name": "string",
  "educationLevelId": 0,
  "educationLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  },
  "startDate": "2026-01-15T08:00:00Z",
  "endDate": "2026-01-15T08:00:00Z",
  "slotDurationMinutes": 0,
  "subProgramGradeLevels": null,
  "subProgramSubjects": null
}
```

### SubProgramRequest {#schema-subprogramrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `educationLevelId` | `integer` (int32) | no |  |
| `gradeLevelIds` | `array` of `integer` (int32) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `subjectIds` | `array` of `integer` (int32) | no |  |
| `startDate` | `string` (date-time) | no |  |
| `endDate` | `string` (date-time) | no |  |
| `slotDurationMinutes` | `integer` (int32) | no |  |

Example:

```json
{
  "name": "string",
  "educationLevelId": 0,
  "gradeLevelIds": [
    0
  ],
  "gradeLevelId": 0,
  "subjectIds": [
    0
  ],
  "startDate": "2026-01-15T08:00:00Z",
  "endDate": "2026-01-15T08:00:00Z",
  "slotDurationMinutes": 0
}
```

### SubProgramSlotModel {#schema-subprogramslotmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `subProgramId` | `integer` (int32) | no |  |
| `subProgram` | [`SubProgramModel`](#schema-subprogrammodel) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `gradeLevel` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |
| `slotDate` | `string` (date-time) | yes |  |
| `startTime` | `string` | yes |  |
| `endTime` | `string` | yes |  |
| `status` | [`SlotStatus`](#schema-slotstatus) | yes |  |
| `code` | `string` | yes |  |
| `subjectId` | `integer` (int32) \| `null` | no |  |
| `subjectName` | `string` \| `null` | no |  |
| `subject` | [`SubjectModel`](#schema-subjectmodel) | no |  |
| `teacherId` | `integer` (int32) \| `null` | no |  |
| `teacherName` | `string` \| `null` | no |  |
| `teacher` | [`TeacherModel`](#schema-teachermodel) | no |  |
| `lessonId` | `integer` (int32) \| `null` | no |  |
| `lesson` | `null` \| [`LessonModel`](#schema-lessonmodel) | no |  |
| `invitations` | `array` of [`SlotInvitationModel`](#schema-slotinvitationmodel) | no |  |

Example:

```json
{
  "id": 0,
  "subProgramId": 0,
  "subProgram": {
    "id": 0,
    "programId": 0,
    "program": {
      "id": 0,
      "programName": "string",
      "programTypeId": 0,
      "programType": {
        "id": null,
        "name": null,
        "colorCode": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "programStartDate": "2026-01-15T08:00:00Z",
      "programEndDate": "2026-01-15T08:00:00Z",
      "hasSubPrograms": true,
      "subPrograms": [],
      "schedules": [],
      "holidays": null,
      "businessHours": null
    },
    "name": "string",
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "startDate": "2026-01-15T08:00:00Z",
    "endDate": "2026-01-15T08:00:00Z",
    "slotDurationMinutes": 0,
    "subProgramGradeLevels": null,
    "subProgramSubjects": null
  },
  "gradeLevelId": 0,
  "gradeLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "name": "string"
  },
  "slotDate": "2026-01-15T08:00:00Z",
  "startTime": "string",
  "endTime": "string",
  "status": 0,
  "code": "string",
  "subjectId": 0,
  "subjectName": "string",
  "subject": {
    "id": 0,
    "categoryId": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "name": "string",
    "colorCode": "string",
    "subProgramSubjects": [
      {
        "id": 0,
        "subProgramId": 0,
        "subProgram": null,
        "subjectId": 0,
        "subject": null
      }
    ]
  },
  "teacherId": 0,
  "teacherName": "string",
  "teacher": {
    "id": 0,
    "userId": "string",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "certificateLevelId": 0,
    "certificateLevel": {
      "id": 0,
      "name": "string"
    },
    "fullName": "string",
    "nationalId": "string",
    "phone": "string",
    "address": "string",
    "bio": "string",
    "gender": "string",
    "tscNumber": "string",
    "dob": "2026-01-15",
    "workplace": "string",
    "nationality": "string",
    "createdAt": "2026-01-15T08:00:00Z",
    "isIndependent": true,
    "hasAcceptedContract": true,
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "avatarUrl": "string"
  },
  "lessonId": 0,
  "lesson": null,
  "invitations": [
    {
      "id": 0,
      "slotId": 0,
      "slot": {
        "id": 0,
        "subProgramId": 0,
        "subProgram": null,
        "gradeLevelId": 0,
        "gradeLevel": null,
        "slotDate": "2026-01-15T08:00:00Z",
        "startTime": "string",
        "endTime": "string",
        "status": null,
        "code": "string",
        "subjectId": 0,
        "subjectName": "string",
        "subject": null,
        "teacherId": 0,
        "teacherName": "string",
        "teacher": null,
        "lessonId": 0,
        "lesson": null,
        "invitations": []
      },
      "teacherId": 0,
      "teacherName": "string",
      "teacher": {
        "id": 0,
        "userId": "string",
        "user": null,
        "certificateLevelId": 0,
        "certificateLevel": null,
        "fullName": "string",
        "nationalId": "string",
        "phone": "string",
        "address": "string",
        "bio": "string",
        "gender": "string",
        "tscNumber": "string",
        "dob": "2026-01-15",
        "workplace": "string",
        "nationality": "string",
        "createdAt": "2026-01-15T08:00:00Z",
        "isIndependent": true,
        "hasAcceptedContract": true,
        "hasAcceptedTerms": true,
        "termsAcceptedAt": "2026-01-15T08:00:00Z",
        "avatarUrl": "string"
      },
      "status": "string",
      "createdAt": "2026-01-15T08:00:00Z",
      "token": "string",
      "expiresAt": "2026-01-15T08:00:00Z",
      "isUsed": true
    }
  ]
}
```

### SubProgramSubjectModel {#schema-subprogramsubjectmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `subProgramId` | `integer` (int32) | no |  |
| `subProgram` | [`SubProgramModel`](#schema-subprogrammodel) | no |  |
| `subjectId` | `integer` (int32) | no |  |
| `subject` | [`SubjectModel`](#schema-subjectmodel) | no |  |

Example:

```json
{
  "id": 0,
  "subProgramId": 0,
  "subProgram": {
    "id": 0,
    "programId": 0,
    "program": {
      "id": 0,
      "programName": "string",
      "programTypeId": 0,
      "programType": {
        "id": null,
        "name": null,
        "colorCode": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "programStartDate": "2026-01-15T08:00:00Z",
      "programEndDate": "2026-01-15T08:00:00Z",
      "hasSubPrograms": true,
      "subPrograms": [],
      "schedules": [],
      "holidays": null,
      "businessHours": null
    },
    "name": "string",
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "startDate": "2026-01-15T08:00:00Z",
    "endDate": "2026-01-15T08:00:00Z",
    "slotDurationMinutes": 0,
    "subProgramGradeLevels": null,
    "subProgramSubjects": null
  },
  "subjectId": 0,
  "subject": {
    "id": 0,
    "categoryId": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "name": "string",
    "colorCode": "string",
    "subProgramSubjects": [
      {
        "id": 0,
        "subProgramId": 0,
        "subProgram": null,
        "subjectId": 0,
        "subject": null
      }
    ]
  }
}
```

### SubjectCategoryGetResponse {#schema-subjectcategorygetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`SubjectCategoryModel`](#schema-subjectcategorymodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string"
  }
}
```

### SubjectCategoryModel {#schema-subjectcategorymodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "id": 0,
  "name": "string"
}
```

### SubjectCategoryRequest {#schema-subjectcategoryrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |

Example:

```json
{
  "name": "string"
}
```

### SubjectGetResponse {#schema-subjectgetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`SubjectModel`](#schema-subjectmodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "categoryId": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "name": "string",
    "colorCode": "string",
    "subProgramSubjects": [
      {
        "id": 0,
        "subProgramId": 0,
        "subProgram": null,
        "subjectId": 0,
        "subject": null
      }
    ]
  }
}
```

### SubjectItem {#schema-subjectitem}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | no |  |
| `curriculumId` | `integer` (int32) \| `null` | no |  |
| `gradeLevelId` | `integer` (int32) \| `null` | no |  |

Example:

```json
{
  "id": 0,
  "name": "string",
  "curriculumId": 0,
  "gradeLevelId": 0
}
```

### SubjectModel {#schema-subjectmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `categoryId` | `integer` (int32) | yes |  |
| `category` | [`SubjectCategoryModel`](#schema-subjectcategorymodel) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `educationlevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `gradeLevel` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |
| `subProgramSubjects` | `array` of [`SubProgramSubjectModel`](#schema-subprogramsubjectmodel) | no |  |

Example:

```json
{
  "id": 0,
  "categoryId": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "curriculumId": 0,
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "educationLevelId": 0,
  "educationlevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  },
  "gradeLevelId": 0,
  "gradeLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "name": "string"
  },
  "name": "string",
  "colorCode": "string",
  "subProgramSubjects": [
    {
      "id": 0,
      "subProgramId": 0,
      "subProgram": {
        "id": 0,
        "programId": 0,
        "program": null,
        "name": "string",
        "educationLevelId": 0,
        "educationLevel": null,
        "startDate": "2026-01-15T08:00:00Z",
        "endDate": "2026-01-15T08:00:00Z",
        "slotDurationMinutes": 0,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      },
      "subjectId": 0,
      "subject": {
        "id": 0,
        "categoryId": 0,
        "category": null,
        "curriculumId": 0,
        "curriculum": null,
        "educationLevelId": 0,
        "educationlevel": null,
        "gradeLevelId": 0,
        "gradeLevel": null,
        "name": "string",
        "colorCode": "string",
        "subProgramSubjects": []
      }
    }
  ]
}
```

### SubjectRequest {#schema-subjectrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |

Example:

```json
{
  "categoryId": 0,
  "curriculumId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "name": "string",
  "colorCode": "string"
}
```

### SubmitAssignmentRequest {#schema-submitassignmentrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignmentId` | `integer` (int32) | no |  |
| `submissionText` | `string` | no |  |
| `fileUrl` | `string` \| `null` | no |  |

Example:

```json
{
  "assignmentId": 0,
  "submissionText": "string",
  "fileUrl": "string"
}
```

### SubmitExamRequest {#schema-submitexamrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `examId` | `integer` (int32) | no |  |
| `answers` | `array` of [`ExamAnswerRequest`](#schema-examanswerrequest) | no |  |

Example:

```json
{
  "examId": 0,
  "answers": [
    {
      "questionId": 0,
      "answerText": "string",
      "selectedOptionLabel": "string"
    }
  ]
}
```

### SubmitQuizRequest {#schema-submitquizrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `quizId` | `integer` (int32) | no |  |
| `answers` | `array` of [`QuizAnswerRequest`](#schema-quizanswerrequest) | no |  |

Example:

```json
{
  "quizId": 0,
  "answers": [
    {
      "questionId": 0,
      "selectedOptionLabel": "string",
      "answerText": "string"
    }
  ]
}
```

### TeacherEnrollmentRequest {#schema-teacherenrollmentrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `schoolId` | `integer` (int32) \| `null` | no |  |
| `subjectIds` | `array` of `integer` (int32) \| `null` | no |  |

Example:

```json
{
  "curriculumId": 0,
  "gradeLevelId": 0,
  "schoolId": 0,
  "subjectIds": [
    0
  ]
}
```

### TeacherModel {#schema-teachermodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `certificateLevelId` | `integer` (int32) \| `null` | no |  |
| `certificateLevel` | [`CertificateLevelModel`](#schema-certificatelevelmodel) | no |  |
| `fullName` | `string` | yes |  |
| `nationalId` | `string` | yes |  |
| `phone` | `string` | yes |  |
| `address` | `string` | yes |  |
| `bio` | `string` | no |  |
| `gender` | `string` | yes |  |
| `tscNumber` | `string` \| `null` | no |  |
| `dob` | `string` (date) | yes |  |
| `workplace` | `string` \| `null` | no |  |
| `nationality` | `string` \| `null` | no |  |
| `createdAt` | `string` (date-time) | no |  |
| `isIndependent` | `boolean` | no |  |
| `hasAcceptedContract` | `boolean` | no |  |
| `hasAcceptedTerms` | `boolean` | no |  |
| `termsAcceptedAt` | `string` (date-time) \| `null` | no |  |
| `avatarUrl` | `string` \| `null` | no |  |

Example:

```json
{
  "id": 0,
  "userId": "string",
  "user": {
    "firstName": "string",
    "lastName": "string",
    "userType": "string",
    "nationalId": "string",
    "nationality": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "isActive": true,
    "isVerified": true,
    "address": "string",
    "chatId": "string",
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "createdAt": "2026-01-15T08:00:00Z",
    "lastLoginAt": "2026-01-15T08:00:00Z",
    "transactionPinHash": "string",
    "referralCode": "string",
    "referredByUserId": "string",
    "referredByUser": null,
    "referrals": null,
    "adminProfileId": 0,
    "teacherProfileId": 0,
    "studentProfileId": 0,
    "parentProfileId": 0,
    "adminProfile": null,
    "teacherProfile": null,
    "studentProfile": null,
    "parentProfile": null,
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2026-01-15T08:00:00Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
  },
  "certificateLevelId": 0,
  "certificateLevel": {
    "id": 0,
    "name": "string"
  },
  "fullName": "string",
  "nationalId": "string",
  "phone": "string",
  "address": "string",
  "bio": "string",
  "gender": "string",
  "tscNumber": "string",
  "dob": "2026-01-15",
  "workplace": "string",
  "nationality": "string",
  "createdAt": "2026-01-15T08:00:00Z",
  "isIndependent": true,
  "hasAcceptedContract": true,
  "hasAcceptedTerms": true,
  "termsAcceptedAt": "2026-01-15T08:00:00Z",
  "avatarUrl": "string"
}
```

### TeacherSelfEnrollmentRequest {#schema-teacherselfenrollmentrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | no |  |
| `educationLevelId` | `integer` (int32) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `schoolId` | `integer` (int32) \| `null` | no |  |
| `tscNumber` | `string` \| `null` | no |  |
| `referralCode` | `string` \| `null` | no |  |
| `subjectIds` | `array` of `integer` (int32) \| `null` | no |  |

Example:

```json
{
  "curriculumId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "schoolId": 0,
  "tscNumber": "string",
  "referralCode": "string",
  "subjectIds": [
    0
  ]
}
```

### TopicGetResponse {#schema-topicgetresponse}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`TopicsModel`](#schema-topicsmodel) | no |  |

Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "curriculumId": 0,
    "subjectId": 0,
    "gradeLevelId": 0,
    "educationLevelId": 0,
    "name": "string",
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "subject": {
      "id": 0,
      "categoryId": 0,
      "category": {
        "id": null,
        "name": null
      },
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationlevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "gradeLevelId": 0,
      "gradeLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationLevel": null,
        "name": null
      },
      "name": "string",
      "colorCode": "string",
      "subProgramSubjects": []
    },
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    }
  }
}
```

### TopicRequest {#schema-topicrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `subjectId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "subjectId": 0,
  "curriculumId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "name": "string"
}
```

### TopicsModel {#schema-topicsmodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `subjectId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `subject` | [`SubjectModel`](#schema-subjectmodel) | no |  |
| `gradeLevel` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |
| `educationlevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |

Example:

```json
{
  "id": 0,
  "curriculumId": 0,
  "subjectId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "name": "string",
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "subject": {
    "id": 0,
    "categoryId": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "educationLevelId": 0,
      "educationLevel": {
        "id": null,
        "curriculumId": null,
        "curriculum": null,
        "name": null
      },
      "name": "string"
    },
    "name": "string",
    "colorCode": "string",
    "subProgramSubjects": [
      {
        "id": 0,
        "subProgramId": 0,
        "subProgram": null,
        "subjectId": 0,
        "subject": null
      }
    ]
  },
  "gradeLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": {
        "id": null,
        "name": null,
        "acronym": null,
        "schools": null
      },
      "name": "string"
    },
    "name": "string"
  },
  "educationlevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  }
}
```

### TransferRequest {#schema-transferrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `receiverUserId` | `string` | no |  |
| `amount` | `number` | no |  |
| `pin` | `string` | no |  |

Example:

```json
{
  "receiverUserId": "string",
  "amount": 0,
  "pin": "string"
}
```

### UpdateLessonRequirementsRequest {#schema-updatelessonrequirementsrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | yes |  |
| `requirements` | `string` | yes |  |

Example:

```json
{
  "lessonId": 0,
  "requirements": "string"
}
```

### UpdateProfileRequest {#schema-updateprofilerequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `firstName` | `string` \| `null` | no |  |
| `lastName` | `string` \| `null` | no |  |
| `nationality` | `string` \| `null` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `email` | `string` \| `null` | no |  |
| `phone` | `string` \| `null` | no |  |
| `address` | `string` \| `null` | no |  |
| `role` | `string` | no |  |
| `gender` | `string` | no |  |
| `dob` | `string` (date) | no |  |

Example:

```json
{
  "firstName": "string",
  "lastName": "string",
  "nationality": "string",
  "nationalId": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "role": "string",
  "gender": "string",
  "dob": "2026-01-15"
}
```

### UserModel {#schema-usermodel}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `firstName` | `string` | no |  |
| `lastName` | `string` | no |  |
| `userType` | `string` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `nationality` | `string` \| `null` | no |  |
| `gender` | `string` \| `null` | no |  |
| `dob` | `string` (date) \| `null` | no |  |
| `isActive` | `boolean` | no |  |
| `isVerified` | `boolean` | no |  |
| `address` | `string` \| `null` | no |  |
| `chatId` | `string` \| `null` | no |  |
| `hasAcceptedTerms` | `boolean` | no |  |
| `termsAcceptedAt` | `string` (date-time) \| `null` | no |  |
| `createdAt` | `string` (date-time) | no |  |
| `lastLoginAt` | `string` (date-time) \| `null` | no |  |
| `transactionPinHash` | `string` \| `null` | no |  |
| `referralCode` | `string` \| `null` | no |  |
| `referredByUserId` | `string` \| `null` | no |  |
| `referredByUser` | `null` \| [`UserModel`](#schema-usermodel) | no |  |
| `referrals` | [`referrals`](#schema-referrals) | no |  |
| `adminProfileId` | `integer` (int32) \| `null` | no |  |
| `teacherProfileId` | `integer` (int32) \| `null` | no |  |
| `studentProfileId` | `integer` (int32) \| `null` | no |  |
| `parentProfileId` | `integer` (int32) \| `null` | no |  |
| `adminProfile` | `null` \| [`AdminModel`](#schema-adminmodel) | no |  |
| `teacherProfile` | `null` \| [`TeacherModel`](#schema-teachermodel) | no |  |
| `studentProfile` | `null` \| [`StudentModel`](#schema-studentmodel) | no |  |
| `parentProfile` | `null` \| [`ParentModel`](#schema-parentmodel) | no |  |
| `id` | `string` \| `null` | no |  |
| `userName` | `string` \| `null` | no |  |
| `normalizedUserName` | `string` \| `null` | no |  |
| `email` | `string` \| `null` | no |  |
| `normalizedEmail` | `string` \| `null` | no |  |
| `emailConfirmed` | `boolean` | no |  |
| `passwordHash` | `string` \| `null` | no |  |
| `securityStamp` | `string` \| `null` | no |  |
| `concurrencyStamp` | `string` \| `null` | no |  |
| `phoneNumber` | `string` \| `null` | no |  |
| `phoneNumberConfirmed` | `boolean` | no |  |
| `twoFactorEnabled` | `boolean` | no |  |
| `lockoutEnd` | `string` (date-time) \| `null` | no |  |
| `lockoutEnabled` | `boolean` | no |  |
| `accessFailedCount` | `integer` (int32) | no |  |

Example:

```json
{
  "firstName": "string",
  "lastName": "string",
  "userType": "string",
  "nationalId": "string",
  "nationality": "string",
  "gender": "string",
  "dob": "2026-01-15",
  "isActive": true,
  "isVerified": true,
  "address": "string",
  "chatId": "string",
  "hasAcceptedTerms": true,
  "termsAcceptedAt": "2026-01-15T08:00:00Z",
  "createdAt": "2026-01-15T08:00:00Z",
  "lastLoginAt": "2026-01-15T08:00:00Z",
  "transactionPinHash": "string",
  "referralCode": "string",
  "referredByUserId": "string",
  "referredByUser": null,
  "referrals": null,
  "adminProfileId": 0,
  "teacherProfileId": 0,
  "studentProfileId": 0,
  "parentProfileId": 0,
  "adminProfile": null,
  "teacherProfile": null,
  "studentProfile": null,
  "parentProfile": null,
  "id": "string",
  "userName": "string",
  "normalizedUserName": "string",
  "email": "string",
  "normalizedEmail": "string",
  "emailConfirmed": true,
  "passwordHash": "string",
  "securityStamp": "string",
  "concurrencyStamp": "string",
  "phoneNumber": "string",
  "phoneNumberConfirmed": true,
  "twoFactorEnabled": true,
  "lockoutEnd": "2026-01-15T08:00:00Z",
  "lockoutEnabled": true,
  "accessFailedCount": 0
}
```

### VerificationEmailRequest {#schema-verificationemailrequest}

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | `string` | no |  |
| `token` | `string` | no |  |

Example:

```json
{
  "userId": "string",
  "token": "string"
}
```
