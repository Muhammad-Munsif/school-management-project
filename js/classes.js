document.addEventListener("DOMContentLoaded", function () {
  // Sample class data
  let classes = [
    {
      id: 1,
      name: "Grade 10 - A",
      grade: "10",
      section: "A",
      teacher: "Dr. Sarah Johnson",
      students: 32,
      subject: "Science",
      room: "Room 101",
    },
    {
      id: 2,
      name: "Grade 11 - B",
      grade: "11",
      section: "B",
      teacher: "Mr. David Wilson",
      students: 28,
      subject: "Mathematics",
      room: "Room 205",
    },
    {
      id: 3,
      name: "Grade 9 - C",
      grade: "9",
      section: "C",
      teacher: "Ms. Emily Brown",
      students: 30,
      subject: "English",
      room: "Room 104",
    },
    {
      id: 4,
      name: "Grade 12 - A",
      grade: "12",
      section: "A",
      teacher: "Mr. Robert Smith",
      students: 35,
      subject: "Physics",
      room: "Lab 1",
    },
    {
      id: 5,
      name: "Grade 10 - B",
      grade: "10",
      section: "B",
      teacher: "Ms. Ellin Brown",
      students: 29,
      subject: "Computer Science",
      room: "Computer Lab",
    },
    {
      id: 6,
      name: "Grade 11 - A",
      grade: "11",
      section: "A",
      teacher: "Ms. Lisa Anderson",
      students: 31,
      subject: "Chemistry",
      room: "Lab 2",
    },
  ];

  const container = document.getElementById("class-container");
  const modal = document.getElementById("class-modal");
  const addClassBtn = document.getElementById("add-class-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const cancelBtn = document.getElementById("cancel-btn");
  const classForm = document.getElementById("class-form");
  const searchInput = document.getElementById("search-classes");
  const gradeFilter = document.getElementById("grade-filter");
  const teacherFilter = document.getElementById("teacher-filter");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");

  let editingClassId = null;

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");
  });

  // Get class header color
  function getClassColor(grade) {
    const colors = {
      9: "class-grade-9",
      10: "class-grade-10",
      11: "class-grade-11",
      12: "class-grade-12",
    };
    return colors[grade] || "class-grade-10";
  }

  // Render class cards
  function renderClassCards(classList = classes) {
    if (classList.length === 0) {
      container.innerHTML = `
              <div class="empty-state">
                <div class="empty-state-icon">
                  <i class="fas fa-door-open"></i>
                </div>
                <h3 class="empty-state-title">No Classes Found</h3>
                <p class="empty-state-text">
                  No class records match your search criteria. Try adjusting your filters or add a new class.
                </p>
              </div>
            `;
      return;
    }

    // Update stats
    updateStats(classList);

    container.innerHTML = classList
      .map(
        (cls) => `
              <div class="class-card card">
                <div class="class-header ${getClassColor(cls.grade)}">
                  <div class="class-name">${cls.name}</div>
                  <div class="class-subject">${cls.subject}</div>
                </div>
                <div class="class-body">
                  <div class="class-detail">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <span>${cls.teacher}</span>
                  </div>
                  <div class="class-detail">
                    <i class="fas fa-users"></i>
                    <span>${cls.students} Students</span>
                  </div>
                  <div class="class-detail">
                    <i class="fas fa-door-open"></i>
                    <span>${cls.room}</span>
                  </div>
                  <div class="class-detail">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Grade ${cls.grade}, Section ${cls.section}</span>
                  </div>
                  <div class="class-actions">
                    <button class="class-btn class-btn-view view-class" data-id="${
                      cls.id
                    }">
                      <i class="fas fa-eye"></i> View
                    </button>
                    <button class="class-btn class-btn-edit edit-class" data-id="${
                      cls.id
                    }">
                      <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="class-btn class-btn-delete delete-class" data-id="${
                      cls.id
                    }">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            `
      )
      .join("");

    // Add event listeners to buttons
    document.querySelectorAll(".edit-class").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        editClass(e.target.closest("button").dataset.id)
      );
    });

    document.querySelectorAll(".delete-class").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        deleteClass(e.target.closest("button").dataset.id)
      );
    });

    document.querySelectorAll(".view-class").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        viewClass(e.target.closest("button").dataset.id)
      );
    });
  }

  function updateStats(classList) {
    const total = classList.length;
    const totalStudents = classList.reduce((sum, cls) => sum + cls.students, 0);
    const teachers = [...new Set(classList.map((cls) => cls.teacher))].length;
    const avgClassSize = total > 0 ? Math.round(totalStudents / total) : 0;

    document.getElementById("total-classes").textContent = total;
    document.getElementById("total-students").textContent = totalStudents;
    document.getElementById("total-teachers").textContent = teachers;
    document.getElementById("avg-class-size").textContent = avgClassSize;
  }

  // Add new class
  addClassBtn.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Add Class";
    classForm.reset();
    editingClassId = null;
    modal.classList.remove("hidden");
  });

  // Close modal
  function closeModal() {
    modal.classList.add("hidden");
    editingClassId = null;
  }

  closeModalBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Handle form submission
  classForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(classForm);

    if (editingClassId) {
      // Update existing class
      const classIndex = classes.findIndex((c) => c.id == editingClassId);
      if (classIndex !== -1) {
        classes[classIndex] = {
          ...classes[classIndex],
          name: `Grade ${formData.get("grade")} - ${formData.get("section")}`,
          grade: formData.get("grade"),
          section: formData.get("section"),
          teacher: formData.get("teacher"),
          subject: formData.get("subject"),
        };
      }
    } else {
      // Add new class
      const newClass = {
        id: classes.length > 0 ? Math.max(...classes.map((c) => c.id)) + 1 : 1,
        name: `Grade ${formData.get("grade")} - ${formData.get("section")}`,
        grade: formData.get("grade"),
        section: formData.get("section"),
        teacher: formData.get("teacher"),
        students: Math.floor(Math.random() * 10) + 25,
        subject: formData.get("subject"),
        room: `Room ${Math.floor(Math.random() * 200) + 100}`,
      };
      classes.push(newClass);
    }

    renderClassCards();
    closeModal();

    // Show success message
    alert(`Class ${editingClassId ? "updated" : "added"} successfully!`);
  });

  // Edit class
  function editClass(id) {
    const cls = classes.find((c) => c.id == id);
    if (cls) {
      document.getElementById("modal-title").textContent = "Edit Class";
      classForm.querySelector('input[name="name"]').value = cls.name;
      classForm.querySelector('select[name="grade"]').value = cls.grade;
      classForm.querySelector('select[name="section"]').value = cls.section;
      classForm.querySelector('select[name="teacher"]').value = cls.teacher;
      classForm.querySelector('select[name="subject"]').value = cls.subject;
      editingClassId = id;
      modal.classList.remove("hidden");
    }
  }

  // View class
  function viewClass(id) {
    const cls = classes.find((c) => c.id == id);
    if (cls) {
      alert(
        `Class Details:\n\nName: ${cls.name}\nGrade: ${cls.grade}\nSection: ${cls.section}\nTeacher: ${cls.teacher}\nSubject: ${cls.subject}\nStudents: ${cls.students}\nRoom: ${cls.room}`
      );
    }
  }

  // Delete class
  function deleteClass(id) {
    if (
      confirm(
        "Are you sure you want to delete this class? This action cannot be undone."
      )
    ) {
      classes = classes.filter((cls) => cls.id != id);
      renderClassCards();
      alert("Class deleted successfully!");
    }
  }

  // Search functionality
  function filterClasses() {
    const searchTerm = searchInput.value.toLowerCase();
    const gradeValue = gradeFilter.value;
    const teacherValue = teacherFilter.value;

    const filteredClasses = classes.filter((cls) => {
      const matchesSearch =
        cls.name.toLowerCase().includes(searchTerm) ||
        cls.subject.toLowerCase().includes(searchTerm) ||
        cls.teacher.toLowerCase().includes(searchTerm);

      const matchesGrade = !gradeValue || cls.grade === gradeValue;
      const matchesTeacher = !teacherValue || cls.teacher === teacherValue;

      return matchesSearch && matchesGrade && matchesTeacher;
    });

    renderClassCards(filteredClasses);
  }

  searchInput.addEventListener("input", filterClasses);
  gradeFilter.addEventListener("change", filterClasses);
  teacherFilter.addEventListener("change", filterClasses);

  // Handle window resize for responsive layout
  window.addEventListener("resize", () => {
    renderClassCards();
  });

  // Initial render
  renderClassCards();
});
