# Student Grade Calculator – Project Plan

## 1. Project Title

Student Grade Calculator

---

## 2. Project Description

The Student Grade Calculator is a web-based application designed to help
lecturers and students calculate and manage academic performance.

Users can enter a student's name and three assessment scores. The
application calculates the student's total score, average score, letter
grade, and pass/fail status.

Student records are stored using the browser's Local Storage so that the
records remain available after the page is refreshed.

---

## 3. Project Requirements

The application must:

1. Allow users to enter a student's name and three assessment scores.
2. Calculate the student's total and average score.
3. Automatically assign a grade from A to F.
4. Display the student's pass/fail status and student records.
5. Store student records in Local Storage and allow records to be deleted.

---

## 4. Classes and Methods

### Student Class

The `Student` class represents an individual student and contains the
student's name and assessment scores.

Methods:

- `getTotal()` – calculates the student's total score.
- `getAverage()` – calculates the student's average score.
- `getGrade()` – determines the student's grade from A to F.
- `getStatus()` – determines whether the student passed or failed.

### GradeBook Class

The `GradeBook` class manages the collection of student records.

Methods:

- `load()` – retrieves saved student records from Local Storage.
- `save()` – saves student records to Local Storage.
- `add()` – adds a new student record.
- `remove()` – removes a student record.
- `stats()` – calculates dashboard statistics.

---

## 5. Expected Input and Output

| Feature | Expected Input | Expected Output |
|---|---|---|
| Add Student | Student name, CA, Assignment, Exam | New student record |
| Calculate Total | Three assessment scores | Total score |
| Calculate Average | Total score | Average score |
| Assign Grade | Average score | Grade A–F |
| Pass/Fail | Average score | PASS or FAIL |
| Display Records | Saved student records | Student records table |
| Delete Student | Student record ID | Updated student records |
| Local Storage | Student records | Saved records after refresh |

---

## 6. Assessment Scores

The application accepts three assessment scores:

- CA Score – 0 to 100
- Assignment Score – 0 to 100
- Exam Score – 0 to 100

The total is calculated as:

Total = CA + Assignment + Exam

The average is calculated as:

Average = Total ÷ 3

---

## 7. Grading Scale

| Grade | Average |
|---|---|
| A | 80 – 100 |
| B | 70 – 79 |
| C | 60 – 69 |
| D | 50 – 59 |
| E | 40 – 49 |
| F | 0 – 39 |

A student with an average of 50 or above is marked as PASS.
A student below 50 is marked as FAIL.

---

## 8. Technologies Used

- HTML5
- CSS3
- JavaScript ES6
- Object-Oriented Programming (OOP)
- Local Storage
- Git
- GitHub

---

## 9. Main Features

- Add student records
- Calculate total score
- Calculate average score
- Automatically assign grades
- Display pass/fail status
- Display all student records
- Search student records
- Delete student records
- Save records using Local Storage
- Dashboard statistics
- About section
- Light/dark theme

---

## 10. Development Plan

### Phase 1 – Project Planning
Define the project requirements, inputs, outputs, classes and functions.

### Phase 2 – Version Control
Create the GitHub repository and commit the project plan.

### Phase 3 – HTML Structure
Build the application interface and student input form.

### Phase 4 – CSS Styling
Design the responsive interface, navigation bar, cards, table and
interactive elements.

### Phase 5 – JavaScript Functionality
Implement the Student and GradeBook classes, calculations, validation,
Local Storage, search, deletion and navigation.

### Phase 6 – Testing
Test the application using normal inputs, invalid inputs and edge cases.
Document bugs discovered and their fixes.

### Phase 7 – Presentation
Prepare the presentation slides and demonstrate the completed application.