"use strict";

//===============================================
// HOME PAGE HERO MESSAGE
//===============================================
setInterval(
  function slideText() {
    let max = heroH1.length;
    let i = Math.floor((Math.random() * max) + 0);
    $('#hero-h1').html(`${heroH1[i]}`);
  }, 2000
);

setInterval(
  function slideText() {
    let max = heroDiv.length;
    let i = Math.floor((Math.random() * max) + 0);
    $('#hero-div').html(`${heroDiv[i]}`);
  }, 3000
);

//===============================================
// REGISTER PAGE REGISTER BUTTON
//===============================================
function validatePassword() {
  $('#frm-password-confirm').on('focusout', function() {
    pw = $('#frm-password').val();
    pwconfirm = $('#frm-password-confirm').val();
    if (pw == pwconfirm) {
      //$('#frm-pwconfirm-message').toggle().html('Password entered matches').css('color', 'white');
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

    if (pass) {
      console.log('pw', pw);
      console.log('pw-confirm', pwconfirm);
      location.href = "/email-confirmation";
    } else {
      $('#frm-pwconfirm-message').toggle().html('Password entered does not match').css('color', 'red');
      $('#frm-password').select();
      console.log('Password Validation Failure');
    }
    console.log("handleRegisterFormSubmit submitted");
  });
}

function startApp() {
  validatePassword();
}

$(startApp);
