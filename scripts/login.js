"use strict";
let baseURL = "https://task.samid.uz/v1/user";
const login = (e) => {
   e.preventDefault();
   const userName = $("#username").value.trim();
   const userPassword = $("#password").value.trim();


   const params = {
      username: userName,
      password: userPassword,
   };


   if (
      userName.length === 0 ||
      userPassword.length === 0
   ) {
      alert("Please enter your username and email address");
   } else {
      fetch(`${baseURL}/sign-in`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
         })
         .then((e) => e.json())
         .then((e) => {
            if (e.code === 1) {
               localStorage.setItem('token', e.data.token);
               localStorage.setItem('user', e.data.username);
               alert(` ${e.data.username} welcome to Eduvi`)
               setInterval(() => {
                  location.replace('./index.html');
               }, 1000)
            } else {
               alert(e.message)
            }
         });
   }

};


$("#signin").addEventListener("submit", (e) => {
   login(e)
});