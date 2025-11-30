document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle (would need a hamburger menu in mobile view)
  const mobileMenuButton = document.createElement("div");
  mobileMenuButton.className =
    "md:hidden fixed top-4 right-4 z-50 bg-blue-800 text-white p-2 rounded";
  mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
  document.body.appendChild(mobileMenuButton);

  mobileMenuButton.addEventListener("click", function () {
    const sidebar = document.querySelector("aside");
    sidebar.classList.toggle("hidden");
    sidebar.classList.toggle("fixed");
    sidebar.classList.toggle("inset-0");
    sidebar.classList.toggle("z-40");
  });

  // Simulate activity data
  const activities = [
    {
      date: "2023-06-01",
      activity: "New Student",
      user: "John Doe",
      details: "Registered for Grade 10",
    },
    {
      date: "2023-06-02",
      activity: "Attendance",
      user: "Sarah Smith",
      details: "Marked attendance for Class 9B",
    },
    {
      date: "2023-06-03",
      activity: "Payment",
      user: "Michael Brown",
      details: "Paid tuition fees",
    },
    {
      date: "2023-06-04",
      activity: "New Teacher",
      user: "Admin",
      details: "Hired new math teacher",
    },
  ];

  // Populate activity table
  const activityTable = document.getElementById("activity-table");
  activities.forEach((activity) => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50";
    row.innerHTML = `
            <td class="py-3 px-4">${activity.date}</td>
            <td class="py-3 px-4">${activity.activity}</td>
            <td class="py-3 px-4">${activity.user}</td>
            <td class="py-3 px-4">${activity.details}</td>
        `;
    activityTable.appendChild(row);
  });

  // Navigation functionality
  const navItems = document.querySelectorAll("nav div");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((i) =>
        i.classList.remove("active-nav-item", "bg-blue-700")
      );
      this.classList.add("active-nav-item", "bg-blue-700");

      // In a real app, this would load different content or navigate to a new page
      document.querySelector("main h2").textContent = this.textContent.trim();
    });
  });

  // Responsive adjustments
  function handleResize() {
    if (window.innerWidth >= 768) {
      const sidebar = document.querySelector("aside");
      sidebar.classList.remove("hidden", "fixed", "inset-0", "z-40");
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize();
});
