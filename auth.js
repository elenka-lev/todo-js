import { switchForm } from './main.js'

/*Registation / регістрація*/
const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const newUser = Object.fromEntries(formData.entries());
  
const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find(
    (user) => user.useremail === newUser.useremail
  );

  if (existingUser) {
    alert("A user with this email address is already registered!");
    return;
  }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

  registerForm.reset();
  switchForm('login');
});

/*Login and verification / перевірка та вхід*/

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const formDataLogin = new FormData(loginForm);
    const loginData = Object.fromEntries(formDataLogin.entries());
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const savedUser = users.find((user) => user.useremail === loginData.useremail && user.pswrd === loginData.pswrd
 );

 if (savedUser) {
   alert("Welcome, " + savedUser.username + "!");
   window.location.href = "profile.html";
 } else {
   alert("Incorrect email or password! Try again");
 }
})