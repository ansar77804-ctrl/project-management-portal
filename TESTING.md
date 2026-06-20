# Testing Guide - Project Management Portal Advanced Features

This document provides comprehensive testing procedures for all advanced features.

---

## 🧪 Test Environment Setup

### Prerequisites
- ✅ Backend running on http://localhost:5001
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB running locally
- ✅ Browser Developer Tools open (F12)

---

## 🔐 1. User Authentication Testing

### 1.1 Test User Registration

**Steps:**
1. Go to http://localhost:5173
2. You should see login page (if not logged in)
3. Click "Register" button
4. Enter:
   - Username: `testuser123`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
5. Click "Register" button

**Expected Result:**
- ✅ No error message appears
- ✅ Automatically logged in
- ✅ Redirected to dashboard
- ✅ Username visible in top-right corner: "testuser123"
- ✅ Token stored in localStorage

**Verification:**
```javascript
// In browser console (F12 > Console tab)
localStorage.getItem("token")    // Should show JWT token
localStorage.getItem("user")     // Should show user JSON
```

---

### 1.2 Test Registration Validation

**Test: Email Validation**

Steps:
1. Click "Register" button
2. Enter:
   - Username: `testuser`
   - Email: `invalidemail` (no @ symbol)
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Register"

Expected Result:
- ✅ Error: "Please enter a valid email"
- ✅ Form not submitted
- ✅ User stays on register page

**Test: Password Length Validation**

Steps:
1. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `pass` (less than 6 chars)
   - Confirm Password: `pass`
3. Click "Register"

Expected Result:
- ✅ Error: "Password must be at least 6 characters"

**Test: Password Confirmation Match**

Steps:
1. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `different123`
3. Click "Register"

Expected Result:
- ✅ Error: "Passwords do not match"

**Test: Duplicate Email**

Steps:
1. Register first account with `test@example.com`
2. Logout (click "Logout" button)
3. Try to register again with same email
4. Enter:
   - Username: `newuser`
   - Email: `test@example.com` (same as before)
   - Password: `password123`
   - Confirm Password: `password123`
5. Click "Register"

Expected Result:
- ✅ Error: "Email already exists"
- ✅ User not created

---

### 1.3 Test User Login

**Steps:**
1. Click "Login" button (toggle from Register)
2. Enter:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Login" button

**Expected Result:**
- ✅ No error message
- ✅ Logged in successfully
- ✅ Redirected to dashboard
- ✅ Username visible: "testuser123"

**Verification:**
```javascript
// Check token in console
localStorage.getItem("token")
```

---

### 1.4 Test Login Validation

**Test: Invalid Email**

Steps:
1. On login page, enter:
   - Email: `nonexistent@example.com`
   - Password: `password123`
2. Click "Login"

Expected Result:
- ✅ Error message appears
- ✅ User not logged in

**Test: Invalid Password**

Steps:
1. Enter:
   - Email: `test@example.com`
   - Password: `wrongpassword`
2. Click "Login"

Expected Result:
- ✅ Error: "Invalid email or password"
- ✅ User not logged in

**Test: Empty Fields**

Steps:
1. Leave email or password empty
2. Click "Login"

Expected Result:
- ✅ Error: "[Field] is required"

---

### 1.5 Test Logout

**Steps:**
1. Login to dashboard
2. Click "Logout" button (top-right corner)

**Expected Result:**
- ✅ Redirected to login page
- ✅ Username no longer shows
- ✅ localStorage cleared
- ✅ Token removed

**Verification:**
```javascript
// Check console
localStorage.getItem("token")    // Should return null
localStorage.getItem("user")     // Should return null
```

---

### 1.6 Test Token Persistence

**Steps:**
1. Login with email and password
2. Refresh page (F5)
3. Wait for page to load

**Expected Result:**
- ✅ Still logged in
- ✅ Dashboard visible
- ✅ No login page shown
- ✅ Tasks loaded

---

## 🔍 2. Search Functionality Testing

### 2.1 Test Search by Title

**Prerequisites:**
- ✅ Logged in
- ✅ Have tasks created (at least 2-3 tasks with different titles)

**Sample Tasks to Create:**
1. "Backend API Development" - "Work on REST endpoints"
2. "Frontend UI Design" - "Design user interface components"
3. "Database Schema" - "Design MongoDB collections"

**Steps:**
1. Go to dashboard
2. In search box, type: "backend"
3. Press Enter or wait for auto-search

**Expected Result:**
- ✅ Only "Backend API Development" task shows
- ✅ Other tasks disappear
- ✅ Search is real-time (no need to press Enter)

---

### 2.2 Test Search by Description

**Steps:**
1. In search box, type: "REST"
2. Wait for results to filter

**Expected Result:**
- ✅ Only task with "REST" in description shows ("Backend API Development")
- ✅ Other tasks hidden

---

### 2.3 Test Case-Insensitive Search

**Steps:**
1. Clear search box
2. Type: "backend" (lowercase)
3. Results show
4. Clear search box
5. Type: "BACKEND" (uppercase)

**Expected Result:**
- ✅ Same results for both searches
- ✅ Case-insensitive matching works

---

### 2.4 Test Search Clear

**Steps:**
1. Search for a term: "backend"
2. Results filtered
3. Click "✕ Clear" button next to search box

**Expected Result:**
- ✅ Search box clears
- ✅ All tasks reappear
- ✅ Back to original list

---

### 2.5 Test Search with No Results

**Steps:**
1. Type search term: "xyznonexistent"
2. Wait for results

**Expected Result:**
- ✅ Message: "No tasks exist."
- ✅ No tasks displayed
- ✅ Clear button works

---

### 2.6 Test Search with Pagination

**Prerequisites:**
- ✅ Have 15+ tasks (across multiple pages)

**Steps:**
1. Create 15+ tasks with keywords
2. Search for keyword that appears in tasks on different pages
3. Check results

**Expected Result:**
- ✅ All matching tasks appear (not limited to current page)
- ✅ Pagination works with search results
- ✅ Correct total count shown

---

## 📄 3. Pagination Testing

### 3.1 Test Default Pagination

**Prerequisites:**
- ✅ Have 15+ tasks

**Steps:**
1. Go to dashboard
2. Check how many tasks visible (should be 10)
3. Look at page navigation

**Expected Result:**
- ✅ First 10 tasks visible
- ✅ Page indicator shows "Page 1"
- ✅ More pages available

---

### 3.2 Test Page Navigation

**Steps:**
1. With 15+ tasks, page 1 shows 10 tasks
2. Click on "Page 2" or next page button
3. Wait for loading

**Expected Result:**
- ✅ Remaining tasks appear (5 tasks if 15 total)
- ✅ Page indicator updates to "Page 2"
- ✅ Previous page button enabled
- ✅ Next page button disabled (if last page)

---

### 3.3 Test Total Count

**Steps:**
1. Create exactly 25 tasks
2. Dashboard should show pagination info

**Expected Result:**
- ✅ Pagination shows: "Total: 25" or similar
- ✅ Number of pages calculated: 3 pages
- ✅ Page navigation shows 1, 2, 3

---

### 3.4 Test Search with Pagination

**Steps:**
1. Search for keyword that appears in 12 tasks
2. Check pagination

**Expected Result:**
- ✅ Page 1: 10 matching tasks
- ✅ Page 2: 2 matching tasks
- ✅ Pagination responds correctly to search

---

## 📊 4. Statistics Dashboard Testing

### 4.1 Test Initial Statistics

**Steps:**
1. Login with fresh account
2. Check statistics dashboard at top

**Expected Result:**
- ✅ Statistics cards visible with 4 metrics:
   - 📊 Total Tasks: 0
   - ⏳ Pending: 0
   - 🔄 In Progress: 0
   - ✅ Completed: 0
- ✅ Progress bar shows 0%
- ✅ All values are 0

---

### 4.2 Test Statistics After Creating Task

**Steps:**
1. Create new task
2. Task status: "Pending" (default)
3. Check statistics

**Expected Result:**
- ✅ 📊 Total Tasks: 1
- ✅ ⏳ Pending: 1
- ✅ 🔄 In Progress: 0
- ✅ ✅ Completed: 0
- ✅ Completion %: 0%
- ✅ Progress bar: 0% width

---

### 4.3 Test Statistics with Mixed Status

**Steps:**
1. Create multiple tasks:
   - Task 1: "Pending"
   - Task 2: "In Progress"
   - Task 3: "In Progress"
   - Task 4: "Completed"
2. Check statistics

**Expected Result:**
- ✅ 📊 Total: 4
- ✅ ⏳ Pending: 1
- ✅ 🔄 In Progress: 2
- ✅ ✅ Completed: 1
- ✅ Completion %: 25% (1/4)

---

### 4.4 Test Statistics After Completion

**Steps:**
1. Have tasks with statuses: 1 Pending, 2 In Progress, 1 Completed
2. Mark a pending task as "Completed"
3. Check statistics

**Expected Result:**
- ✅ 📊 Total: 4 (unchanged)
- ✅ ⏳ Pending: 0 (decreased)
- ✅ 🔄 In Progress: 2 (unchanged)
- ✅ ✅ Completed: 2 (increased)
- ✅ Completion %: 50% (updated)
- ✅ Progress bar width increases

---

### 4.5 Test Statistics After Deletion

**Steps:**
1. Have 4 tasks (1 Pending, 2 In Progress, 1 Completed)
2. Delete one task
3. Check statistics

**Expected Result:**
- ✅ Total: 3 (decreased)
- ✅ Counts adjusted for deleted task
- ✅ Completion percentage recalculated

---

### 4.6 Test Progress Bar Visually

**Steps:**
1. Create tasks to reach 50% completion
2. Observe progress bar
3. Create more completed tasks
4. Observe progress bar expand

**Expected Result:**
- ✅ Progress bar width matches percentage
- ✅ Bar smoothly transitions (if animation enabled)
- ✅ 100% completion shows full bar
- ✅ 0% shows no bar

---

## 🕐 5. Sorting by Created Date Testing

### 5.1 Test Newest First Sorting

**Steps:**
1. Create tasks with delays:
   - Task 1: "First Task"
   - Wait 5 seconds
   - Task 2: "Second Task"
   - Wait 5 seconds
   - Task 3: "Third Task"
2. Check dashboard

**Expected Result:**
- ✅ Task 3 appears first (newest)
- ✅ Task 2 appears second
- ✅ Task 1 appears last (oldest)
- ✅ Sorted by created_at descending

---

### 5.2 Test Sorting with Pagination

**Steps:**
1. Create 15+ tasks
2. Each created at different times
3. Check page 1
4. Navigate to page 2

**Expected Result:**
- ✅ Page 1: 10 newest tasks
- ✅ Page 2: Next newest tasks
- ✅ Consistent ordering across pages

---

## 🎨 6. UI/UX Testing

### 6.1 Test Responsive Design

**Mobile View:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone 12)

**Expected Result:**
- ✅ All components visible
- ✅ No horizontal scroll
- ✅ Statistics cards stack vertically
- ✅ Search bar full width
- ✅ Buttons properly sized

**Tablet View:**
1. Select iPad device in DevTools

**Expected Result:**
- ✅ Good layout for tablet
- ✅ Statistics 2x2 grid
- ✅ Readable text

---

### 6.2 Test Dark Mode

**Steps:**
1. Click "🌙 Dark" button
2. Observe theme change

**Expected Result:**
- ✅ Background changes to dark
- ✅ Text changes to light
- ✅ All components styled for dark mode
- ✅ Statistics cards have dark background
- ✅ Search bar has dark theme

**Steps:**
1. Click "☀️ Light" to toggle back

**Expected Result:**
- ✅ Light theme restored
- ✅ All colors back to original

---

### 6.3 Test Loading States

**Steps:**
1. Create a task
2. Check for loading indicator during submission

**Expected Result:**
- ✅ Button shows loading state (disabled, spinner/text change)
- ✅ Form fields disabled during loading
- ✅ Success message or redirect after completion

---

### 6.4 Test Error Messages

**Steps:**
1. Try invalid actions (long task list to trigger API delays)
2. Observe error handling

**Expected Result:**
- ✅ Clear error messages appear
- ✅ User can retry
- ✅ Forms remain usable after error

---

## 🔗 7. API Integration Testing

### 7.1 Test API Calls in Network Tab

**Steps:**
1. Open DevTools (F12)
2. Go to Network tab
3. Perform login
4. Check network requests

**Expected Result:**
- ✅ POST /api/auth/login request visible
- ✅ Status 200 for successful login
- ✅ Response includes token and user

**Steps:**
1. Go to dashboard
2. Observe network requests
3. Check GET /api/tasks request

**Expected Result:**
- ✅ Authorization header includes Bearer token
- ✅ Response shows paginated tasks
- ✅ Statistics request: GET /api/statistics

---

### 7.2 Test Protected Routes

**Steps:**
1. Open DevTools Console
2. Clear localStorage: `localStorage.clear()`
3. Refresh page

**Expected Result:**
- ✅ Redirected to login page
- ✅ Cannot access dashboard without token

---

## ✅ 8. Complete Feature Checklist

| Feature | Test Case | Status |
|---------|-----------|--------|
| Registration | Create account | ✅ |
| Registration Validation | Email, password | ✅ |
| Login | Valid credentials | ✅ |
| Login Validation | Invalid credentials | ✅ |
| Logout | Clear token | ✅ |
| Token Persistence | Refresh page | ✅ |
| Search by Title | Filter works | ✅ |
| Search by Description | Filter works | ✅ |
| Search Case-Insensitive | Works | ✅ |
| Search Clear | Clears results | ✅ |
| Pagination Page 1 | Shows 10 items | ✅ |
| Pagination Page 2+ | Navigate pages | ✅ |
| Pagination with Search | Works together | ✅ |
| Statistics Total | Counted correctly | ✅ |
| Statistics Pending | Counted correctly | ✅ |
| Statistics In Progress | Counted correctly | ✅ |
| Statistics Completed | Counted correctly | ✅ |
| Statistics Percentage | Calculated correctly | ✅ |
| Statistics Update | Real-time | ✅ |
| Sorting by Date | Newest first | ✅ |
| Sorting with Pagination | Consistent | ✅ |
| Dark Mode | Visual theme | ✅ |
| Responsive Mobile | Layout | ✅ |
| Responsive Tablet | Layout | ✅ |
| Error Handling | User feedback | ✅ |
| Loading States | UI feedback | ✅ |

---

## 📋 Conclusion

All tests should pass with ✅ status. If any test fails:

1. **Check backend console** for errors
2. **Check frontend console (F12)** for JavaScript errors
3. **Check network tab** for failed API requests
4. **Review error messages** for clues
5. **Refer to FEATURES.md** for implementation details

---

**Test Result Summary:** Ready for deployment when all tests pass ✅
