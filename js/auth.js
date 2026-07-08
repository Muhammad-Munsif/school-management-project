(function () {
  const USERS_KEY = "edumanage_users";
  const SESSION_KEY = "edumanage_session";
  const RESET_KEY = "edumanage_reset_tokens";

  const DEFAULT_USER = {
    id: "1",
    name: "Admin User",
    email: "admin@edumanage.com",
    password: "admin123",
    role: "admin",
  };

  function getUsers() {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) {
      localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_USER]));
      return [DEFAULT_USER];
    }
    return JSON.parse(stored);
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getSession() {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  function setSession(user) {
    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function isAuthenticated() {
    return getSession() !== null;
  }

  function register({ name, email, password, confirmPassword }) {
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }
    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters." };
    }
    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "user",
    };
    users.push(newUser);
    saveUsers(users);
    setSession(newUser);
    return { success: true, message: "Account created successfully!" };
  }

  function login(email, password, remember) {
    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, message: "Invalid email or password." };
    }
    setSession(user);
    if (!remember) {
      sessionStorage.setItem("edumanage_remember", "false");
    } else {
      sessionStorage.removeItem("edumanage_remember");
    }
    return { success: true, message: "Login successful!", user };
  }

  function logout() {
    clearSession();
    window.location.href = getAuthPath("login.html");
  }

  function requestPasswordReset(email) {
    if (!email) {
      return { success: false, message: "Please enter your email address." };
    }
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return { success: false, message: "No account found with this email address." };
    }
    const token = Math.random().toString(36).substring(2, 10);
    const tokens = JSON.parse(localStorage.getItem(RESET_KEY) || "{}");
    tokens[email.toLowerCase()] = { token, expires: Date.now() + 3600000 };
    localStorage.setItem(RESET_KEY, JSON.stringify(tokens));
    return {
      success: true,
      message: "Reset link sent! Check your email. (Demo token: " + token + ")",
      token,
    };
  }

  function resetPassword(email, token, newPassword, confirmPassword) {
    if (!email || !token || !newPassword) {
      return { success: false, message: "All fields are required." };
    }
    if (newPassword.length < 6) {
      return { success: false, message: "Password must be at least 6 characters." };
    }
    if (newPassword !== confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }
    const tokens = JSON.parse(localStorage.getItem(RESET_KEY) || "{}");
    const resetData = tokens[email.trim().toLowerCase()];
    if (!resetData || resetData.token !== token) {
      return { success: false, message: "Invalid or expired reset token." };
    }
    if (Date.now() > resetData.expires) {
      return { success: false, message: "Reset token has expired. Please request a new one." };
    }
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (idx === -1) {
      return { success: false, message: "User not found." };
    }
    users[idx].password = newPassword;
    saveUsers(users);
    delete tokens[email.trim().toLowerCase()];
    localStorage.setItem(RESET_KEY, JSON.stringify(tokens));
    return { success: true, message: "Password reset successfully! You can now log in." };
  }

  function getAuthPath(page) {
    const inPages = window.location.pathname.includes("/pages/");
    return inPages ? page : "pages/" + page;
  }

  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.href = getAuthPath("login.html");
      return false;
    }
    return true;
  }

  function redirectIfAuthenticated() {
    if (isAuthenticated()) {
      window.location.href = getAuthPath("dashboard.html");
      return true;
    }
    return false;
  }

  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  window.EduAuth = {
    register,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    isAuthenticated,
    getSession,
    requireAuth,
    redirectIfAuthenticated,
    getAuthPath,
    getInitials,
  };
})();
