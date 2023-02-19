"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".rules-button")
    .addEventListener("click", () => open_rules());

  document
    .querySelector(".cross-img")
    .addEventListener("click", () => close_rules());

  document
    .querySelector(".bg-model")
    .addEventListener("click", () => close_rules());
});

function open_rules() {
  document.querySelector(".bg-model").style.display = "block";
  document.querySelector(".rules-popup").style.display = "block";
}

function close_rules() {
  document.querySelector(".bg-model").style.display = "none";
  document.querySelector(".rules-popup").style.display = "none";
}
