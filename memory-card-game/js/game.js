import { cards } from "./cards.js";
const gameBoard = document.querySelector(".game__main");
const levelContent = document.querySelector(".game__level span");
const timerContent = document.querySelector(".game__timer span");
const movesContent = document.querySelector(".game__moves span");
const nextLevelBtn = document.querySelector(".next__btn");
let firstCard = false;
let secondCard = false;
let pairs = 0;
let cardArrLength = 0;

console.log(cards);

export class Game {
  constructor(level) {
    this.level = level;
    this.cardArrLength = 0;
  }
  #createCards = 0;
  init() {
    gameBoard.innerHTML = "";
    nextLevelBtn.classList.add("hidden");
    console.log(this.level);
    levelContent.innerHTML = `${this.level} / ${cards.length / 2}`;
    this.createCards(this.level);
  }

  createCards(level) {
    const cardQty = level * 2;
    let cardArr = cards.slice(0, cardQty).concat(cards.slice(0, cardQty));
    cardArr = cardArr.sort(() => Math.random() - 0.5);
    this.cardHtml(cardArr);
    cardArrLength = cardArr.length;
    cardArrLength <= 16
      ? (gameBoard.style.gridTemplateColumns = "repeat(4, 100px)")
      : cardArrLength <= 24
      ? (gameBoard.style.gridTemplateColumns = "repeat(6, 100px)")
      : (gameBoard.style.gridTemplateColumns = "repeat(8, 100px)");
  }

  cardHtml(arr) {
    console.log(arr);
    arr.forEach((el) =>
      gameBoard.insertAdjacentHTML(
        "beforeend",
        `<div class="card">
            <div class="card__back">?</div>
            <div class="card__face"><img src="./icons/${el}"></div>
          </div>`
      )
    );
  }
  addHandlerCardClick(el, arr) {
    let card = el.target.closest(".card");

    if (!card.classList.contains("matched")) {
      card.classList.add("flipped");
      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        if (
          firstCard.querySelector("img").getAttribute("src") ===
          secondCard.querySelector("img").getAttribute("src")
        ) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          pairs++;
          firstCard = secondCard = false;

          if (pairs === cardArrLength / 2) {
            nextLevelBtn.classList.remove("hidden");
            pairs = 0;
            cardArrLength = 0;
          }
        } else {
          let delay = setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard = false;
          }, 500);
        }
      }
    }
  }
}
