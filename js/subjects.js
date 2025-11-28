document.addEventListener("DOMContentLoaded", function () {
  // Sample subject data
  let subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      grade: "10",
      teacher: "Mr. David Wilson",
      students: 35,
      status: "active",
      description: "Algebra, Geometry, and Calculus fundamentals",
    },
    {
      id: 2,
      name: "Science",
      code: "SCI201",
      grade: "10",
      teacher: "Dr. Sarah Johnson",
      students: 32,
      status: "active",
      description: "Physics, Chemistry, and Biology basics",
    },
    {
      id: 3,
      name: "English",
      code: "ENG101",
      grade: "10",
      teacher: "Ms. Emily Brown",
      students: 30,
      status: "active",
      description: "Literature, Grammar, and Composition",
    },
    {
      id: 4,
      name: "Computer Science",
      code: "CS301",
      grade: "11",
      teacher: "Ms. Ellin Brown",
      students: 28,
      status: "active",
      description: "Programming fundamentals and algorithms",
    },
    {
      id: 5,
      name: "History",
      code: "HIS201",
      grade: "11",
      teacher: "Mr. Robert Smith",
      students: 25,
      status: "active",
      description: "World history and civilizations",
    },
    {
      id: 6,
      name: "Geography",
      code: "GEO101",
      grade: "9",
      teacher: "Ms. Lisa Anderson",
      students: 29,
      status: "active",
      description: "Physical and human geography",
    },
    {
      id: 7,
      name: "Art",
      code: "ART101",
      grade: "9",
      teacher: "Mr. James Wilson",
      students: 20,
      status: "active",
      description: "Drawing, painting, and art history",
    },
    {
      id: 8,
      name: "Music",
      code: "MUS101",
      grade: "9",
      teacher: "Ms. Sophia Garcia",
      students: 18,
      status: "inactive",
      description: "Music theory and performance",
    },
  ];

  const container = document.getElementById("subject-container");
  const modal = document.getElementById("subject-modal");
  const addSubjectBtn = document.getElementById("add-subject-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const cancelBtn = document.getElementById("cancel-btn");
  const subjectForm = document.getElementById("subject-form");
  const searchInput = document.getElementById("search-subjects");
  const gradeFilter = document.getElementById("grade-filter");
  const statusFilter = document.getElementById("status-filter");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");

  let editingSubjectId = null;

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");
  });

  // Get subject icon
  function getSubjectIcon(subjectName) {
    const icons = {
      Mathematics: "fa-calculator",
      Science: "fa-flask",
      English: "fa-book",
      "Computer Science": "fa-laptop-code",
      History: "fa-monument",
      Geography: "fa-globe-americas",
      Art: "fa-palette",
      Music: "fa-music",
    };
    return icons[subjectName] || "fa-book";
  }

  // Get subject class
  function getSubjectClass(subjectName) {
    const classes = {
      Mathematics: "subject-math",
      Science: "subject-science",
      English: "subject-english",
      "Computer Science": "subject-computer",
      History: "subject-history",
      Geography: "subject-geography",
      Art: "subject-art",
      Music: "subject-music",
    };
    return classes[subjectName] || "subject-math";
  }

  // Render subject cards
  function renderSubjectCards(subjectList = subjects) {
    if (subjectList.length === 0) {
      container.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">
                <i class="fas fa-book-open"></i>
              </div>
              <h3 class="empty-state-title">No Subjects Found</h3>
              <p class="empty-state-text">
                No subject records match your search criteria. Try adjusting your filters or add a new subject.
              </p>
            </div>
          `;
      return;
    }

    // Update stats
    updateStats(subjectList);

    container.innerHTML = subjectList
      .map(
        (subject) => `
            <div class="subject-card ${getSubjectClass(subject.name)}">
              <i class="fas ${getSubjectIcon(subject.name)} subject-icon"></i>
              <div class="subject-name">${subject.name}</div>
              <div class="subject-details">Code: ${subject.code} | Grade: ${
          subject.grade
        }</div>
              <div class="subject-teacher">Teacher: ${subject.teacher}</div>
              <div class="subject-details">Students: ${subject.students}</div>
              <div class="subject-actions">
                <button class="subject-btn edit-btn" data-id="${subject.id}">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="subject-btn delete-btn" data-id="${subject.id}">
                  <i class="fas fa-trash"></i> Delete
                </button>
                <button class="subject-btn view-btn" data-id="${subject.id}">
                  <i class="fas fa-eye"></i> View
                </button>
              </div>
            </div>
          `
      )
      .join("");

    // Add event listeners to buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        editSubject(e.target.closest("button").dataset.id)
      );
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        deleteSubject(e.target.closest("button").dataset.id)
      );
    });

    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        viewSubject(e.target.closest("button").dataset.id)
      );
    });
  }

  function updateStats(subjectList) {
    const total = subjectList.length;
    const active = subjectList.filter((s) => s.status === "active").length;
    const avgStudents =
      subjectList.length > 0
        ? Math.round(
            subjectList.reduce((sum, s) => sum + s.students, 0) /
              subjectList.length
          )
        : 0;
    const teachers = [...new Set(subjectList.map((s) => s.teacher))].length;

    document.getElementById("total-subjects").textContent = total;
    document.getElementById("active-subjects").textContent = active;
    document.getElementById("avg-students").textContent = avgStudents;
    document.getElementById("total-teachers").textContent = teachers;
  }

  // Add new subject
  addSubjectBtn.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Add Subject";
    subjectForm.reset();
    editingSubjectId = null;
    modal.classList.remove("hidden");
  });

  // Close modal
  function closeModal() {
    modal.classList.add("hidden");
    editingSubjectId = null;
  }

  closeModalBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Handle form submission
  subjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(subjectForm);

    if (editingSubjectId) {
      // Update existing subject
      const subjectIndex = subjects.findIndex((s) => s.id == editingSubjectId);
      if (subjectIndex !== -1) {
        subjects[subjectIndex] = {
          ...subjects[subjectIndex],
          name: formData.get("name"),
          code: formData.get("code"),
          grade: formData.get("grade"),
          teacher: formData.get("teacher"),
          description: formData.get("description"),
        };
      }
    } else {
      // Add new subject
      const newSubject = {
        id:
          subjects.length > 0 ? Math.max(...subjects.map((s) => s.id)) + 1 : 1,
        name: formData.get("name"),
        code: formData.get("code"),
        grade: formData.get("grade"),
        teacher: formData.get("teacher"),
        students: Math.floor(Math.random() * 20) + 20,
        status: "active",
        description: formData.get("description"),
      };
      subjects.push(newSubject);
    }

    renderSubjectCards();
    closeModal();

    // Show success message
    alert(`Subject ${editingSubjectId ? "updated" : "added"} successfully!`);
  });

  // Edit subject
  function editSubject(id) {
    const subject = subjects.find((s) => s.id == id);
    if (subject) {
      document.getElementById("modal-title").textContent = "Edit Subject";
      subjectForm.querySelector('input[name="name"]').value = subject.name;
      subjectForm.querySelector('input[name="code"]').value = subject.code;
      subjectForm.querySelector('select[name="grade"]').value = subject.grade;
      subjectForm.querySelector('select[name="teacher"]').value =
        subject.teacher;
      subjectForm.querySelector('textarea[name="description"]').value =
        subject.description;
      editingSubjectId = id;
      modal.classList.remove("hidden");
    }
  }

  // View subject
  function viewSubject(id) {
    const subject = subjects.find((s) => s.id == id);
    if (subject) {
      alert(
        `Subject Details:\n\nName: ${subject.name}\nCode: ${subject.code}\nGrade: ${subject.grade}\nTeacher: ${subject.teacher}\nStudents: ${subject.students}\nDescription: ${subject.description}`
      );
    }
  }

  // Delete subject
  function deleteSubject(id) {
    if (
      confirm(
        "Are you sure you want to delete this subject? This action cannot be undone."
      )
    ) {
      subjects = subjects.filter((subject) => subject.id != id);
      renderSubjectCards();
      alert("Subject deleted successfully!");
    }
  }

  // Search functionality
  function filterSubjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const gradeValue = gradeFilter.value;
    const statusValue = statusFilter.value;

    const filteredSubjects = subjects.filter((subject) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(searchTerm) ||
        subject.code.toLowerCase().includes(searchTerm) ||
        subject.teacher.toLowerCase().includes(searchTerm);

      const matchesGrade = !gradeValue || subject.grade === gradeValue;
      const matchesStatus = !statusValue || subject.status === statusValue;

      return matchesSearch && matchesGrade && matchesStatus;
    });

    renderSubjectCards(filteredSubjects);
  }

  searchInput.addEventListener("input", filterSubjects);
  gradeFilter.addEventListener("change", filterSubjects);
  statusFilter.addEventListener("change", filterSubjects);

  // Handle window resize for responsive layout
  window.addEventListener("resize", () => {
    renderSubjectCards();
  });

  // Initial render
  renderSubjectCards();
});
