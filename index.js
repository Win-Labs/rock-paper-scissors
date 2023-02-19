"use strict";
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

const weapons = ["paper", "scissors", "rock"];

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
