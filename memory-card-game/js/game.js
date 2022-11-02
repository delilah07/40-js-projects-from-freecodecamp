import { cards } from "./cards.js";
const gameBoard = document.querySelector(".game__main");
const levelContent = document.querySelector(".game__level span");
const timerContent = document.querySelector(".game__timer span");
const movesContent = document.querySelector(".game__moves span");
const nextLevelBtn = document.querySelector(".next__btn");
let firstCard = false;
let secondCard = false;
let isBoardLock = false;
let pairs = 0;
let cardArrLength = 0;

export class Game {
  constructor(level) {
    this.level = level;
    this.cardArrLength = 0;
  }
  #createCards = 0;
  init() {
    gameBoard.innerHTML = "";
    nextLevelBtn.classList.add("hidden");
    levelContent.innerHTML = `${this.level} / ${cards.length / 2}`;
    this.createCards(this.level);
  }

  createCards(level) {
    const cardQty = level * 2;
    let cardArr = cards.slice(0, cardQty).concat(cards.slice(0, cardQty));
    cardArr = cardArr.sort(() => Math.random() - 0.5);
    this.cardHtml(cardArr);
    cardArrLength = cardArr.length;
    this.gameBoardCSS(cardArrLength);
  }
  gameBoardCSS(el) {
    switch (el) {
      case 4:
      case 8:
      case 12:
      case 16:
        gameBoard.style.gridTemplateColumns = "repeat(4, 100px)";
        break;
      case 20:
        gameBoard.style.gridTemplateColumns = "repeat(5, 100px)";
        break;
      case 24:
        gameBoard.style.gridTemplateColumns = "repeat(6, 100px)";
        break;
      case 28:
        gameBoard.style.gridTemplateColumns = "repeat(7, 100px)";
        break;
      case 32:
        gameBoard.style.gridTemplateColumns = "repeat(8, 100px)";
        break;
      default:
        gameBoard.style.gridTemplateColumns = "repeat(10, 60px)";
        break;
    }
  }

  cardHtml(arr) {
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
  addHandlerCardClick(el) {
    let card = el.target.closest(".card");

    if (isBoardLock) return;
    if (!card.classList.contains("matched")) {
      card.classList.add("flipped");
      if (card === firstCard) return;
      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        isBoardLock = true;
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
          isBoardLock = false;
        } else {
          let delay = setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard = false;
            secondCard = false;
            isBoardLock = false;
          }, 500);
        }
      }
    }
  }
}
