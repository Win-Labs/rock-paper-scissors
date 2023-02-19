"use strict";
import { weaponView, choiceView } from "./view/views.js";
import { weapons, rules } from "./model/models.js";

import {
  titleScore,
  arenaWrapperHTML,
  userScore,
  houseScore,
  backdrop,
  rulesPopup,
  btnRules,
  btnClose,
} from "./view/views.js";

[backdrop, btnRules, btnClose].forEach((element) =>
  element.addEventListener("click", () => {
    backdrop.classList.toggle("hidden");
    rulesPopup.classList.toggle("hidden");
  })
);

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

      let playerChoiceHTML = choiceView(weaponTitle);

      const houseWeaponHTML =
        winner === "house"
          ? choiceView(houseWeaponTitle, true, true)
          : choiceView(houseWeaponTitle, false, true);
      arena.remove();

      arenaWrapper.insertAdjacentHTML(
        "beforeend",
        playerChoiceHTML +
          `
            <div class="container choice">
              <p class="choice-title">THE HOUSE PICKED</p>
              <div class="placeholder"></div>
            </div>
          `
      );

      playerChoiceHTML =
        winner === "player"
          ? choiceView(weaponTitle, true)
          : choiceView(weaponTitle);

      setTimeout(() => {
        document.querySelector(".placeholder").closest(".choice").remove();
        arenaWrapper.insertAdjacentHTML(
          "beforeend",
          resultPlayAgain(winner) + houseWeaponHTML
        );
        document
          .querySelector(".btn-play-again")
          .addEventListener("click", () => {
            arenaWrapper.remove();
            init();
          });
      }, 1000);
    })
  );
};

init();
