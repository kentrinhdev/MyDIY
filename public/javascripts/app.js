"use strict";

setInterval(
  function slideH1() {
    let max = heroH1.length;
    let i = Math.floor((Math.random() * max) + 0);
    $('#hero-h1').html(`${heroH1[i]}`);
  }, 2000
);

setInterval(
  function slideH1() {
    let max = heroDiv.length;
    let i = Math.floor((Math.random() * max) + 0);
    $('#hero-div').html(`${heroDiv[i]}`);
  }, 3000
);

function startApp() {
  slideH1();
}

$(startApp);
