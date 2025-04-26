// ===============================
// GIAO DIỆN VÀ FORM CHỈNH SỬA
// ===============================

function editProfile() {
  if (!checkUserLoggedIn()) return; // Kiểm tra đăng nhập trước khi mở form chỉnh sửa
  document.getElementById("overlay").style.display = "flex";
  showEditProfileForm();
}

function showEditProfileForm() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  document.getElementById("edit-profile-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("edit-username").value = user.username;
  document.getElementById("edit-email").value = user.email;
  document.getElementById("avatar-preview-img").src = user.avatar || "/images/admin.gif";
}

function previewAvatar() {
  const input = document.getElementById("edit-avatar");
  const preview = document.getElementById("avatar-preview-img");
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => preview.src = e.target.result;
    reader.readAsDataURL(file);
  }
}

function saveProfileChanges() {
  const username = document.getElementById("edit-username").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const fileInput = document.getElementById("edit-avatar");
  const avatarFile = fileInput.files[0];

  // Kiểm tra nếu thông tin chưa được nhập đầy đủ
  if (!username || !email) {
    return showError("Trường này không được để trống", "edit-username");
  }
  if (!email.includes("@")) {
    return showError("Email không hợp lệ", "edit-email");
  }

  // Nếu có ảnh đại diện, đọc và cập nhật thông tin
  if (avatarFile) {
    const reader = new FileReader();
    reader.onloadend = () => updateUserProfile(username, email, reader.result);
    reader.readAsDataURL(avatarFile);
  } else {
    const previewSrc = document.getElementById("avatar-preview-img").src;
    updateUserProfile(username, email, previewSrc);
  }
}

function updateUserProfile(username, email, avatar) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const updatedUser = { ...currentUser, username, email, avatar };

  users = users.map((u) => u.email === currentUser.email ? updatedUser : u);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  closeForm(); // Đảm bảo đóng form ngay lập tức
  location.reload(); // Reload trang để cập nhật lại UI
}

// ===============================
// ĐĂNG NHẬP - ĐĂNG KÝ - ĐĂNG XUẤT
// ===============================

function updateUIAfterLogin(username, email) {
  const authButtons = document.querySelector(".auth-buttons");

  // Xoá greeting và avatar cũ nếu tồn tại
  document.querySelector("#user-greeting")?.remove();
  document.querySelector("#user-avatar")?.remove();
  document.querySelector(".user-info")?.remove();

  // Ẩn nút đăng ký/đăng nhập
  document.querySelector("[data-key='btn-signup']").style.display = "none";
  document.querySelector("[data-key='btn-login']").style.display = "none";

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const userAvatar = document.createElement("img");
  userAvatar.src = user.avatar || "/images/admin.gif"; // Sử dụng ảnh mặc định nếu không có avatar
  userAvatar.alt = "Avatar của " + username;
  userAvatar.id = "user-avatar";
  userAvatar.style.width = "40px";
  userAvatar.style.height = "40px";
  userAvatar.style.borderRadius = "50%";
  userAvatar.style.cursor = "pointer";

  const userGreeting = document.createElement("span");
  userGreeting.id = "user-greeting";
  userGreeting.textContent = `Xin chào, ${username}`;
  userGreeting.style.cursor = "pointer";

  userAvatar.onclick = editProfile;
  userGreeting.onclick = editProfile;

  const userInfoDiv = document.createElement("div");
  userInfoDiv.className = "user-info";
  userInfoDiv.appendChild(userAvatar);
  userInfoDiv.appendChild(userGreeting);

  authButtons.appendChild(userInfoDiv);
  document.querySelector("#user-info").style.display = "block";

  // Đảm bảo đóng form đăng nhập sau khi đăng nhập thành công
  closeForm();
}

function logoutUser() {
  localStorage.removeItem("currentUser");

  // Xóa thông tin user trên UI
  document.querySelector("#user-greeting")?.remove();
  document.querySelector("#user-avatar")?.remove();
  document.querySelector(".user-info")?.remove();

  // Hiển thị lại nút đăng ký/đăng nhập
  document.querySelector("[data-key='btn-signup']").style.display = "inline-block";
  document.querySelector("[data-key='btn-login']").style.display = "inline-block";

  closeForm();
}

// ===============================
// FORM: MỞ/ĐÓNG & THÔNG BÁO
// ===============================

function closeForm() {
  const overlay = document.getElementById("overlay");
  const form = document.getElementById("edit-profile-form");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  overlay.style.display = "none";
  form.style.display = "none"; // Đảm bảo đóng form ngay lập tức
  loginForm.style.display = "none"; // Đảm bảo form đăng nhập đóng
  registerForm.style.display = "none"; // Đảm bảo form đăng ký đóng
}

function showError(message, fieldId) {
  const field = document.getElementById(fieldId);
  let errorMsg = field.nextElementSibling;

  if (!errorMsg || !errorMsg.classList.contains("error-msg")) {
    errorMsg = document.createElement("div");
    errorMsg.className = "error-msg";
    field.parentNode.insertBefore(errorMsg, field.nextSibling);
  }

  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  let errorMsg = field.nextElementSibling;
  if (errorMsg && errorMsg.classList.contains("error-msg")) {
    errorMsg.style.display = "none";
  }
}

// ===============================
// FORM: ĐĂNG KÝ / ĐĂNG NHẬP
// ===============================

function openRegisterForm() {
  document.getElementById("overlay").style.display = "flex";
  showRegister();
}

function openLoginForm() {
  document.getElementById("overlay").style.display = "flex";
  showLogin();
}

function showLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function showRegister() {
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

// ===============================
// VALIDATION & XỬ LÝ FORM
// ===============================

function validateForm(formId) {
  let valid = true;
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    clearError(input.id); // Xóa lỗi cũ trước khi kiểm tra

    if (input.value.trim() === "") {
      showError("Trường này không được để trống", input.id);
      valid = false;
    } else if (input.type === "email" && !input.value.includes("@")) {
      showError("Vui lòng nhập địa chỉ email hợp lệ!", input.id);
      valid = false;
    } else if (input.name === "password" && input.value.length < 6) {
      showError("Mật khẩu phải có ít nhất 6 ký tự", input.id);
      valid = false;
    } else if (formId === "register-form" && input.name === "confirm-password" && input.value !== document.getElementById("register-password").value) {
      showError("Mật khẩu xác nhận không khớp!", input.id);
      valid = false;
    }
  });

  return valid;
}

function registerUser() {
  if (!validateForm("register-form")) return;

  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((u) => u.email === email)) {
    showError("Email đã tồn tại!", "register-email");
    return;
  }

  const newUser = { username, email, password, avatar: "/images/tron1.webp" }; // Cập nhật ảnh mặc định cho người dùng mới
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  updateUIAfterLogin(username, email);
  closeForm();
}

function loginUser() {
  if (!validateForm("login-form")) return;

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateUIAfterLogin(user.username, user.email); // Hiển thị avatar và tên người dùng
    closeForm(); // Đảm bảo form đăng nhập sẽ đóng
  } else {
    showError("Email hoặc mật khẩu không đúng!", "login-password");
  }
}

// ===============================
// TỰ ĐỘNG LOAD USER SAU KHI RELOAD
// ===============================

window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Nếu người dùng đã đăng nhập, hiển thị UI tương ứng
  if (currentUser) {
    updateUIAfterLogin(currentUser.username, currentUser.email);
  }
  
  // Hiển thị nút đăng ký/đăng nhập (mặc định)
  document.querySelector("[data-key='btn-signup']").style.display = "inline-block";
  document.querySelector("[data-key='btn-login']").style.display = "inline-block";
});

// ===============================
// KIỂM TRA ĐĂNG NHẬP
// ===============================

function checkUserLoggedIn() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    openLoginForm(); // Mở form đăng nhập nếu chưa đăng nhập
    return false;
  }
  return true;
}

// ===============================
// HIỂN THỊ MẬT KHẨU
// ===============================

function togglePasswordVisibility() {
  const passwordField = document.getElementById("login-password");
  const confirmPasswordField = document.getElementById("register-password");
  const passwordToggle = document.getElementById("password-toggle");

  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }

  // Cũng thay đổi mật khẩu xác nhận nếu có
  if (confirmPasswordField) {
    if (confirmPasswordField.type === "password") {
      confirmPasswordField.type = "text";
    } else {
      confirmPasswordField.type = "password";
    }
  }
  
  // Thay đổi icon của checkbox
  if (passwordField.type === "text") {
    passwordToggle.src = "/images/eye-open-icon.png"; // Biểu tượng "mắt mở"
  } else {
    passwordToggle.src = "/images/eye-close-icon.png"; // Biểu tượng "mắt đóng"
  }
}

// ===============================
// TẠO TÀI KHOẢN ADMIN MẶC ĐỊNH
// ===============================

function initializeAdminAccount() {
  const adminAccount = {
    username: "Quản trị viên",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  };

  // Lấy danh sách users từ localStorage hoặc tạo mới nếu chưa có
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Kiểm tra xem admin đã tồn tại chưa
  const adminExists = users.some(user => user.email === adminAccount.email);
  
  if (!adminExists) {
    users.push(adminAccount);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Đã tạo tài khoản admin mặc định");
  }
}

// Gọi hàm khởi tạo khi trang được tải
window.addEventListener("DOMContentLoaded", () => {
  initializeAdminAccount();
  
});



