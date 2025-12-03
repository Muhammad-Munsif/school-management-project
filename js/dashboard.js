document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const currentDateElement = document.getElementById("current-date");
  const quickActions = document.querySelectorAll(".quick-action");

  // Set current date
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateElement.textContent = now.toLocaleDateString("en-US", options);

  // Check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 1024;
  }

  // Mobile menu toggle functionality
  function openSidebar() {
    sidebar.classList.add("mobile-visible");
    sidebar.classList.remove("mobile-hidden");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("mobile-visible");
    sidebar.classList.add("mobile-hidden");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Initialize sidebar state based on screen size
  function initSidebar() {
    if (isMobile()) {
      sidebar.classList.add("mobile-hidden");
    } else {
      sidebar.classList.remove("mobile-hidden", "mobile-visible");
    }
  }

  mobileMenuBtn.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  // Close sidebar when clicking on nav items on mobile
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (isMobile()) {
        closeSidebar();
      }
    });
  });

  // Quick action buttons
  quickActions.forEach((action) => {
    action.addEventListener("click", function () {
      const actionType = this.getAttribute("data-action");
      let message = "";

      switch (actionType) {
        case "students":
          message = "Redirecting to Student Management";
          break;
        case "teachers":
          message = "Redirecting to Teacher Management";
          break;
        case "classes":
          message = "Redirecting to Class Management";
          break;
        case "attendance":
          message = "Redirecting to Attendance Tracking";
          break;
        case "subjects":
          message = "Redirecting to Subject Management";
          break;
        case "reports":
          message = "Generating System Report";
          break;
      }

      // Visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);

      alert(message);
    });
  });

  // Initialize Charts
  // Attendance Chart
  const attendanceCtx = document
    .getElementById("attendanceChart")
    .getContext("2d");
  const attendanceChart = new Chart(attendanceCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Attendance Rate (%)",
          data: [92, 94, 91, 96, 95, 88],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 80,
          max: 100,
        },
      },
    },
  });

  // Student Distribution Chart
  const studentCtx = document.getElementById("studentChart").getContext("2d");
  const studentChart = new Chart(studentCtx, {
    type: "doughnut",
    data: {
      labels: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
      datasets: [
        {
          data: [320, 310, 298, 320],
          backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  // Simulate real-time data updates
  setInterval(() => {
    // Update random stats
    const students = document.getElementById("total-students");
    const currentStudents = parseInt(students.textContent.replace(",", ""));
    students.textContent = (
      currentStudents + Math.floor(Math.random() * 3)
    ).toLocaleString();

    const attendance = document.getElementById("attendance-rate");
    const currentAttendance = parseInt(attendance.textContent);
    attendance.textContent =
      currentAttendance + Math.floor(Math.random() * 3) - 1 + "%";

    // Update charts with new data
    const newData = attendanceChart.data.datasets[0].data.map((value) => {
      return Math.max(
        85,
        Math.min(99, value + Math.floor(Math.random() * 5) - 2)
      );
    });
    attendanceChart.data.datasets[0].data = newData;
    attendanceChart.update();
  }, 5000);

  // Add hover effects to stats cards
  const statsCards = document.querySelectorAll(".stats-card");
  statsCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Initialize sidebar on load
  initSidebar();

  // Handle window resize
  window.addEventListener("resize", function () {
    initSidebar();
    if (!isMobile()) {
      closeSidebar();
    }
  });
});
