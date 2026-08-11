# Student Grade Calculator

## Project Description

The Student Grade Calculator is a web-based application designed to help
lecturers and students calculate and manage academic performance.

The application allows users to enter a student's name and three assessment
scores:

- CA Score
- Assignment Score
- Exam Score

The application automatically calculates the student's:

- Total Score
- Average Score
- Grade
- Pass/Fail Status

Student records are stored in the browser using Local Storage, allowing
records to remain available after the page is refreshed.

---

## Features

- Add student records
- Calculate total scores automatically
- Calculate average scores
- Assign grades from A to F
- Display PASS or FAIL status
- View all student records
- Search student records
- Delete student records
- Store records using Local Storage
- Dashboard statistics
- About section
- Light/Dark theme

---

## Grading System

The application uses the following grading scale:

| Grade | Average |
|---|---|
| A | 80 – 100 |
| B | 70 – 79 |
| C | 60 – 69 |
| D | 50 – 59 |
| E | 40 – 49 |
| F | 0 – 39 |

### Pass/Fail

- Average of **50 or above** → PASS
- Average **below 50** → FAIL

---

## Score Calculation

Each assessment score is entered out of 100.

### Total Score

```text
Total = CA + Assignment + Exam

Technologies Used
HTML5
CSS3
JavaScript ES6
Object-Oriented Programming (OOP)
Local Storage
Git
GitHub

Project Structure
Student-Grade-Calculator/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── PROJECT_PLAN.md
│
└── assets/
    └── project assets


    How to Run the Application
Option 1 – Run Locally
Download or clone the repository.
Open the project folder.
Open index.html in a web browser.
Enter a student's name and assessment scores.
Click Calculate & Add Student.
The student's calculated result will appear in the student records table.

No additional software installation or database setup is required.

How Local Storage Works

Student records are stored in the browser's Local Storage.

This means that after adding students, the records remain available when
the page is refreshed on the same device and browser.

Validation

The application validates student information before adding a record.

It checks that:

Student name is provided.
CA score is provided.
Assignment score is provided.
Exam score is provided.
Scores are valid numbers.
Scores are between 0 and 100.

Invalid input produces an error message and prevents the record from being
added.


Application Sections
Dashboard

The Dashboard displays:

Total Students
Total Score
Average Score
Passed Students
Failed Students
All Students

The All Students section displays all student records in a table and
allows users to search and delete records.

About

The About section explains how grades are calculated and how student
records are stored.

Authors
Group Members
Njoku Chinaza Hannah
Wilson Precious
ICHELA EDNA HACHIKARU
IFEANACHO SHUNAMITE OLUCHUWU
IFEGWU CHUKWUEMEKA UCHE
NKWUENU IFECHUKWU DIVINEGIFT

Project Development Phases
Phase 1 – Project Planning

Defined the project requirements, inputs, outputs, classes and functions.

Phase 2 – Version Control

Created the GitHub repository and established version control.

Phase 3 – HTML Structure

Created the application interface, navigation and student input form.

Phase 4 – CSS Styling

Designed the interface, cards, navigation bar, forms, table and responsive
layout.

Phase 5 – JavaScript Functionality

Implemented calculations, validation, Object-Oriented Programming,
Local Storage, search, deletion and navigation.

Phase 6 – Testing

Tested normal inputs, invalid inputs and edge cases.

Phase 7 – Presentation

Prepared the project presentation and demonstration.