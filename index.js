"use strict";
import { weaponView, choiceView, placeholderView } from "./view/views.js";
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
    arenaHTML,
    whenClicked,
    resultView,
} from "./view/views.js";

const closeRules = () => {
    backdrop.classList.toggle("hidden");
    rulesPopup.classList.toggle("hidden");
};

const resultPlayAgain = winner => {
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

    return resultView(winner);
};

whenClicked([backdrop, btnRules, btnClose], closeRules);

const init = () => {
    titleScore.insertAdjacentHTML("afterend", arenaWrapperHTML);
    const arenaWrapper = document.querySelector(".arena-wrapper");

    arenaWrapper.insertAdjacentHTML("afterbegin", arenaHTML);

    const arena = document.querySelector(".arena");

    weapons.forEach(weapon => arena.insertAdjacentHTML("afterbegin", weaponView({ "outer-circle": weapon }, weapon)));

    document.querySelectorAll(".outer-circle").forEach(weapon =>
        weapon.addEventListener("click", () => {
            const weaponTitle = weapon.classList[1];
            const houseWeaponTitle = weapons[Math.floor(Math.random() * weapons.length)];
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

            arenaWrapper.insertAdjacentHTML("beforeend", playerChoiceHTML + placeholderView);

            playerChoiceHTML = winner === "player" ? choiceView(weaponTitle, true) : choiceView(weaponTitle);

            setTimeout(() => {
                document.querySelector(".placeholder").closest(".choice").remove();
                arenaWrapper.insertAdjacentHTML("beforeend", resultPlayAgain(winner) + houseWeaponHTML);
                document.querySelector(".btn-play-again").addEventListener("click", () => {
                    arenaWrapper.remove();
                    init();
                });
            }, 1000);
        })
    );
};

init();
