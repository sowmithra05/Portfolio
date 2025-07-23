// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.getElementById("themeToggle").textContent = "☀️ Toggle Theme";
}

// Toggle theme
document.getElementById("themeToggle").addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  this.textContent = isDark ? "☀️ Toggle Theme" : "🌙 Toggle Theme";
});

