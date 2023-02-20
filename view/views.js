export const select = element => {
    return document.querySelector(element);
};

export const selectMany = element => {
    return document.querySelectorAll(element);
};

export const whenClicked = (elements, handler) =>
    elements.length
        ? elements.forEach(element => element.addEventListener("click", handler))
        : elements.addEventListener("click", handler);

export const addInside = (target, src) => {
    target.insertAdjacentHTML("beforeend", src);
};

export const addAfter = (target, src) => {
    target.insertAdjacentHTML("afterend", src);
};
export const destroy = target => {
    target.remove();
};

export const weaponView = (classes, weapon) => `
  <div class="outer-circle ${classes["outer-circle"] || ""}">
    <div class="thickness-${weapon} thickness-${classes.thickness || ""}">
      <div class="pulse start ${classes.pulse || ""}">
        <div class="inner-circle thickness-inner ${classes["inner-circle"] || ""}">
          <img class="icon ${classes.icon || ""}" src="./assets/images/${weapon}.svg" alt="${weapon}" />
        </div>
      </div>
    </div>
  </div>
  `;

export const choiceView = (weapon, win, house) => `
  <div class="container choice">
    <p class="choice-title">${house ? "THE HOUSE" : "YOU"} PICKED</p>
    ${weaponView(
        {
            "outer-circle": `${weapon}-chosen game-over ${win && "win"} oc-big`,
            "inner-circle": "ic-big inner-circle-thickness-big",
            icon: "i-big",
            thickness: `${weapon}-big`,
        },
        weapon
    )}
  </div>
  `;

export const placeholderView = `
  <div class="container choice">
    <p class="choice-title">THE HOUSE PICKED</p>
    <div class="placeholder"></div>
  </div>
  `;

export const resultView = winner => {
    return `
    <div class="container result-play-again">
      <p class="result">${
          (winner === "player" && "YOU WIN") || (winner === "house" && "YOU LOSE") || (winner === "none" && "DRAW")
      } 
      </p>
      <button class="btn-play-again">PLAY AGAIN</button>
    </div>
`;
};

export const titleScore = select(".title-score");
export const userScore = select("#user-score");
export const houseScore = select("#house-score");
export const backdrop = select(".bg-model");
export const rulesPopup = select(".rules-popup");
export const btnRules = select(".rules-button");
export const btnClose = select(".cross-img");
export const arenaWrapperHTML = `<div class="container arena-wrapper"></div>`;
export const arenaHTML = `
  <div class="container arena">
    <img src="./assets/images/triangle.svg" alt="triangle" />
  </div>
  `;
