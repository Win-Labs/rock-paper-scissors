"use strict";

const weapons = ["paper", "scissors", "rock"];
const arena = document.querySelector(".arena");

const rules = {
  paper: { winsOver: "rock" },
  rock: { winsOver: "scissors" },
  scissors: { winsOver: "paper" },
};

const weaponView = (classes, weapon) => `
  <div class="outer-circle ${classes}">
    <div class="pulse start">
      <div class="inner-circle">
        <img class="icon" src="./assets/images/${weapon}.svg" alt="${weapon}" />
      </div>
    </div>
  </div>
`;

const choiceView = (weapon, house) => `
  <div class="container choice">
    <p class="choice-title">${house ? "HOUSE" : "YOU"} PICKED</p>
    ${weaponView(`${weapon}-chosen`, weapon)}
  </div>
`;

const resultPlayAgain = (winner) => `
  <div class="container result-play-again">
    <p class="result">${
      (winner === "player" && "YOU WIN") ||
      (winner === "house" && "YOU LOSE") ||
      (winner === "none" && "DRAW")
    } 
    </p>
    <button class="btn-play-again">PLAY AGAIN</button>
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
    const houseWeaponHTML = choiceView(houseWeaponTitle, true);
    const winner =
      (rules[weaponTitle].winsOver === houseWeaponTitle && "player") ||
      (weaponTitle === houseWeaponTitle && "none") ||
      "house";
    arena.remove();

    document
      .querySelector(".arena-wrapper")
      .insertAdjacentHTML(
        "beforeend",
        playerChoiceHTML + resultPlayAgain(winner) + houseWeaponHTML
      );
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

document
  .querySelector("#user-score")
  .addEventListener("click", () => identify_winner());

let winner = "User";
function identify_winner() {
  let userScore = parseInt(document.querySelector("#user-score").innerHTML);
  let houseScore = parseInt(document.querySelector("#house-score").innerHTML);

  if (winner === "User") {
    userScore++;
    document.querySelector("#user-score").innerHTML = userScore;
  } else if (winner === "House") {
    houseScore++;
    document.querySelector("#house-score").innerHTML = houseScore;
  } else {
  }
}
