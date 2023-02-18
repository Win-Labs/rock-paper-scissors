"use strict";
const weapons = document.querySelectorAll(".outer-circle");
const arena = document.querySelector(".arena");
weapons.forEach((weapon, i, arr) =>
  weapon.addEventListener("click", () => {
    const newClassPlayer = `${weapon.classList[1]}-chosen`;
    weapon.classList.remove(weapon.classList[1]);
    weapon.classList.add(newClassPlayer);
    console.log(weapon.classList);
    const playerChoiceHTML = `
    <div class="container choice">
      <p class="choice-title">YOU PICKED</p>
      ${weapon.outerHTML}
    </div>
    `;

    arena.remove();
    document
      .querySelector(".arena-wrapper")
      .insertAdjacentHTML("beforeend", playerChoiceHTML);

    const houseWeapon = arr[Math.floor(Math.random() * arr.length)];
    const newClassHouse = `${houseWeapon.classList[1]}-chosen`;
    houseWeapon.classList.remove(houseWeapon.classList[1]);
    houseWeapon.classList.add(newClassHouse);
    const houseWeaponHTML = `
    <div class='container choice'>
      <p class='choice-title'>HOUSE PICKED</p>
      ${arr[Math.floor(Math.random() * arr.length)].outerHTML}
    </div>`;
    document
      .querySelector(".arena-wrapper")
      .insertAdjacentHTML("beforeend", houseWeaponHTML);
  })
);
