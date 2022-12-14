"use strict";

$('.menu').addEventListener('click',function() {
  $('.menu-content').classList.toggle('d-flex');
  $('.menu-item').style.transform='translateY(0px)'
  $(".btn-light").addEventListener('click',function() {
    $('.menu-content').classList.remove('d-flex');
})
})
window.addEventListener('scroll',() =>{
  if(window.scrollY="400px" ){
    $("header").style.transition= 'all 1.2s ease-in';
    $("header").style.background= '#fff';
  }
});



let userName = localStorage.getItem("user");
let token = localStorage.getItem("token");

$('#userLogin').innerHTML = `${userName}`;

if (!token) {
  location.replace('./login.html');
}

$('#logout').addEventListener('click', () => {
localStorage.clear();
location.reload();
})