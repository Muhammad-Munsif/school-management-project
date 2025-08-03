document.addEventListener("DOMContentLoaded", function () {
  // Sample subject data
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      teacher: "Mr. David Wilson",
      students: 85,
    },
    {
      id: 2,
      name: "Science",
      code: "SCI201",
      teacher: "Dr. Sarah Johnson",
      students: 72,
    },
    {
      id: 3,
      name: "English",
      code: "ENG301",
      teacher: "Ms. Emily Brown",
      students: 68,
    },
    {
      id: 4,
      name: "History",
      code: "HIS401",
      teacher: "Mr. Thomas Lee",
      students: 45,
    },
  ];

  const container = document.getElementById("subject-container");
  const addSubjectBtn = document.getElementById("add-subject-btn");

  // Render subject cards
  function renderSubjects() {
    container.innerHTML = subjects
      .map(
        (subject) => `
            <div class="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow card-hover">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                    <h4 class="text-xl font-semibold">${subject.name}</h4>
                    <p class="text-blue-100">${subject.code}</p>
                </div>
                <div class="p-4">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-chalkboard-teacher text-gray-500 mr-2"></i>
                        <span>${subject.teacher}</span>
                    </div>
                    <div class="flex items-center mb-3">
                        <i class="fas fa-users text-gray-500 mr-2"></i>
                        <span>${subject.students} Students</span>
                    </div>
                    <div class="flex justify-between mt-4">
                        <button class="text-blue-600 hover:text-blue-800 edit-subject" data-id="${subject.id}">
                            <i class="fas fa-edit mr-1"></i> Edit
                        </button>
                        <button class="text-red-600 hover:text-red-800 delete-subject" data-id="${subject.id}">
                            <i class="fas fa-trash mr-1"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    // Add event listeners
    document.querySelectorAll(".edit-subject").forEach((btn) => {
      btn.addEventListener("click", () => editSubject(btn.dataset.id));
    });

    document.querySelectorAll(".delete-subject").forEach((btn) => {
      btn.addEventListener("click", () => deleteSubject(btn.dataset.id));
    });
  }

  // Add new subject
  addSubjectBtn.addEventListener("click", () => {
    // In a real app, this would open a modal/form
    alert("Add new subject functionality would go here");
  });

  // Edit subject
  function editSubject(id) {
    const selectedSubject = subjects.find((s) => s.id == id);
    if (selectedSubject) {
      alert(`Editing subject: ${selectedSubject.name}`);
    }
  }

  // Delete subject
  function deleteSubject(id) {
    if (confirm("Are you sure you want to delete this subject?")) {
      alert(`Subject with ID ${id} would be deleted`);
      // In a real app: subjects = subjects.filter(s => s.id != id);
      // renderSubjects();
    }
  }

  // Initial render
  renderSubjects();
});
