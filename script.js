// ---------- OOP: Student class ----------
  class Student {
    constructor(id, name, ca, assignment, exam) {
      this.id = id;
      this.name = name;
      this.ca = ca;
      this.assignment = assignment;
      this.exam = exam;
    }
    getTotal() { return this.ca + this.assignment + this.exam; }
    getAverage() { return this.getTotal() / 3; }
    getGrade() {
      const avg = this.getAverage();
      if (avg >= 80) return "A";
      if (avg >= 70) return "B";
      if (avg >= 60) return "C";
      if (avg >= 50) return "D";
      if (avg >= 40) return "E";
      return "F";
    }
    getStatus() { return this.getAverage() >= 50 ? "PASS" : "FAIL"; }
  }

  // ---------- App state ----------
  class GradeBook {
    constructor() {
      this.students = this.load();
    }
    load() {
      const raw = localStorage.getItem("gradebook_students");
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return parsed.map(s => new Student(s.id, s.name, s.ca, s.assignment, s.exam));
      } catch (e) { return []; }
    }
    save() {
      localStorage.setItem("gradebook_students", JSON.stringify(this.students));
    }
    add(name, ca, assignment, exam) {
      const id = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
      const student = new Student(id, name, ca, assignment, exam);
      this.students.push(student);
      this.save();
      return student;
    }
    remove(id) {
      this.students = this.students.filter(s => s.id !== id);
      this.save();
    }
    stats() {
      const total = this.students.length;
      const totalScore = this.students.reduce((sum, s) => sum + s.getTotal(), 0);
      const avgScore = total ? (this.students.reduce((sum, s) => sum + s.getAverage(), 0) / total) : 0;
      const passed = this.students.filter(s => s.getStatus() === "PASS").length;
      const failed = total - passed;
      return { total, totalScore, avgScore, passed, failed };
    }
  }

  const gradebook = new GradeBook();

  // ---------- DOM refs ----------
  const nameInput = document.getElementById("studentName");
  const caInput = document.getElementById("caScore");
  const assignInput = document.getElementById("assignScore");
  const examInput = document.getElementById("examScore");
  const addBtn = document.getElementById("addBtn");
  const clearBtn = document.getElementById("clearBtn");
  const statsRow = document.getElementById("statsRow");
  const toast = document.getElementById("toast");
  const themeToggle = document.getElementById("themeToggle");

  // Two table instances: one on the Dashboard view, one on the All Students view
  const tables = [
    {
      body: document.getElementById("tableBody"),
      footer: document.getElementById("footerCount"),
      search: document.getElementById("searchInput"),
      term: ""
    },
    {
      body: document.getElementById("tableBodyStudents"),
      footer: document.getElementById("footerCountStudents"),
      search: document.getElementById("searchInputStudents"),
      term: ""
    }
  ];

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function gradeClass(g) { return "grade-" + g; }

  function renderStats() {
    const s = gradebook.stats();
    statsRow.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon icon-blue">👥</div>
        <div class="stat-num">${s.total}</div>
        <div class="stat-label">Total Students</div>
        <div class="stat-bar bar-blue"></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-green">📊</div>
        <div class="stat-num">${s.totalScore}</div>
        <div class="stat-label">Total Score</div>
        <div class="stat-bar bar-green"></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-amber">📈</div>
        <div class="stat-num">${s.avgScore.toFixed(2)}</div>
        <div class="stat-label">Average Score</div>
        <div class="stat-bar bar-amber"></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-violet">🏆</div>
        <div class="stat-num">${s.passed}</div>
        <div class="stat-label">Passed</div>
        <div class="stat-bar bar-violet"></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-red">☹️</div>
        <div class="stat-num">${s.failed}</div>
        <div class="stat-label">Failed</div>
        <div class="stat-bar bar-red"></div>
      </div>
    `;
  }

  function renderTableInto(table) {
    if (!table.body) return;
    const filtered = gradebook.students.filter(s =>
      s.name.toLowerCase().includes(table.term.toLowerCase())
    );

    if (filtered.length === 0) {
      table.body.innerHTML = `<tr class="empty-row"><td colspan="10">No students found. Add your first student to get started.</td></tr>`;
    } else {
      table.body.innerHTML = filtered.map((s, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${s.name}</td>
          <td>${s.ca}</td>
          <td>${s.assignment}</td>
          <td>${s.exam}</td>
          <td>${s.getTotal()}</td>
          <td>${s.getAverage().toFixed(2)}</td>
          <td><span class="badge ${gradeClass(s.getGrade())}">${s.getGrade()}</span></td>
          <td><span class="status-${s.getStatus().toLowerCase()}">${s.getStatus()}</span></td>
          <td><button class="del-btn" data-id="${s.id}">🗑️</button></td>
        </tr>
      `).join("");
    }
    table.footer.textContent = `Showing ${filtered.length} of ${gradebook.students.length} students`;
  }

  function renderTables() {
    tables.forEach(renderTableInto);
  }

  function renderAll() {
    renderStats();
    renderTables();
  }

  function validate(name, ca, assignment, exam) {
    if (!name.trim()) return "Please enter a student name.";
    for (const [label, val] of [["CA", ca], ["Assignment", assignment], ["Exam", exam]]) {
      if (val === "" || isNaN(val)) return `Please enter a valid ${label} score.`;
      if (val < 0 || val > 100) return `${label} score must be between 0 and 100.`;
    }
    return null;
  }

  addBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const ca = parseFloat(caInput.value);
    const assignment = parseFloat(assignInput.value);
    const exam = parseFloat(examInput.value);

    const error = validate(name, caInput.value === "" ? "" : ca, assignInput.value === "" ? "" : assignment, examInput.value === "" ? "" : exam);
    if (error) { showToast(error); return; }

    gradebook.add(name.trim(), ca, assignment, exam);
    renderAll();
    clearForm();
    showToast(`${name.trim()} added successfully!`);
  });

  function clearForm() {
    nameInput.value = "";
    caInput.value = "";
    assignInput.value = "";
    examInput.value = "";
  }
  clearBtn.addEventListener("click", clearForm);

  tables.forEach(table => {
    table.body.addEventListener("click", (e) => {
      const btn = e.target.closest(".del-btn");
      if (!btn) return;
      const id = parseInt(btn.dataset.id, 10);
      gradebook.remove(id);
      renderAll();
      showToast("Student removed.");
    });

    table.search.addEventListener("input", (e) => {
      table.term = e.target.value;
      renderTableInto(table);
    });
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
  });

  // Nav links — switch between Dashboard / All Students / About views
  const views = {
    dashboard: document.getElementById("view-dashboard"),
    students: document.getElementById("view-students"),
    about: document.getElementById("view-about")
  };

  function showView(name) {
    Object.entries(views).forEach(([key, el]) => {
      if (!el) return;
      el.hidden = key !== name;
    });
    if (name === "students") renderTables();
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      showView(link.dataset.view);
    });
  });

  // Seed with sample data on first load
  if (gradebook.students.length === 0) {
    gradebook.add("John Doe", 85, 78, 90);
    gradebook.add("Mary Smith", 72, 68, 75);
    gradebook.add("David Brown", 45, 50, 55);
    gradebook.add("Sarah Wilson", 38, 42, 45);
    gradebook.add("Mike Johnson", 25, 30, 28);
  }

  renderAll();