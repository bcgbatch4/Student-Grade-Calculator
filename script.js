// ============================================
// STUDENT GRADE CALCULATOR
// ============================================

class StudentGradeCalculator {

    constructor() {

        // Local Storage
        this.students = JSON.parse(localStorage.getItem("students")) || [];

        // Form Elements
        this.form = document.getElementById("studentForm");
        this.studentName = document.getElementById("studentName");
        this.ca = document.getElementById("ca");
        this.assignment = document.getElementById("assignment");
        this.exam = document.getElementById("exam");

        // Search
        this.searchInput = document.getElementById("searchStudent");

        // Table
        this.studentTable = document.getElementById("studentTable");

        // Dashboard Cards
        this.studentCount = document.getElementById("studentCount");
        this.totalScore = document.getElementById("totalScore");
        this.averageScore = document.getElementById("averageScore");
        this.passCount = document.getElementById("passCount");
        this.failCount = document.getElementById("failCount");

        // Initialize App
        this.initialize();

    }

    // ============================================
    // INITIALIZE
    // ============================================

    initialize() {

        this.bindEvents();

        this.renderStudents();

        this.updateDashboard();

    }

    // ============================================
    // EVENTS
    // ============================================

    bindEvents() {

        this.form.addEventListener("submit", (e) => {

            e.preventDefault();

            this.addStudent();

        });

        this.searchInput.addEventListener("input", () => {

            this.searchStudent();

        });

    }
    // ============================================
    // ADD STUDENT
    // ============================================

    addStudent() {

        const name = this.studentName.value.trim();
        const ca = Number(this.ca.value);
        const assignment = Number(this.assignment.value);
        const exam = Number(this.exam.value);

        // Validation

        if (!name) {

            alert("Please enter the student's name.");
            this.studentName.focus();
            return;

        }

        if (
            isNaN(ca) ||
            isNaN(assignment) ||
            isNaN(exam)
        ) {

            alert("Please enter all scores.");
            return;

        }

        if (
            ca < 0 || ca > 30 ||
            assignment < 0 || assignment > 20 ||
            exam < 0 || exam > 50
        ) {

            alert("Invalid score entered.");
            return;

        }

        // Total is out of 100

        const total = ca + assignment + exam;

        const grade = this.calculateGrade(total);

        const status = total >= 40 ? "PASS" : "FAIL";

        const student = {

            id: Date.now(),

            name,

            ca,

            assignment,

            exam,

            total,

            average: total,

            grade,

            status

        };

        this.students.push(student);

        this.saveStudents();

        this.renderStudents();

        this.updateDashboard();

        this.form.reset();

        this.studentName.focus();

    }

    // ============================================
    // CALCULATE GRADE
    // ============================================

    calculateGrade(score) {

        if (score >= 70) return "A";

        if (score >= 60) return "B";

        if (score >= 50) return "C";

        if (score >= 45) return "D";

        if (score >= 40) return "E";

        return "F";

    }

    // ============================================
    // SAVE TO LOCAL STORAGE
    // ============================================

    saveStudents() {

        localStorage.setItem(

            "students",

            JSON.stringify(this.students)

        );

    }

        // ============================================
    // RENDER STUDENTS
    // ============================================

    renderStudents(students = this.students) {

        if (students.length === 0) {

            this.studentTable.innerHTML = `
                <tr>
                    <td colspan="10" class="empty">
                        🎓 No student records yet.
                    </td>
                </tr>
            `;

            return;

        }

        this.studentTable.innerHTML = "";

        students.forEach((student, index) => {

            this.studentTable.innerHTML += `

                <tr>

                    <td>${index + 1}</td>

                    <td>${student.name}</td>

                    <td>${student.ca}</td>

                    <td>${student.assignment}</td>

                    <td>${student.exam}</td>

                    <td>${student.total}</td>

                    <td>${student.average}</td>

                    <td>${student.grade}</td>

                    <td>

                        <span class="${student.status === "PASS" ? "pass" : "fail"}">

                            ${student.status}

                        </span>

                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            data-id="${student.id}">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

        // Attach delete events
        document.querySelectorAll(".delete-btn").forEach(button => {

            button.addEventListener("click", () => {

                this.deleteStudent(Number(button.dataset.id));

            });

        });

    }

    // ============================================
    // UPDATE DASHBOARD
    // ============================================

    updateDashboard() {

        this.studentCount.textContent = this.students.length;

        const totalScore = this.students.reduce(

            (sum, student) => sum + student.total,

            0

        );

        this.totalScore.textContent = totalScore;

        const averageScore =

            this.students.length === 0

            ? 0

            : (totalScore / this.students.length).toFixed(1);

        this.averageScore.textContent = averageScore;

        const passed = this.students.filter(

            student => student.status === "PASS"

        ).length;

        this.passCount.textContent = passed;

        this.failCount.textContent =

            this.students.length - passed;

    }

    // ============================================
    // DELETE STUDENT
    // ============================================

    deleteStudent(id) {

        if (!confirm("Are you sure you want to delete this student?")) {

            return;

        }

        this.students = this.students.filter(

            student => student.id !== id

        );

        this.saveStudents();

        this.renderStudents();

        this.updateDashboard();

    }

    // ============================================
    // SEARCH STUDENT
    // ============================================

    searchStudent() {

        const keyword = this.searchInput.value.toLowerCase().trim();

        const filtered = this.students.filter(student =>

            student.name.toLowerCase().includes(keyword)

        );

        this.renderStudents(filtered);

    }

        // ============================================
    // SHOW MESSAGE
    // ============================================

    showMessage(message) {

        alert(message);

    }

} // END OF CLASS

// ============================================
// START APPLICATION
// ============================================

const app = new StudentGradeCalculator();