
    document.addEventListener("DOMContentLoaded", function () {
      // Sample teacher data
      let teachers = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          email: "sarah@school.edu",
          phone: "+1 (555) 123-4567",
          subject: "Science",
          joinDate: "2021-03-15",
        },
        {
          id: 2,
          name: "Mr. David Wilson",
          email: "david@school.edu",
          phone: "+1 (555) 234-5678",
          subject: "Mathematics",
          joinDate: "2020-08-22",
        },
        {
          id: 3,
          name: "Ms. Emily Brown",
          email: "emily@school.edu",
          phone: "+1 (555) 345-6789",
          subject: "English",
          joinDate: "2022-01-10",
        },
        {
          id: 4,
          name: "Ms. Ellin Brown",
          email: "ellin@school.edu",
          phone: "+1 (555) 456-7890",
          subject: "Computer",
          joinDate: "2021-10-10",
        },
      ];

      const container = document.getElementById("teacher-table-container");
      const modal = document.getElementById("teacher-modal");
      const addTeacherBtn = document.getElementById("add-teacher-btn");
      const closeModalBtn = document.getElementById("close-modal");
      const cancelBtn = document.getElementById("cancel-btn");
      const teacherForm = document.getElementById("teacher-form");
      const searchInput = document.getElementById("search-teachers");
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      const sidebarCloseBtn = document.querySelector(".sidebar-close-btn");
      const sidebar = document.querySelector(".sidebar");
      const sidebarOverlay = document.querySelector(".sidebar-overlay");

      let editingTeacherId = null;

      // Mobile menu toggle
      mobileMenuBtn.addEventListener("click", function () {
        sidebar.classList.add("active");
        sidebarOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });

      // Mobile sidebar close button
      sidebarCloseBtn.addEventListener("click", function () {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
        document.body.style.overflow = "";
      });

      // Close sidebar when clicking on overlay
      sidebarOverlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
        document.body.style.overflow = "";
      });

      // Render teacher table
      function renderTeacherTable(teacherList = teachers) {
        if (teacherList.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">
                <i class="fas fa-user-graduate"></i>
              </div>
              <h3 class="empty-state-title">No Teachers Found</h3>
              <p class="empty-state-text">
                No teacher records match your search criteria. Try adjusting your search or add a new teacher.
              </p>
            </div>
          `;
          return;
        }

        // Update stats
        updateStats(teacherList);

        // Check if we're on mobile
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          renderTeacherCards(teacherList);
        } else {
          renderTeacherTableDesktop(teacherList);
        }
      }

      function renderTeacherTableDesktop(teacherList) {
        container.innerHTML = `
          <div class="overflow-x-auto">
            <table class="teacher-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${teacherList
            .map(
              (teacher) => `
                  <tr>
                    <td>${teacher.id}</td>
                    <td>
                      <div class="flex items-center">
                        <div class="teacher-avatar mr-3">
                          ${teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                        </div>
                        ${teacher.name}
                      </div>
                    </td>
                    <td>${teacher.email}</td>
                    <td>${teacher.phone}</td>
                    <td>
                      <span class="subject-badge badge-${teacher.subject.toLowerCase()}">
                        ${teacher.subject}
                      </span>
                    </td>
                    <td>${teacher.joinDate}</td>
                    <td>
                      <div class="flex space-x-2">
                        <button class="btn btn-secondary edit-btn" data-id="${teacher.id
                }">
                          <i class="fas fa-edit mr-1"></i> Edit
                        </button>
                        <button class="btn btn-danger delete-btn" data-id="${teacher.id
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
            editTeacher(e.target.closest("button").dataset.id)
          );
        });

        document.querySelectorAll(".delete-btn").forEach((btn) => {
          btn.addEventListener("click", (e) =>
            deleteTeacher(e.target.closest("button").dataset.id)
          );
        });
      }

      function renderTeacherCards(teacherList) {
        container.innerHTML = `
          <div class="space-y-4">
            ${teacherList
            .map(
              (teacher) => `
              <div class="teacher-card">
                <div class="teacher-avatar">
                  ${teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                </div>
                <div class="teacher-info">
                  <div class="teacher-name">${teacher.name}</div>
                  <div class="teacher-details">
                    <span><i class="fas fa-envelope mr-1"></i>${teacher.email
                }</span>
                    <span><i class="fas fa-phone mr-1"></i>${teacher.phone
                }</span>
                    <span class="subject-badge badge-${teacher.subject.toLowerCase()}">
                      ${teacher.subject}
                    </span>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button class="btn btn-secondary edit-btn" data-id="${teacher.id
                }">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger delete-btn" data-id="${teacher.id
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
            editTeacher(e.target.closest("button").dataset.id)
          );
        });

        document.querySelectorAll(".delete-btn").forEach((btn) => {
          btn.addEventListener("click", (e) =>
            deleteTeacher(e.target.closest("button").dataset.id)
          );
        });
      }

      function updateStats(teacherList) {
        const total = teacherList.length;
        const science = teacherList.filter((t) => t.subject === "Science").length;
        const math = teacherList.filter((t) => t.subject === "Mathematics").length;
        const other = total - science - math;

        document.getElementById("total-teachers").textContent = total;
        document.getElementById("science-teachers").textContent = science;
        document.getElementById("math-teachers").textContent = math;
        document.getElementById("other-teachers").textContent = other;
      }

      // Add new teacher
      addTeacherBtn.addEventListener("click", () => {
        document.getElementById("modal-title").textContent = "Add Teacher";
        teacherForm.reset();
        editingTeacherId = null;
        modal.classList.remove("hidden");
      });

      // Close modal
      function closeModal() {
        modal.classList.add("hidden");
        editingTeacherId = null;
      }

      closeModalBtn.addEventListener("click", closeModal);
      cancelBtn.addEventListener("click", closeModal);

      // Handle form submission
      teacherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(teacherForm);

        if (editingTeacherId) {
          // Update existing teacher
          const teacherIndex = teachers.findIndex((t) => t.id == editingTeacherId);
          if (teacherIndex !== -1) {
            teachers[teacherIndex] = {
              ...teachers[teacherIndex],
              name: formData.get("name"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              subject: formData.get("subject"),
            };
          }
        } else {
          // Add new teacher
          const newTeacher = {
            id:
              teachers.length > 0 ? Math.max(...teachers.map((t) => t.id)) + 1 : 1,
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            subject: formData.get("subject"),
            joinDate: new Date().toISOString().split("T")[0],
          };
          teachers.push(newTeacher);
        }

        renderTeacherTable();
        closeModal();

        // Show success message
        alert(`Teacher ${editingTeacherId ? "updated" : "added"} successfully!`);
      });

      // Edit teacher
      function editTeacher(id) {
        const teacher = teachers.find((t) => t.id == id);
        if (teacher) {
          document.getElementById("modal-title").textContent = "Edit Teacher";
          teacherForm.querySelector('input[name="name"]').value = teacher.name;
          teacherForm.querySelector('input[name="email"]').value = teacher.email;
          teacherForm.querySelector('input[name="phone"]').value = teacher.phone;
          teacherForm.querySelector('select[name="subject"]').value =
            teacher.subject;
          editingTeacherId = id;
          modal.classList.remove("hidden");
        }
      }

      // Delete teacher
      function deleteTeacher(id) {
        if (
          confirm(
            "Are you sure you want to delete this teacher? This action cannot be undone."
          )
        ) {
          teachers = teachers.filter((teacher) => teacher.id != id);
          renderTeacherTable();
          alert("Teacher deleted successfully!");
        }
      }

      // Search functionality
      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTeachers = teachers.filter(
          (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm) ||
            teacher.email.toLowerCase().includes(searchTerm) ||
            teacher.subject.toLowerCase().includes(searchTerm)
        );
        renderTeacherTable(filteredTeachers);
      });

      // Handle window resize for responsive layout
      window.addEventListener("resize", () => {
        renderTeacherTable();
      });

      // Initial render
      renderTeacherTable();
    });
  