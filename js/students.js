document.addEventListener("DOMContentLoaded", function () {
  // Sample student data
  let students = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      grade: "10",
      section: "A",
      parent: "Mr. Doe",
      joinDate: "2022-08-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      grade: "11",
      section: "B",
      parent: "Mrs. Smith",
      joinDate: "2021-09-10",
    },
    {
      id: 3,
      name: "Steve Smith",
      email: "steve@example.com",
      phone: "+1 (555) 345-6789",
      grade: "11",
      section: "B",
      parent: "Mr. Smith",
      joinDate: "2021-09-10",
    },
    {
      id: 4,
      name: "Derren Smith",
      email: "derren@example.com",
      phone: "+1 (555) 456-7890",
      grade: "11",
      section: "B",
      parent: "Mrs. Smith",
      joinDate: "2021-09-10",
    },
  ];

  const container = document.getElementById("student-table-container");
  const modal = document.getElementById("student-modal");
  const addStudentBtn = document.getElementById("add-student-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const cancelBtn = document.getElementById("cancel-btn");
  const studentForm = document.getElementById("student-form");
  const searchInput = document.getElementById("search-students");
  const gradeFilter = document.getElementById("grade-filter");
  const sectionFilter = document.getElementById("section-filter");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebarCloseBtn = document.querySelector(".sidebar-close-btn");
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  let editingStudentId = null;

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when sidebar is open
  });

  // Mobile sidebar close button
  sidebarCloseBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Close sidebar when clicking on overlay
  sidebarOverlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Get student avatar initials
  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  // Render student table
  function renderStudentTable(studentList = students) {
    if (studentList.length === 0) {
      container.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">
                <i class="fas fa-user-graduate"></i>
              </div>
              <h3 class="empty-state-title">No Students Found</h3>
              <p class="empty-state-text">
                No student records match your search criteria. Try adjusting your filters or add a new student.
              </p>
            </div>
          `;
      return;
    }

    // Update stats
    updateStats(studentList);

    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      renderStudentCards(studentList);
    } else {
      renderStudentTableDesktop(studentList);
    }
  }

  function renderStudentTableDesktop(studentList) {
    container.innerHTML = `
          <div class="overflow-x-auto">
            <table class="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Grade</th>
                  <th>Section</th>
                  <th>Parent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${studentList
                  .map(
                    (student) => `
                  <tr>
                    <td>${student.id}</td>
                    <td>
                      <div class="flex items-center">
                        <div class="student-avatar">
                          ${getInitials(student.name)}
                        </div>
                        ${student.name}
                      </div>
                    </td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>
                      <span class="grade-badge badge-${student.grade}">
                        Grade ${student.grade}
                      </span>
                    </td>
                    <td>Section ${student.section}</td>
                    <td>${student.parent}</td>
                    <td>
                      <div class="flex space-x-2">
                        <button class="btn btn-secondary edit-btn" data-id="${
                          student.id
                        }">
                          <i class="fas fa-edit mr-1"></i> Edit
                        </button>
                        <button class="btn btn-danger delete-btn" data-id="${
                          student.id
                        }">
                          <i class="fas fa-trash mr-1"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;

    // Add event listeners to buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        editStudent(e.target.closest("button").dataset.id)
      );
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        deleteStudent(e.target.closest("button").dataset.id)
      );
    });
  }

  function renderStudentCards(studentList) {
    container.innerHTML = `
          <div class="space-y-4">
            ${studentList
              .map(
                (student) => `
              <div class="student-card">
                <div class="student-avatar">
                  ${getInitials(student.name)}
                </div>
                <div class="student-info">
                  <div class="student-name">${student.name}</div>
                  <div class="student-details">
                    <span><i class="fas fa-envelope mr-1"></i>${
                      student.email
                    }</span>
                    <span><i class="fas fa-phone mr-1"></i>${
                      student.phone
                    }</span>
                    <span class="grade-badge badge-${student.grade}">
                      Grade ${student.grade}, Section ${student.section}
                    </span>
                  </div>
                </div>
                <div class="student-actions">
                  <button class="btn btn-secondary edit-btn" data-id="${
                    student.id
                  }">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger delete-btn" data-id="${
                    student.id
                  }">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        `;

    // Add event listeners to buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        editStudent(e.target.closest("button").dataset.id)
      );
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        deleteStudent(e.target.closest("button").dataset.id)
      );
    });
  }

  function updateStats(studentList) {
    const total = studentList.length;
    const grade10 = studentList.filter((s) => s.grade === "10").length;
    const grade11 = studentList.filter((s) => s.grade === "11").length;
    const other = total - grade10 - grade11;

    document.getElementById("total-students").textContent = total;
    document.getElementById("grade-10-students").textContent = grade10;
    document.getElementById("grade-11-students").textContent = grade11;
    document.getElementById("other-students").textContent = other;
  }

  // Add new student
  addStudentBtn.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Add Student";
    studentForm.reset();
    editingStudentId = null;
    modal.classList.remove("hidden");
  });

  // Close modal
  function closeModal() {
    modal.classList.add("hidden");
    editingStudentId = null;
  }

  closeModalBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Handle form submission
  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(studentForm);

    if (editingStudentId) {
      // Update existing student
      const studentIndex = students.findIndex((s) => s.id == editingStudentId);
      if (studentIndex !== -1) {
        students[studentIndex] = {
          ...students[studentIndex],
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          grade: formData.get("grade"),
          section: formData.get("section"),
          parent: formData.get("parent"),
        };
      }
    } else {
      // Add new student
      const newStudent = {
        id:
          students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        grade: formData.get("grade"),
        section: formData.get("section"),
        parent: formData.get("parent"),
        joinDate: new Date().toISOString().split("T")[0],
      };
      students.push(newStudent);
    }

    renderStudentTable();
    closeModal();

    // Show success message
    alert(`Student ${editingStudentId ? "updated" : "added"} successfully!`);
  });

  // Edit student
  function editStudent(id) {
    const student = students.find((s) => s.id == id);
    if (student) {
      document.getElementById("modal-title").textContent = "Edit Student";
      studentForm.querySelector('input[name="name"]').value = student.name;
      studentForm.querySelector('input[name="email"]').value = student.email;
      studentForm.querySelector('input[name="phone"]').value = student.phone;
      studentForm.querySelector('select[name="grade"]').value = student.grade;
      studentForm.querySelector('select[name="section"]').value =
        student.section;
      studentForm.querySelector('input[name="parent"]').value = student.parent;
      editingStudentId = id;
      modal.classList.remove("hidden");
    }
  }

  // Delete student
  function deleteStudent(id) {
    if (
      confirm(
        "Are you sure you want to delete this student? This action cannot be undone."
      )
    ) {
      students = students.filter((student) => student.id != id);
      renderStudentTable();
      alert("Student deleted successfully!");
    }
  }

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const gradeValue = gradeFilter.value;
    const sectionValue = sectionFilter.value;

    const filteredStudents = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.parent.toLowerCase().includes(searchTerm);

      const matchesGrade = !gradeValue || student.grade === gradeValue;
      const matchesSection = !sectionValue || student.section === sectionValue;

      return matchesSearch && matchesGrade && matchesSection;
    });

    renderStudentTable(filteredStudents);
  });

  gradeFilter.addEventListener("change", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const gradeValue = gradeFilter.value;
    const sectionValue = sectionFilter.value;

    const filteredStudents = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.parent.toLowerCase().includes(searchTerm);

      const matchesGrade = !gradeValue || student.grade === gradeValue;
      const matchesSection = !sectionValue || student.section === sectionValue;

      return matchesSearch && matchesGrade && matchesSection;
    });

    renderStudentTable(filteredStudents);
  });

  sectionFilter.addEventListener("change", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const gradeValue = gradeFilter.value;
    const sectionValue = sectionFilter.value;

    const filteredStudents = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.parent.toLowerCase().includes(searchTerm);

      const matchesGrade = !gradeValue || student.grade === gradeValue;
      const matchesSection = !sectionValue || student.section === sectionValue;

      return matchesSearch && matchesGrade && matchesSection;
    });

    renderStudentTable(filteredStudents);
  });

  // Handle window resize for responsive layout
  window.addEventListener("resize", () => {
    renderStudentTable();
  });

  // Initial render
  renderStudentTable();
});
