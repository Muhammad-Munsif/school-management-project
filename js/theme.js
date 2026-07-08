(function () {
  const STORAGE_KEY = "edumanage_theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
    updateToggleButtons();
  }

  function updateToggleButtons() {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      const moon = btn.querySelector(".fa-moon");
      const sun = btn.querySelector(".fa-sun");
      if (moon) moon.style.display = isDark ? "none" : "inline-block";
      if (sun) sun.style.display = isDark ? "inline-block" : "none";
    });
  }

  applyTheme(getPreferredTheme());

  window.EduTheme = { toggleTheme, applyTheme, getPreferredTheme, updateToggleButtons };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", toggleTheme);
    });
    updateToggleButtons();
  });
})();
