const host = "http://localhost:3000";

const elements = {
  emailInput: document.querySelector("#email"),
  emailConfirmationInput: document.querySelector("#email-confirmation"),
  passwordInput: document.querySelector("#password"),
  passwordConfirmationInput: document.querySelector("#password-confirmation"),
  loginForm: document.querySelector("#login-form"),
  registerForm: document.querySelector("#register-form")
}

const setAuthentication = (hash) => {
  localStorage.setItem("Authorization", hash);
}

const clearAuthentication = () => {
  localStorage.removeItem("Authorization");
}

const isAuthenticated = () => {
  return !!localStorage.getItem("Authorization");
}