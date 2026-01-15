# Implementation Plan - Company Code Feature

## Goal Description
Add a "Company Unique Code" field to the company registration flow. This code will be used by other staff members to join the specific company in the future.

## User Review Required
None.

## Proposed Changes

### [Types]
#### [MODIFY] [types.ts](file:///c:/Users/user1/Downloads/통합 (1)/types.ts)
- Add optional `companyCode` field to `User` interface.

### [Components]
#### [MODIFY] [AuthPage.tsx](file:///c:/Users/user1/Downloads/통합 (1)/components/AuthPage.tsx)
- Import `Key` icon from `lucide-react`.
- Update `formData` state to include `companyCode`.
- Add "Company Code" input field to `SIGNUP_ADMIN` step.
- Ensure `companyCode` is saved/passed on registration.

## Verification Plan
### Manual Verification
1. Open the application.
2. Go to Sign Up -> Register Company.
3. Verify that the "Company Code" input field appears with the Key icon.
4. Enter a code (e.g., "COMP123") and complete registration.
5. Check if the registration succeeds.
