document.addEventListener("DOMContentLoaded", function () {
  // Sample class data
  const classes = [
    {
      id: 1,
      name: "Grade 10 - A",
      teacher: "Dr. Sarah Johnson",
      students: 32,
      subject: "Science",
    },
    {
      id: 2,
      name: "Grade 11 - B",
      teacher: "Mr. David Wilson",
      students: 28,
      subject: "Mathematics",
    },
    {
      id: 3,
      name: "Grade 9 - C",
      teacher: "Ms. Emily Brown",
      students: 30,
      subject: "English",
    },
  ];

  const container = document.getElementById("class-container");
  const addClassBtn = document.getElementById("add-class-btn");

  // Render class cards
  function renderClasses() {
    container.innerHTML = classes
      .map(
        (cls) => `
            <div class="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow card-hover">
                <div class="bg-blue-600 text-white p-4">
                    <h4 class="text-xl font-semibold">${cls.name}</h4>
                    <p class="text-blue-100">${cls.subject}</p>
                </div>
                <div class="p-4">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-chalkboard-teacher text-gray-500 mr-2"></i>
                        <span>${cls.teacher}</span>
                    </div>
                    <div class="flex items-center mb-3">
                        <i class="fas fa-users text-gray-500 mr-2"></i>
                        <span>${cls.students} Students</span>
                    </div>
                    <div class="flex justify-between mt-4">
                        <button class="text-blue-600 hover:text-blue-800 edit-class" data-id="${cls.id}">
                            <i class="fas fa-edit mr-1"></i> Edit
                        </button>
                        <button class="text-red-600 hover:text-red-800 delete-class" data-id="${cls.id}">
                            <i class="fas fa-trash mr-1"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    // Add event listeners
    document.querySelectorAll(".edit-class").forEach((btn) => {
      btn.addEventListener("click", () => editClass(btn.dataset.id));
    });

    document.querySelectorAll(".delete-class").forEach((btn) => {
      btn.addEventListener("click", () => deleteClass(btn.dataset.id));
    });
  }

  // Add new class
  addClassBtn.addEventListener("click", () => {
    // In a real app, this would open a modal/form
    alert("Add new class functionality would go here");
  });

  // Edit class
  function editClass(id) {
    const selectedClass = classes.find((c) => c.id == id);
    if (selectedClass) {
      alert(`Editing class: ${selectedClass.name}`);
    }
  }

  // Delete class
  function deleteClass(id) {
    if (confirm("Are you sure you want to delete this class?")) {
      alert(`Class with ID ${id} would be deleted`);
      // In a real app: classes = classes.filter(c => c.id != id);
      // renderClasses();
    }
  }

  // Initial render
  renderClasses();
});
