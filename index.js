"use strict";
import {
    weaponView,
    choiceView,
    placeholderView,
    titleScore,
    arenaWrapperHTML,
    playerScore,
    opponentScore,
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
import { weapons } from "./model/models.js";
const gameSocket = new WebSocket("ws://127.0.0.1:3001");

const closeRules = () => {
    backdrop.classList.toggle("hidden");
    rulesPopup.classList.toggle("hidden");
};

const resultPlayAgain = winner => {
    (winner === "player" && playerScore.textContent++) || (winner === "opponent" && opponentScore.textContent++);
    return resultView(winner);
};

whenClicked([backdrop, btnRules, btnClose], closeRules);

// Prepare the arena with choices
addAfter(titleScore, arenaWrapperHTML);
const arenaWrapper = select(".arena-wrapper");
addInside(arenaWrapper, arenaHTML);
const arena = select(".arena");
let winner;

// Add all the weapons to the screen for the player to choose
weapons.forEach(weapon => addInside(arena, weaponView({ "outer-circle": weapon }, weapon)));
selectMany(".outer-circle").forEach(weapon =>
    whenClicked(weapon, async () => {
        // Choice is made - weapon is chosen
        const playerChoiceStr = weapon.classList[1];
        gameSocket.send(playerChoiceStr);
        const opponentChoiceStr = weapons[Math.floor(Math.random() * weapons.length)];
        gameSocket.send(opponentChoiceStr);
        // Remove the screen with 3 weapon choices
        destroy(arena);
        // Prepare DOM elements for the pending state
        let playerChoiceHTML = choiceView(playerChoiceStr);
        let opponentChoiceHTML = placeholderView;
        // Display pending state
        addInside(arenaWrapper, playerChoiceHTML + placeholderView);
        gameSocket.onmessage = async event => {
            winner = await event.data;
            // Modify players' elements in case he wins
            if (winner === "player") playerChoiceHTML = choiceView(playerChoiceStr, true);
            if (winner === "opponent") opponentChoiceHTML = choiceView(opponentChoiceStr, true, true);
            // Replace the placeholder with the opponent's DOM element
            select(".placeholder").closest(".choice").remove();
            addInside(arenaWrapper, resultPlayAgain(winner) + opponentChoiceHTML);
            // Enable game restart when 'Play again' button is pressed
            whenClicked(select(".btn-play-again"), () => {
                destroy(arenaWrapper);
                init();
            });
        };
    })
);
