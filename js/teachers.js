document.addEventListener("DOMContentLoaded", function () {
  // Sample teacher data
  let teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah@school.edu",
      subject: "Science",
      joinDate: "2021-03-15",
    },
    {
      id: 2,
      name: "Mr. David Wilson",
      email: "david@school.edu",
      subject: "Mathematics",
      joinDate: "2020-08-22",
    },
    {
      id: 3,
      name: "Ms. Emily Brown",
      email: "emily@school.edu",
      subject: "English",
      joinDate: "2022-01-10",
    },
    {
      id: 4,
      name: "Ms. Ellin Brown",
      email: "ellin@school.edu",
      subject: "Computer",
      joinDate: "2021-10-10",
    },
  ];

  const container = document.getElementById("teacher-table-container");
  const modal = document.getElementById("teacher-modal");
  const addTeacherBtn = document.getElementById("add-teacher-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const teacherForm = document.getElementById("teacher-form");

  // Render teacher table
  function renderTeacherTable() {
    container.innerHTML = `
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left py-3 px-4">ID</th>
                            <th class="text-left py-3 px-4">Name</th>
                            <th class="text-left py-3 px-4">Email</th>
                            <th class="text-left py-3 px-4">Subject</th>
                            <th class="text-left py-3 px-4">Join Date</th>
                            <th class="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teachers
                          .map(
                            (teacher) => `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3 px-4">${teacher.id}</td>
                                <td class="py-3 px-4">${teacher.name}</td>
                                <td class="py-3 px-4">${teacher.email}</td>
                                <td class="py-3 px-4">${teacher.subject}</td>
                                <td class="py-3 px-4">${teacher.joinDate}</td>
                                <td class="py-3 px-4">
                                    <button class="text-blue-600 hover:text-blue-800 mr-2 edit-btn" data-id="${teacher.id}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="text-red-600 hover:text-red-800 delete-btn" data-id="${teacher.id}">
                                        <i class="fas fa-trash"></i>
                                    </button>
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

  // Add new teacher
  addTeacherBtn.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Add Teacher";
    teacherForm.reset();
    modal.classList.remove("hidden");
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Handle form submission
  teacherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(teacherForm);
    const newTeacher = {
      id: teachers.length + 1,
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      joinDate: new Date().toISOString().split("T")[0],
    };
    teachers.push(newTeacher);
    renderTeacherTable();
    modal.classList.add("hidden");
  });

  // Edit teacher
  function editTeacher(id) {
    const teacher = teachers.find((t) => t.id == id);
    if (teacher) {
      document.getElementById("modal-title").textContent = "Edit Teacher";
      teacherForm.querySelector('input[name="name"]').value = teacher.name;
      teacherForm.querySelector('input[name="email"]').value = teacher.email;
      teacherForm.querySelector('select[name="subject"]').value =
        teacher.subject;
      modal.classList.remove("hidden");
    }
  }

  // Delete teacher
  function deleteTeacher(id) {
    if (confirm("Are you sure you want to delete this teacher?")) {
      teachers = teachers.filter((teacher) => teacher.id != id);
      renderTeacherTable();
    }
  }

  // Initial render
  renderTeacherTable();
});
