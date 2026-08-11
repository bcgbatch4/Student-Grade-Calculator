# Student Grade Calculator – Testing

## 1. Normal Input Testing

The application was tested using normal student information and valid assessment scores.

| Test Case | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Add student | John Doe, CA 85, Assignment 78, Exam 90 | Student record added successfully | Student record added | PASS |
| Calculate total | 85 + 78 + 90 | Total = 253 | Total = 253 | PASS |
| Calculate average | 253 ÷ 3 | Average = 84.33 | Average = 84.33 | PASS |
| Calculate grade | Average = 84.33 | Grade = A | Grade = A | PASS |
| Check status | Average = 84.33 | Status = PASS | Status = PASS | PASS |
| Display records | Saved student record | Record appears in table | Record appears in table | PASS |

## 2. Grade Boundary Testing

The grading boundaries were tested to verify that each average receives the correct grade.

| Average Score | Expected Grade | Actual Grade | Status |
|---:|---|---|---|
| 80 | A | A | PASS |
| 70 | B | B | PASS |
| 60 | C | C | PASS |
| 50 | D | D | PASS |
| 40 | E | E | PASS |
| 39 | F | F | PASS |

## 3. Edge Case and Invalid Input Testing

The application was tested with unusual and invalid inputs.

| Test Case | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Empty student name | Blank name | Error message displayed | "Please enter a student name." | PASS |
| Empty CA score | Blank | Error message displayed | "Please enter a valid CA score." | PASS |
| Empty Assignment score | Blank | Error message displayed | "Please enter a valid assignment score." | PASS |
| Empty Exam score | Blank | Error message displayed | "Please enter a valid exam score." | PASS |
| Negative score | -10 | Error message displayed | "CA score must be between 0 and 100." | PASS |
| Score above 100 | 150 | Error message displayed | "CA score must be between 0 and 100." | PASS |
| Invalid score | Text instead of number | Error message displayed | Input validation prevents invalid score | PASS |

## 4. CRUD and Record Management Testing

| Test Case | Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Add record | Click Calculate & Add Student | Student appears in table | Confirmed with John Doe | PASS |
| Search record | Enter student's name | Matching student appears | Student search works | PASS |
| Delete record | Click delete button | Student is removed | Student record removed | PASS |
| Clear form | Click Clear Form | Input fields become empty | Form cleared | PASS |

## 5. Local Storage Testing

| Test Case | Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Save records | Add a student | Record saved to Local Storage | Record saved | PASS |
| Refresh page | Refresh browser | Student record remains | Student record remains | PASS |
| Delete saved record | Delete student | Record removed from Local Storage | Record removed | PASS |

## 6. Navigation Testing

The navigation bar was tested to ensure that each section opens correctly.

| Test Case | Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Dashboard | Click Dashboard | Dashboard view displayed | Dashboard displayed | PASS |
| All Students | Click All Students | All Students view displayed | All Students displayed | PASS |
| About | Click About | About view displayed | About displayed | PASS |

## 7. Bug Found and Fixed

### Bug

During development, the navigation buttons did not initially switch correctly
between the Dashboard, All Students and About sections.

### Cause

The navigation links were not properly connected to the corresponding application views.

### Fix

A `showView()` function was implemented to control which view is displayed.
Each navigation link was connected to its corresponding view using the
`data-view` attribute.

### Implementation

```javascript
function showView(name) {
    Object.entries(views).forEach(([key, el]) => {
        if (!el) return;
        el.hidden = key !== name;
    });

    if (name === "students") {
        renderTables();
    }
}
```

The navigation links were then connected using click event listeners.

### Result

The Dashboard, All Students and About navigation buttons now work correctly.

**Bug status: FIXED**

## 8. Testing Summary

The Student Grade Calculator was tested using:

- Normal valid inputs
- Grade boundary values
- Empty inputs
- Negative values
- Values above 100
- Invalid values
- Student search
- Student deletion
- Form clearing
- Local Storage persistence
- Navigation between application views

The tests confirmed that the main application functionality works as expected.
