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
    (winner === "player" && userScore.textContent++) || (winner === "house" && houseScore.textContent++);
    return resultView(winner);
};

whenClicked([backdrop, btnRules, btnClose], closeRules);

const determineWinner = (player1, player2) => {
    return (rules[player1].winsOver === player2 && "player") || (player1 === player2 && "none") || "house";
};

const init = () => {
    // Prepare the arena with choices
    addAfter(titleScore, arenaWrapperHTML);
    const arenaWrapper = select(".arena-wrapper");
    addInside(arenaWrapper, arenaHTML);
    const arena = select(".arena");

    // Add all the weapons to the screen for the player to choose
    weapons.forEach(weapon => addInside(arena, weaponView({ "outer-circle": weapon }, weapon)));
    selectMany(".outer-circle").forEach(weapon =>
        whenClicked(weapon, () => {
            // Choice is made - weapon is chosen
            const weaponTitle = weapon.classList[1];
            const houseWeaponTitle = weapons[Math.floor(Math.random() * weapons.length)];
            // Check who wins
            const winner = determineWinner(weaponTitle, houseWeaponTitle);
            // Prepare DOM elements for the pending state
            let playerChoiceHTML = choiceView(weaponTitle);
            const houseWeaponHTML =
                winner === "house"
                    ? choiceView(houseWeaponTitle, true, true)
                    : choiceView(houseWeaponTitle, false, true);
            // Remove the screen with 3 weapon choices
            destroy(arena);
            // Display pending state
            addInside(arenaWrapper, playerChoiceHTML + placeholderView);
            // Modify player's element in case he wins
            if (winner === "player") playerChoiceHTML = choiceView(weaponTitle, true);
            // Wait for the house to make a choice
            setTimeout(() => {
                // Replace the placeholder with the house's DOM element
                select(".placeholder").closest(".choice").remove();
                addInside(arenaWrapper, resultPlayAgain(winner) + houseWeaponHTML);
                // Enable game restart when 'Play again' button is pressed
                whenClicked(select(".btn-play-again"), () => {
                    destroy(arenaWrapper);
                    init();
                });
            }, 1000);
        })
    );
};

init();
