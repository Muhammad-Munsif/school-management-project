document.addEventListener("DOMContentLoaded", function () {
  EduAuth.redirectIfAuthenticated();

  document.querySelectorAll(".toggle-password").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const input = this.closest(".auth-input-wrapper").querySelector("input");
      const icon = this.querySelector("i");
      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const remember = document.getElementById("remember").checked;
      const result = EduAuth.login(email, password, remember);
      showAlert(result.message, result.success ? "success" : "error");
      if (result.success) {
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 800);
      }
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const result = EduAuth.register({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
      });
      showAlert(result.message, result.success ? "success" : "error");
      if (result.success) {
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 800);
      }
    });
  }

  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const result = EduAuth.requestPasswordReset(email);
      showAlert(result.message, result.success ? "success" : "error");
      if (result.success) {
        document.getElementById("resetEmail").value = email;
        showStep(2);
      }
    });
  }

  const resetForm = document.getElementById("resetForm");
  if (resetForm) {
    resetForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const result = EduAuth.resetPassword(
        document.getElementById("resetEmail").value,
        document.getElementById("token").value,
        document.getElementById("newPassword").value,
        document.getElementById("confirmPassword").value
      );
      showAlert(result.message, result.success ? "success" : "error");
      if (result.success) {
        setTimeout(function () {
          window.location.href = "login.html";
        }, 1500);
      }
    });
  }
});

function showAlert(message, type) {
  const alert = document.getElementById("authAlert");
  if (!alert) return;
  alert.className = "auth-alert show auth-alert-" + type;
  alert.innerHTML = '<i class="fas fa-' + (type === "success" ? "check-circle" : "exclamation-circle") + '"></i> ' + message;
}

function showStep(step) {
  document.querySelectorAll(".reset-step").forEach(function (el) {
    el.classList.remove("active");
  });
  const target = document.getElementById("step" + step);
  if (target) target.classList.add("active");
}
