// Set page title
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("page-title").textContent = "Student Management";
});

// Load components
fetch("../components/sidebar.html")
  .then((response) => response.text())
  .then((data) => (document.getElementById("sidebar").innerHTML = data));

fetch("../components/header.html")
  .then((response) => response.text())
  .then((data) => (document.getElementById("header").innerHTML = data));
