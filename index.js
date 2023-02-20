"use strict";
import {
    weaponView,
    choiceView,
    placeholderView,
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
    destroy,
    addAfter,
    addInside,
    select,
    selectMany,
} from "./view/views.js";
import { weapons, rules } from "./model/models.js";

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

const determineWinner = (player1, player2) => {
    return (rules[player1].winsOver === player2 && "player") || (player1 === player2 && "none") || "house";
};

const init = () => {
    addAfter(titleScore, arenaWrapperHTML);
    const arenaWrapper = select(".arena-wrapper");
    addInside(arenaWrapper, arenaHTML);
    const arena = select(".arena");

    weapons.forEach(weapon => addInside(arena, weaponView({ "outer-circle": weapon }, weapon)));
    selectMany(".outer-circle").forEach(weapon =>
        whenClicked(weapon, () => {
            const weaponTitle = weapon.classList[1];
            const houseWeaponTitle = weapons[Math.floor(Math.random() * weapons.length)];
            const winner = determineWinner(weaponTitle, houseWeaponTitle);
            let playerChoiceHTML = choiceView(weaponTitle);
            const houseWeaponHTML =
                winner === "house"
                    ? choiceView(houseWeaponTitle, true, true)
                    : choiceView(houseWeaponTitle, false, true);

            destroy(arena);
            addInside(arenaWrapper, playerChoiceHTML + placeholderView);

            if (winner === "player") playerChoiceHTML = choiceView(weaponTitle, true);

            setTimeout(() => {
                select(".placeholder").closest(".choice").remove();
                addInside(arenaWrapper, resultPlayAgain(winner) + houseWeaponHTML);
                whenClicked(select(".btn-play-again"), () => {
                    destroy(arenaWrapper);
                    init();
                });
            }, 1000);
        })
    );
};

init();
