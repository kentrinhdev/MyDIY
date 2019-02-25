"use strict";

function checkSessionProfile() {
  let user = localStorage.getItem('user');
  if (user) {
    location.href = "/profile";
    return true;
  } else {
    location.href = "/register-login";
  }
}

function handleHomeButton() {
  let user = localStorage.getItem('user');
  if (user) {
    location.href = "/home";
  }
}

function renderUserData() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    console.log("Valid user token found", user);
    $('#first-name').text(user.firstName);
    $('#last-name').text(user.lastName);
    $('#user-name').text(user.userName);
    $('#email-address').text(user.email);
  }
}

function startApp() {
  renderUserData();
}

$(startApp);