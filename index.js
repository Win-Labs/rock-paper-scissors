"use strict";

const weapons = ["paper", "scissors", "rock"];
const arena = document.querySelector(".arena");

const weaponView = (classes, weapon) => `
  <div class="outer-circle ${classes}">
    <div class="pulse start">
      <div class="inner-circle">
        <img class="icon" src="./assets/images/${weapon}.svg" alt="${weapon}" />
      </div>
    </div>
  </div>
`;

const choiceView = (weapon) => `
  <div class="container choice">
    <p class="choice-title">YOU PICKED</p>
    ${weaponView(`${weapon}-chosen`, weapon)}
  </div>
`;


weapons.forEach((weapon) =>
  arena.insertAdjacentHTML("afterbegin", weaponView(weapon, weapon))
);

document.querySelectorAll(".outer-circle").forEach((weapon) =>
  weapon.addEventListener("click", () => {
    const weaponTitle = weapon.classList[1];
    const playerChoiceHTML = choiceView(weaponTitle);
    const houseWeaponTitle =
      weapons[Math.floor(Math.random() * weapons.length)];
    const houseWeaponHTML = choiceView(houseWeaponTitle);

    arena.remove();
    document
      .querySelector(".arena-wrapper")
      .insertAdjacentHTML("beforeend", playerChoiceHTML + houseWeaponHTML);
  })
);


  document
    .querySelector(".rules-button")
    .addEventListener("click", () => open_rules());

  document
    .querySelector(".cross-img")
    .addEventListener("click", () => close_rules());

  document
    .querySelector(".bg-model")
    .addEventListener("click", () => close_rules());

function open_rules() {
  document.querySelector(".bg-model").style.display = "block";
  document.querySelector(".rules-popup").style.display = "block";
}

function close_rules() {
  document.querySelector(".bg-model").style.display = "none";
  document.querySelector(".rules-popup").style.display = "none";
}
