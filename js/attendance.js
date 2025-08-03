document.addEventListener("DOMContentLoaded", function () {
  const classSelect = document.getElementById("class-select");
  const dateInput = document.getElementById("attendance-date");
  const container = document.getElementById("attendance-container");

  // Sample attendance data
  const attendanceData = {
    "10A": [
      { id: 1, name: "John Doe", status: "present" },
      { id: 2, name: "Jane Smith", status: "absent" },
      { id: 3, name: "Michael Johnson", status: "late" },
    ],
    "11B": [
      { id: 4, name: "Emily Davis", status: "present" },
      { id: 5, name: "Robert Wilson", status: "present" },
    ],
  };

  // Set default date to today
  dateInput.valueAsDate = new Date();

  // Event listeners
  classSelect.addEventListener("change", updateAttendance);
  dateInput.addEventListener("change", updateAttendance);

  function updateAttendance() {
    const selectedClass = classSelect.value;
    const selectedDate = dateInput.value;

    if (!selectedClass || !selectedDate) {
      container.innerHTML =
        '<p class="text-gray-500 text-center py-8">Select a class and date to view attendance</p>';
      return;
    }

    const students = attendanceData[selectedClass] || [];

    if (students.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 text-center py-8">No attendance records found</p>';
      return;
    }

    container.innerHTML = `
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left py-3 px-4">Student ID</th>
                            <th class="text-left py-3 px-4">Name</th>
                            <th class="text-left py-3 px-4">Status</th>
                            <th class="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students
                          .map(
                            (student) => `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3 px-4">${student.id}</td>
                                <td class="py-3 px-4">${student.name}</td>
                                <td class="py-3 px-4">
                                    <span class="attendance-status status-${
                                      student.status
                                    }"></span>
                                    ${
                                      student.status.charAt(0).toUpperCase() +
                                      student.status.slice(1)
                                    }
                                </td>
                                <td class="py-3 px-4">
                                    <select class="form-input py-1 px-2 status-select" data-id="${
                                      student.id
                                    }">
                                        <option value="present" ${
                                          student.status === "present"
                                            ? "selected"
                                            : ""
                                        }>Present</option>
                                        <option value="absent" ${
                                          student.status === "absent"
                                            ? "selected"
                                            : ""
                                        }>Absent</option>
                                        <option value="late" ${
                                          student.status === "late"
                                            ? "selected"
                                            : ""
                                        }>Late</option>
                                    </select>
                                </td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
                <div class="mt-4 flex justify-end">
                    <button id="save-attendance" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Save Attendance
                    </button>
                </div>
            </div>
        `;

    // Add event listener to save button
    document.getElementById("save-attendance").addEventListener("click", () => {
      alert("Attendance data would be saved to the database");
    });
  }
});
