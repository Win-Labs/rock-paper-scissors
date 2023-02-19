"use strict";

const userScore = document.querySelector("#user-score");
const houseScore = document.querySelector("#house-score");
const backdrop = document.querySelector(".bg-model");
const rulesPopup = document.querySelector(".rules-popup");
const btnRules = document.querySelector(".rules-button");
const btnClose = document.querySelector(".cross-img");

[backdrop, btnRules, btnClose].forEach((element) =>
  element.addEventListener("click", () => {
    backdrop.classList.toggle("hidden");
    rulesPopup.classList.toggle("hidden");
  })
);

const weapons = ["paper", "scissors", "rock"];
const titleScore = document.querySelector(".title-score");
const arenaWrapperHTML = `<div class="container arena-wrapper"></div>`;

const init = () => {
  titleScore.insertAdjacentHTML("afterend", arenaWrapperHTML);
  const arenaWrapper = document.querySelector(".arena-wrapper");
  const arenaHTML = `
    <div class="container arena">
      <img src="./assets/images/triangle.svg" alt="triangle" />
    </div>
`;

  arenaWrapper.insertAdjacentHTML("afterbegin", arenaHTML);

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

  const resultPlayAgain = (winner) => {
    let userScoreVal = parseInt(userScore.innerHTML);
    let houseScoreVal = parseInt(houseScore.innerHTML);

    if (winner === "player") {
      userScoreVal++;
      userScore.innerHTML = userScoreVal;
    }

    if (winner === "house") {
      houseScoreVal++;
      houseScoreVal.innerHTML = houseScoreVal;
    }

    return `
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
  };

  document
    .querySelector("#user-score")
    .addEventListener("click", () => identify_winner());

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

      arenaWrapper.insertAdjacentHTML(
        "beforeend",
        playerChoiceHTML + resultPlayAgain(winner) + houseWeaponHTML
      );
      document
        .querySelector(".btn-play-again")
        .addEventListener("click", () => {
          arenaWrapper.remove();
          init();
        });
    })
  );
};

init();
