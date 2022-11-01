import { cards as cardsData } from "./cards.js";
import { Game } from "./game.js";

const startBtn = document.querySelector(".start__btn");
const nextLevelBtn = document.querySelector(".next__btn");

const gameWrapper = document.querySelector(".game__wrapper");
const LevelQty = cardsData.length - 1;
let level = 1;

const game = new Game(level);

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  gameWrapper.classList.remove("hidden");

  game.init();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", game.addHandlerCardClick);
  });
});
