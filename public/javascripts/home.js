"use strict";

function checkSessionHome() {
  let user = localStorage.getItem('user');
  if (user) {
    location.href = "/home";
  } else {
    location.href = "/";
  }
}

function checkSessionHomeSaved() {
  let user = localStorage.getItem('user');
  if (user) {
    location.href = "/home#saved-projects";
  } else {
    location.href = "/register-login";
  }
}

function checkSessionHomeUpload() {
  let user = localStorage.getItem('user');
  if (user) {
    location.href = "/home#upload-projects";
  } else {
    location.href = "/register-login";
  }
}

function animateMoreImage() {
  $("#div-img-more").fadeOut(1000).fadeIn(3000);
  $("#div-img-more-upload").fadeOut(1000).fadeIn(3000);
  $("#div-img-top").fadeOut(1000).fadeIn(3000);
  setTimeout(animateMoreImage,2000);
}

function handleLogoutButton() {
  localStorage.removeItem('user');
  window.location.href = "/";
}

function startApp() {
  animateMoreImage();
}

$(startApp);