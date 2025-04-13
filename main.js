// Animations
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Check Register Error
const form = document.querySelector("form");
const username = document.getElementById("username");
const usernameError = document.querySelector("#username-error");
const userLastname = document.getElementById("user-lastname");
const userLastnameError = document.querySelector("#user-lastname-error");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");
const phonerNumberError = document.querySelector("#phoner-number-error");
const emailError = document.querySelector("#email-error");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector("#confirm-password-error");
const passwordError = document.querySelector("#password-error");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}

// Check email is valid
function checkEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

phoneNumber.addEventListener("input", function () {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phoneNumber.value)) {
    phonerNumberError.textContent = "*Phone number must be 10 digits.";
  } else {
    phonerNumberError.textContent = "";
  }
});

email.addEventListener("input", function () {
  if (!checkEmail(email.value)) {
    emailError.textContent = "*Email is not valid";
  } else {
    emailError.textContent = "";
  }
});

// Check length input user name
username.addEventListener("input", function () {
  if (username.value.length < 3) {
    usernameError.textContent = "*Username must be at least 3 characters.";
  } else if (username.value.length > 20) {
    usernameError.textContent = "*Username must be less than 20 characters.";
  } else {
    usernameError.textContent = "";
  }
});

userLastname.addEventListener("input", function () {
  if (userLastname.value.length < 3) {
    userLastnameError.textContent = "*Last name must be at least 3 characters.";
  } else if (userLastname.value.length > 30) {
    userLastnameError.textContent = "*Last name must be less than 30 characters.";
  } else {
    userLastnameError.textContent = "";
  }
});

// Check length input password
password.addEventListener("input", function () {
  if (password.value.length < 8) {
    passwordError.textContent = "*Password must be at least 8 characters.";
  } else if (password.value.length > 20) {
    passwordError.textContent = "*Password must be less than 20 characters.";
  } else {
    passwordError.textContent = "";
  }
});

confirmPassword.addEventListener("input", function () {
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "*Passwords must match.";
  } else {
    confirmPasswordError.textContent = "";
  }
});

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `*${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners for register form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!checkRequired([username, email, password, userLastname, phoneNumber])) {
    // Additional checks can be added here if necessary
  }
});

// Check Login Error
let lgForm = document.querySelector(".form-lg");
let lgEmail = document.querySelector(".email-2");
let lgEmailError = document.querySelector(".email-error-2");
let lgPassword = document.querySelector(".password-2");
let lgPasswordError = document.querySelector(".password-error-2");

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

// Check email is valid for login
function checkEmail2(email) {
  const emailRegex2 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex2.test(email);
}

lgEmail.addEventListener("input", function () {
  if (!checkEmail2(lgEmail.value)) {
    lgEmailError.textContent = "*Email is not valid";
  } else {
    lgEmailError.textContent = "";
  }
});

lgPassword.addEventListener("input", function () {
  if (lgPassword.value.length < 8) {
    lgPasswordError.textContent = "*Password must be at least 8 characters.";
  } else if (lgPassword.value.length > 20) {
    lgPasswordError.textContent = "*Password must be less than 20 characters.";
  } else {
    lgPasswordError.textContent = "";
  }
});

function checkRequiredLg(inputArr) {
  let isRequiredLg = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError2(
        input,
        `*${getFieldNameLg(input)} is required`
      );
      isRequiredLg = true;
    } else {
      showSuccess2(input);
    }
  });

  return isRequiredLg;
}

function getFieldNameLg(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

lgForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!checkRequiredLg([lgEmail, lgPassword])) {
    if(checkEmail2(lgEmail.value)){
      window.location.href = "index.html";
    };
  }
});
