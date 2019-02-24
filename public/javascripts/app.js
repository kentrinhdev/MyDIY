"use strict";

function checkSession() {
  let user = localStorage.getItem('user');
  if (user) {
    location.href = "/home";
  }
}

function validatePassword() {
  $('#frm-password-confirm').on('focusout', function() {
    pw = $('#frm-password').val();
    pwconfirm = $('#frm-password-confirm').val();
    if (pw == pwconfirm) {
      $('#frm-pwconfirm-message').hide();
      $('#frm-email').select();
      pwvalidate = true;
    } else {
      $('#frm-pwconfirm-message').toggle().html('Password entered does not match').css('color', 'red');
      $('#frm-password').select();
      pwvalidate = false;
    }
  });
  return pwvalidate;
}

function handleRegisterFormSubmit() {
  $('#form-register').submit(function(event) {
    event.preventDefault();
    var pass = validatePassword();
    console.log('pass: ', pass);

    let firstName = $('#register-firstname').val();
    let lastName = $('#register-lastname').val();
    let username = $('#register-username').val();
    let password = $('#frm-password').val();
    let email = $('#frm-email').val();

    if (pass) {
      console.log('pw', pw);
      console.log('pw-confirm', pwconfirm);

      $.ajax({
          type: 'POST',
          url: '/users',
          data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email
          },
          success: function(data) {
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data));
            location.href = "/profile";
          },
          dataType: "json"
        });
    } else {
      $('#frm-pwconfirm-message').toggle().html('Password entered does not match').css('color', 'red');
      $('#frm-password').select();
      console.log('Password Validation Failure');
    }
    console.log("handleRegisterFormSubmit submitted");
  });
}

function handleLoginFormSubmit() {
  $('#form-login').submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/users/login',
      data: {
        username: $('#login-username').val(),
        password: $('#login-password').val(),
      },
      success: function(data) {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        location.href = "/profile";
      },
      error: function(data) {
        console.log(data);
        $('#wrong-password-message').toggle().html(`Password entered is incorrect!<br>Please try again.`).css('color', 'red');
        $('#login-username').select();
        console.log("Username and/or Password is incorrect");
      },
      dataType: "json"
    });
  });
}

function handleLoginPageLoad() {
  $('#login-username').focus();
}

function startApp() {
  checkSession();
  validatePassword();
  handleLoginPageLoad();
}

$(startApp);