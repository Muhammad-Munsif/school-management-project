document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const colorOptions = document.querySelectorAll(".color-option");
  const toggleSwitches = document.querySelectorAll(".toggle-switch input");
  const deleteButton = document.getElementById("delete-all-data");

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  // Color theme selection
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      colorOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      const color = this.getAttribute("data-color");
      // Show visual feedback
      this.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.style.transform = "scale(1.1)";
      }, 300);

      // In a real app, this would change the theme
      showNotification(`Theme changed to ${color} mode`, "success");
    });
  });

  // Toggle switch feedback
  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const settingName = this.closest(".settings-option").querySelector(
        ".settings-option-title"
      ).textContent;
      const action = this.checked ? "enabled" : "disabled";

      // Visual feedback
      const slider = this.nextElementSibling;
      slider.style.transform = "scale(1.1)";
      setTimeout(() => {
        slider.style.transform = "scale(1)";
      }, 200);

      // In a real app, this would save the setting
      showNotification(`${settingName} ${action}`, "info");
    });
  });

  // Handle form submissions
  document.querySelectorAll('button[type="submit"]').forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);

      // In a real app, this would submit the form
      showNotification("Settings saved successfully!", "success");
    });
  });

  // Danger zone actions
  deleteButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you absolutely sure? This will delete ALL data and cannot be undone."
      )
    ) {
      // Visual feedback
      this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Deleting...';
      this.disabled = true;

      setTimeout(() => {
        showNotification("All data has been deleted successfully!", "success");
        this.innerHTML = '<i class="fas fa-trash-alt mr-2"></i>Delete All Data';
        this.disabled = false;
      }, 2000);
    }
  });

  // Backup option interactions
  document.querySelectorAll(".backup-option").forEach((option) => {
    option.addEventListener("click", function () {
      const title = this.querySelector(".backup-title").textContent;
      showNotification(`${title} initiated successfully!`, "info");
    });
  });

  // Notification function
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 transform translate-x-full transition-transform duration-300 ${
      type === "success"
        ? "bg-green-500"
        : type === "error"
        ? "bg-red-500"
        : "bg-blue-500"
    }`;
    notification.innerHTML = `
          <div class="flex items-center">
            <i class="fas fa-${
              type === "success"
                ? "check"
                : type === "error"
                ? "exclamation"
                : "info"
            }-circle mr-2"></i>
            <span>${message}</span>
          </div>
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Add some interactive elements
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
