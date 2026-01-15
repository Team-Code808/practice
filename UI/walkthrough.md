# Registration & Company Management Flow Implementation

## Overview
Implemented a new multi-step registration flow that allows users to either **Register a Company** (Admin) or **Join a Company** (Staff). Staff applications require Admin approval.

## Changes
- **`types.ts`**: Updated `User` interface to include `joinStatus` ('PENDING' | 'APPROVED' | 'REJECTED') and `position`.
- **`components/AuthPage.tsx`**:
    - Refactored to a multi-step wizard:
        1. **Basic Info**: Name, Contact, Join Date, Email, Password.
        2. **Type Selection**: "Register Company" vs "Join Company".
        3. **Role Specifics**:
            - **Register**: Company Name -> Immediately becomes Admin.
            - **Join**: Department & Position -> Submitted for approval (PENDING).
    - Persists pending applications to `localStorage` ('params_applications').
- **`components/AdminApplications.tsx`**:
    - Added **"입사 신청" (Join Requests)** tab.
    - Reads applications from `localStorage`.
    - Allows Admin to **Approve** or **Reject** applications.
- **`App.tsx`**:
    - Added status checks for logged-in users.
    - Displays **"승인 대기 중" (Waiting for Approval)** screen if `joinStatus` is PENDING.
    - Displays **"신청 반려됨" (Rejected)** screen if `joinStatus` is REJECTED.

## How to Test the Flow

### 1. Register as Admin
1. Go to the Sign Up page.
2. Enter basic info (e.g., ID: `admin1`).
3. Select **"회사 등록하기"**.
4. Enter Company Name.
5. You are now logged in as **Admin**.

### 2. Register as Staff (Join Request)
1. Open the app in a new tab (or logout).
2. Go to Sign Up.
3. Enter basic info (e.g., ID: `staff1`, Name: `New Staff`).
4. Select **"회사 참여하기"**.
5. Enter Department and Position.
6. Submit. You will see the **"승인 대기 중"** screen.
7. Logout (or close tab).

### 3. Approve Request
1. Log in as **Admin** (`admin1` from step 1, or use demo account).
2. Go to **Dashboard** -> **통합 신청 매니저** (AdminApplications).
3. Click the **"입사 신청"** tab on the top right.
4. You will see `New Staff` in the list with "대기" status.
5. Click on the user and select **"승인"**.

### 4. Verify Approval
1. Log out Admin.
2. Log in as **Staff** (`staff1`).
3. You should now see the **Staff Dashboard** instead of the Waiting screen.
