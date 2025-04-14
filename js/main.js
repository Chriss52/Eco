// --- Overlay para cambiar entre registro y login ---
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// --- Funciones para mostrar errores y éxitos en campos ---
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}

function checkEmail(emailVal) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(emailVal);
}

// --- Funciones para gestionar usuarios en localStorage ---
function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function registerUser(user) {
  const users = getUsers();
  // Verificar si el correo ya está registrado
  if (users.some(u => u.email === user.email)) {
    alert("El usuario ya existe. Elige otro correo.");
    return false;
  }
  users.push(user);
  saveUsers(users);
  alert("Registro exitoso");
  return true;
}

// --- Registro de usuario ---
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const lastname = document.getElementById("user-lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone-number").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const role = document.getElementById("role").value;

  // Validaciones básicas
  if (username.length < 3) {
    showError(document.getElementById("username"), "*El nombre debe tener al menos 3 caracteres");
    return;
  } else {
    showSuccess(document.getElementById("username"));
  }
  if (lastname.length < 3) {
    showError(document.getElementById("user-lastname"), "*El apellido debe tener al menos 3 caracteres");
    return;
  } else {
    showSuccess(document.getElementById("user-lastname"));
  }
  if (!checkEmail(email)) {
    showError(document.getElementById("email"), "*Correo inválido");
    return;
  } else {
    showSuccess(document.getElementById("email"));
  }
  if (phone.length !== 10) {
    showError(document.getElementById("phone-number"), "*El número debe tener 10 dígitos");
    return;
  } else {
    showSuccess(document.getElementById("phone-number"));
  }
  if (password.length < 8) {
    showError(document.getElementById("password"), "*La contraseña debe tener al menos 8 caracteres");
    return;
  } else {
    showSuccess(document.getElementById("password"));
  }
  if (password !== confirmPassword) {
    showError(document.getElementById("confirm-password"), "*Las contraseñas no coinciden");
    return;
  } else {
    showSuccess(document.getElementById("confirm-password"));
  }
  if (role === "") {
    const roleEl = document.getElementById("role");
    showError(roleEl, "*Seleccione un rol");
    return;
  } else {
    const roleEl = document.getElementById("role");
    roleEl.parentElement.className = "form-control";
    const small = roleEl.parentElement.querySelector("small");
    small.innerText = "";
  }
  
  const user = { username, lastname, email, phone, password, role };
  if (registerUser(user)) {
    registerForm.reset();
    // Alternar a la vista de login después de un registro exitoso
    container.classList.remove("right-panel-active");
  }
});

// --- Validaciones para el formulario de Login ---
function showError2(input, message) {
  const formControl2 = input.parentElement;
  formControl2.className = "form-control2 error";
  const small2 = formControl2.querySelector("small");
  small2.innerText = message;
}

function showSuccess2(input) {
  const formControl2 = input.parentElement;
  formControl2.className = "form-control2 success";
  const small2 = formControl2.querySelector("small");
  small2.innerText = "";
}

function checkEmail2(emailVal) {
  const emailRegex2 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex2.test(emailVal);
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value.trim();
  const loginPassword = document.getElementById("loginPassword").value;
  
  if (!checkEmail2(loginEmail)) {
    showError2(document.querySelector(".email-2"), "*Correo inválido");
    return;
  } else {
    showSuccess2(document.querySelector(".email-2"));
  }
  if (loginPassword.length < 8) {
    showError2(document.querySelector(".password-2"), "*La contraseña debe tener al menos 8 caracteres");
    return;
  } else {
    showSuccess2(document.querySelector(".password-2"));
  }
  
  const users = getUsers();
  const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
  if (!user) {
    alert("Credenciales incorrectas");
    return;
  }
  
  sessionStorage.setItem("loggedUser", JSON.stringify(user));
  alert(`Bienvenido ${user.username}. Rol: ${user.role}`);
  
  // Redirigir según rol
  if (user.role === "huesped") {
    window.location.href = "exAlojamiento.html";
  } else if (user.role === "anfitrion") {
    window.location.href = "anfitrionReportes.html";
  } else if (user.role === "admin") {
    window.location.href = "adminView.html";
  }
});
