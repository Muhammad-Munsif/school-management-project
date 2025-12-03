
    document.addEventListener("DOMContentLoaded", function () {
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      const sidebar = document.querySelector(".sidebar");
      const sidebarCloseBtn = document.querySelector(".sidebar-close-btn");
      const sidebarOverlay = document.querySelector(".sidebar-overlay");
      const colorOptions = document.querySelectorAll(".color-option");
      const toggleSwitches = document.querySelectorAll(".toggle-switch input");
      const deleteButton = document.getElementById("delete-all-data");

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

      // Color theme selection
      colorOptions.forEach((option) => {
        option.addEventListener("click", function () {
          colorOptions.forEach((opt) => opt.classList.remove("active"));
          this.classList.add("active");

          const color = this.getAttribute("data-color");
          // In a real app, this would change the theme
          alert(`Theme changed to ${color} mode`);
        });
      });

      // Toggle switch feedback
      toggleSwitches.forEach((toggle) => {
        toggle.addEventListener("change", function () {
          const settingName = this.closest(".settings-option").querySelector(
            ".settings-option-title"
          ).textContent;
          const action = this.checked ? "enabled" : "disabled";
          // In a real app, this would save the setting
          console.log(`${settingName} ${action}`);
        });
      });

      // Handle form submissions
      document.querySelectorAll('button[type="submit"]').forEach((button) => {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          // In a real app, this would submit the form
          alert("Settings saved successfully!");
        });
      });

      // Danger zone actions
      deleteButton.addEventListener("click", function () {
        if (
          confirm(
            "Are you absolutely sure? This will delete ALL data and cannot be undone."
          )
        ) {
          alert("All data has been deleted. The page will now refresh.");
          // In a real app, this would delete data and refresh
          setTimeout(() => location.reload(), 2000);
        }
      });

      // Add hover animations to cards
      const cards = document.querySelectorAll(".settings-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-5px)";
        });

        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0)";
        });
      });
    });
  