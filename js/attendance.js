 
    document.addEventListener("DOMContentLoaded", function () {
      const classSelect = document.getElementById("class-select");
      const dateInput = document.getElementById("attendance-date");
      const container = document.getElementById("attendance-container");
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const sidebar = document.querySelector('.sidebar');

      // Sample attendance data
      const attendanceData = {
        "10A": [
          { id: 1, name: "John Doe", status: "present" },
          { id: 2, name: "Jane Smith", status: "absent" },
          { id: 3, name: "Michael Johnson", status: "late" },
          { id: 4, name: "Sarah Williams", status: "present" },
          { id: 5, name: "David Brown", status: "present" },
          { id: 6, name: "Lisa Anderson", status: "absent" },
        ],
        "11B": [
          { id: 7, name: "Emily Davis", status: "present" },
          { id: 8, name: "Robert Wilson", status: "present" },
          { id: 9, name: "Olivia Martinez", status: "late" },
          { id: 10, name: "James Taylor", status: "present" },
        ],
        "12C": [
          { id: 11, name: "Sophia Garcia", status: "present" },
          { id: 12, name: "William Lee", status: "absent" },
          { id: 13, name: "Emma Harris", status: "present" },
          { id: 14, name: "Daniel Clark", status: "late" },
          { id: 15, name: "Ava Lewis", status: "present" },
        ],
      };

      // Set default date to today
      dateInput.valueAsDate = new Date();

      // Mobile menu toggle
      mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
      });

      // Event listeners
      classSelect.addEventListener("change", updateAttendance);
      dateInput.addEventListener("change", updateAttendance);

      function updateAttendance() {
        const selectedClass = classSelect.value;
        const selectedDate = dateInput.value;

        if (!selectedClass || !selectedDate) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">
                <i class="fas fa-clipboard-list"></i>
              </div>
              <h3 class="empty-state-title">No Data Available</h3>
              <p class="empty-state-text">
                Select a class and date to view attendance records
              </p>
            </div>
          `;
          updateStats({ total: 0, present: 0, absent: 0, late: 0 });
          return;
        }

        const students = attendanceData[selectedClass] || [];

        if (students.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3 class="empty-state-title">No Records Found</h3>
              <p class="empty-state-text">
                No attendance records found for the selected class and date
              </p>
            </div>
          `;
          updateStats({ total: 0, present: 0, absent: 0, late: 0 });
          return;
        }

        // Calculate stats
        const stats = {
          total: students.length,
          present: students.filter(s => s.status === 'present').length,
          absent: students.filter(s => s.status === 'absent').length,
          late: students.filter(s => s.status === 'late').length
        };
        
        updateStats(stats);

        container.innerHTML = `
          <div class="overflow-x-auto">
            <table class="attendance-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${students
                  .map(
                    (student) => `
                  <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>
                      <span class="status-badge badge-${student.status}">
                        <span class="attendance-status status-${student.status}"></span>
                        ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <select class="form-input py-1 px-2 status-select" data-id="${student.id}">
                        <option value="present" ${student.status === "present" ? "selected" : ""}>Present</option>
                        <option value="absent" ${student.status === "absent" ? "selected" : ""}>Absent</option>
                        <option value="late" ${student.status === "late" ? "selected" : ""}>Late</option>
                        <option value="excused" ${student.status === "excused" ? "selected" : ""}>Excused</option>
                      </select>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
            <div class="mt-6 flex justify-end">
              <button id="save-attendance" class="btn btn-primary">
                <i class="fas fa-save mr-2"></i>
                Save Attendance
              </button>
            </div>
          </div>
        `;

        // Add event listener to save button
        document.getElementById("save-attendance").addEventListener("click", () => {
          // In a real app, this would save to a database
          alert("Attendance data saved successfully!");
          
          // Show confirmation
          const saveBtn = document.getElementById('save-attendance');
          const originalText = saveBtn.innerHTML;
          saveBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Saved!';
          saveBtn.disabled = true;
          
          setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
          }, 2000);
        });

        // Add change listeners to status selects
        document.querySelectorAll('.status-select').forEach(select => {
          select.addEventListener('change', function() {
            const studentId = this.dataset.id;
            const newStatus = this.value;
            
            // Update the status badge
            const row = this.closest('tr');
            const statusCell = row.querySelector('td:nth-child(3)');
            statusCell.innerHTML = `
              <span class="status-badge badge-${newStatus}">
                <span class="attendance-status status-${newStatus}"></span>
                ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
              </span>
            `;
            
            // Update stats
            updateStatsFromChange(newStatus, studentId);
          });
        });
      }

      function updateStats(stats) {
        document.getElementById('total-students').textContent = stats.total;
        document.getElementById('present-count').textContent = stats.present;
        document.getElementById('absent-count').textContent = stats.absent;
        document.getElementById('late-count').textContent = stats.late;
      }
      
      function updateStatsFromChange(newStatus, studentId) {
        // In a real app, this would update the actual data model
        // For this demo, we'll just update the displayed counts
        
        const totalElem = document.getElementById('total-students');
        const presentElem = document.getElementById('present-count');
        const absentElem = document.getElementById('absent-count');
        const lateElem = document.getElementById('late-count');
        
        // Get current counts
        let total = parseInt(totalElem.textContent);
        let present = parseInt(presentElem.textContent);
        let absent = parseInt(absentElem.textContent);
        let late = parseInt(lateElem.textContent);
        
        // We would need to know the previous status to update correctly
        // For this demo, we'll just recalculate from the table
        const rows = document.querySelectorAll('.attendance-table tbody tr');
        let newPresent = 0, newAbsent = 0, newLate = 0;
        
        rows.forEach(row => {
          const statusBadge = row.querySelector('.status-badge');
          if (statusBadge.classList.contains('badge-present')) newPresent++;
          else if (statusBadge.classList.contains('badge-absent')) newAbsent++;
          else if (statusBadge.classList.contains('badge-late')) newLate++;
        });
        
        presentElem.textContent = newPresent;
        absentElem.textContent = newAbsent;
        lateElem.textContent = newLate;
      }
    });
  