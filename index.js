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
  <div class="outer-circle ${classes["outer-circle"] || ""}">
    <div class="thickness-${weapon}">
      <div class="pulse start ${classes.pulse || ""}">
        <div class="inner-circle ${classes["inner-circle"] || ""}">
          <img class="icon ${
            classes.icon || ""
          }" src="./assets/images/${weapon}.svg" alt="${weapon}" />
        </div>
      </div>
    </div>
  </div>
`;

  const choiceView = (weapon, win, house) => `
  <div class="container choice">
    <p class="choice-title">${house ? "HOUSE" : "YOU"} PICKED</p>
    ${weaponView(
      {
        "outer-circle": `${weapon}-chosen game-over ${win && "win"} oc-big`,
        "inner-circle": "ic-big",
        "icon": "i-big",
      },
      weapon
    )}
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
      houseScore.innerHTML = houseScoreVal;
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
    arena.insertAdjacentHTML(
      "afterbegin",
      weaponView({ "outer-circle": weapon }, weapon)
    )
  );

  document.querySelectorAll(".outer-circle").forEach((weapon) =>
    weapon.addEventListener("click", () => {
      const weaponTitle = weapon.classList[1];
      const houseWeaponTitle =
        weapons[Math.floor(Math.random() * weapons.length)];
      const winner =
        (rules[weaponTitle].winsOver === houseWeaponTitle && "player") ||
        (weaponTitle === houseWeaponTitle && "none") ||
        "house";

      const playerChoiceHTML =
        winner === "player"
          ? choiceView(weaponTitle, true)
          : choiceView(weaponTitle);

      const houseWeaponHTML =
        winner === "house"
          ? choiceView(houseWeaponTitle, true, true)
          : choiceView(houseWeaponTitle, false, true);
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
