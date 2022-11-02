import { cards as cardsData } from "./cards.js";
import { Game } from "./game.js";

const startBtn = document.querySelector(".start__btn");
const nextLevelBtn = document.querySelector(".next__btn");
const restartBtn = document.querySelector(".restart__btn");

const gameWrapper = document.querySelector(".game__wrapper");
const gameEndWrapper = document.querySelector(".game__end");
const LevelQty = cardsData.length - 1;
let level = 1;

const initLevel = (level) => {
  if (level <= cardsData.length / 2) {
    const game = new Game(level);
    game.init();
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", game.addHandlerCardClick);
    });
  } else {
    gameEndWrapper.classList.remove("hidden");
    gameWrapper.classList.add("hidden");
  }
};

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  gameWrapper.classList.remove("hidden");
  initLevel(level);
});

nextLevelBtn.addEventListener("click", () => {
  level++;
  initLevel(level);
});
restartBtn.addEventListener("click", () => {
  level = 1;
  gameEndWrapper.classList.add("hidden");
  gameWrapper.classList.remove("hidden");
  initLevel(level);
});
