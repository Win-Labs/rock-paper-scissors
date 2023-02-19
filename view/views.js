export const titleScore = document.querySelector(".title-score");
export const userScore = document.querySelector("#user-score");
export const houseScore = document.querySelector("#house-score");
export const backdrop = document.querySelector(".bg-model");
export const rulesPopup = document.querySelector(".rules-popup");
export const btnRules = document.querySelector(".rules-button");
export const btnClose = document.querySelector(".cross-img");

export const arenaWrapperHTML = `<div class="container arena-wrapper"></div>`;
export const weaponView = (classes, weapon) => `
<div class="outer-circle ${classes["outer-circle"] || ""}">
  <div class="thickness-${weapon} thickness-${classes.thickness || ""}">
    <div class="pulse start ${classes.pulse || ""}">
      <div class="inner-circle thickness-inner ${
        classes["inner-circle"] || ""
      }">
        <img class="icon ${
          classes.icon || ""
        }" src="./assets/images/${weapon}.svg" alt="${weapon}" />
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
      "icon": "i-big",
      "thickness": `${weapon}-big`,
    },
    weapon
  )}
</div>
`;
