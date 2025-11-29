document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const currentDateElement = document.getElementById("current-date");

  // Set current date
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateElement.textContent = now.toLocaleDateString("en-US", options);

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");
  });

  // Quick action buttons
  document.querySelectorAll(".quick-action").forEach((action) => {
    action.addEventListener("click", function () {
      const actionText = this.querySelector("span").textContent;
      alert(`Redirecting to: ${actionText}`);
    });
  });

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

  // Simulate loading animation
  setTimeout(() => {
    document.querySelectorAll(".stats-card").forEach((card) => {
      card.style.opacity = "1";
    });
  }, 100);
});
