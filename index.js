"use strict";

const weapons = [
  {
    title: "paper",
    img: "./assets/images/paper.svg",
  },
  {
    title: "rock",
    img: "./assets/images/rock.svg",
  },
  {
    title: "scissors",
    img: "./assets/images/scissors.svg",
  },
];

weapons.forEach((weapon) =>
  document
    .querySelector(".container")
    .insertAdjacentHTML(
      "beforeend",
      `<div class="outer-circle ${weapon.title}"><div class="inner-circle"><img src=${weapon.img} alt=${weapon.title}/></div></div>`
    )
);
