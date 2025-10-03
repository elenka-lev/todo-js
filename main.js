/*only modal*/
const modal = document.getElementById("auth-modal");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginBtn = document.querySelector(".login");
const signUpBtn = document.querySelector(".sign-up");
const closeBtn = document.querySelector(".close");

// open modal / відкриваємо модальне вікно
function openModal(formType) {
  modal.classList.add("active");

  loginForm.classList.remove("isActive");
  registerForm.classList.remove("isActive");

  if (formType === "login") {
    loginForm.classList.add("isActive");
  } else {
    registerForm.classList.add("isActive");
  }
}

//close modal / закриваємо модальну вікно
function closeModal() {
  modal.classList.remove("active");
  loginForm.classList.remove("isActive");
  registerForm.classList.remove("isActive");
}

// choose modal / перемикаємося між модальнимі вікнами
export function switchForm(type) {
  loginForm.classList.remove("isActive");
  registerForm.classList.remove("isActive");

  if (type === "login") {
    loginForm.classList.add("isActive");
  } else {
    registerForm.classList.add("isActive");
  }
}

// event for buttons / подія для кнопок
loginBtn.addEventListener("click", () => openModal("login"));
signUpBtn.addEventListener("click", () => openModal("register"));
closeBtn.addEventListener("click", closeModal);

// movement within the modal / переміщення в модалці "Sign up" и "Login"
document.querySelectorAll(".go-reg").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const type = btn.textContent.includes("Login") ? "login" : "register";
    switchForm(type);
  });
});
/*modal ended*/

