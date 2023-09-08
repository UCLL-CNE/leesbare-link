const host = "http://localhost:3000";

const elements = {
  emailInput: document.querySelector("#email"),
  emailConfirmationInput: document.querySelector("#email-confirmation"),
  passwordInput: document.querySelector("#password"),
  passwordConfirmationInput: document.querySelector("#password-confirmation"),
  loginForm: document.querySelector("#login-form"),
  registerForm: document.querySelector("#register-form"),
  createForm: document.querySelector("#create-form"),
  linkInput: document.querySelector("#link"),
  mappingInput: document.querySelector("#mapping"),
  linkTable: document.querySelector("#link-table"),
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