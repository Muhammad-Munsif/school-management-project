document.addEventListener("DOMContentLoaded", function () {
  if (typeof EduAuth !== "undefined" && EduAuth.requireAuth) {
    EduAuth.requireAuth();
  }

  const session = EduAuth.getSession();
  if (session) {
    const nameEl = document.getElementById("userDisplayName");
    const avatarEl = document.getElementById("userAvatar");
    if (nameEl) nameEl.textContent = session.name;
    if (avatarEl) avatarEl.textContent = EduAuth.getInitials(session.name);

    const welcomeEl = document.getElementById("welcome-name");
    if (welcomeEl) {
      welcomeEl.textContent = session.name.split(" ")[0] + "!";
    }
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      EduAuth.logout();
    });
  }

  initMobileSidebar();
});

function initMobileSidebar() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const sidebarClose = document.querySelector(".sidebar-close, .sidebar-close-btn");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  if (!sidebar || !mobileMenuBtn) return;

  function isMobile() {
    return window.innerWidth <= 1024;
  }

  function openSidebar() {
    sidebar.classList.add("mobile-visible");
    sidebar.classList.remove("mobile-hidden");
    if (sidebarOverlay) sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("mobile-visible");
    sidebar.classList.add("mobile-hidden");
    if (sidebarOverlay) sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function initSidebar() {
    if (isMobile()) {
      sidebar.classList.add("mobile-hidden");
    } else {
      sidebar.classList.remove("mobile-hidden", "mobile-visible");
      if (sidebarOverlay) sidebarOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  mobileMenuBtn.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);

  document.querySelectorAll(".nav-item").forEach(function (item) {
    item.addEventListener("click", function () {
      if (isMobile()) closeSidebar();
    });
  });

  initSidebar();
  window.addEventListener("resize", function () {
    initSidebar();
    if (!isMobile()) closeSidebar();
  });
}
