"use strict";

const startGame = document.querySelector(".start .button");
const hardGame = document.querySelector(".hard .button");
const resetGame = document.querySelector(".reset .button");
const inputStart = document.querySelector("#start-btn");
const inputHard = document.querySelector("#hard-btn");
const colorBtn = document.querySelectorAll(".outer-circle .color-btn");
const scoreLabel = document.querySelector(".score");

const maxScore = 3;

const colors = ["green", "red", "yellow", "blue"];
let userOrder = false;
let game = false;
let score = 0;
let stepArr = [];
let userArr = [];
let gameType = "simple";
const sound = {
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};
inputHard.disabled = true;

const initPar = () => {
  userOrder = false;
  score = 0;
  stepArr = [];
  userArr = [];
  scoreLabel.innerHTML = score < 10 ? `0${score}` : score;
};

const addRandomColor = () => {
  const randomNum = Math.trunc(Math.random() * colors.length);
  stepArr.push(colors[randomNum]);
};

const oneMove = (move) => {
  const btn = document.querySelector(`#${move}`);
  btn.classList.add("active");
  sound[move].play();
  setTimeout(function () {
    btn.classList.remove("active");
  }, 300);
};
const showMoves = (arr) => {
  arr.forEach((element, i) => {
    setTimeout(function () {
      oneMove(element);
    }, 1000 * (i + 1));
  });
};

const checkArrays = (arr1, arr2) => {
  if (arr1.length === arr2.length) {
    if (arr1.every((el, i) => el === arr2[i])) {
      score++;
    } else {
      gameType === "simple" ? score-- : (score = 0);
    }
    scoreLabel.innerHTML = score < 10 && score >= 0 ? `0${score}` : score;
    userArr = [];
    if (score < maxScore) level();
    else {
      scoreLabel.classList.add("win");
    }
  }
};
const userMoves = (arr) => {
  colorBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      oneMove(btn.id);
      arr.push(btn.id);
      console.log(userArr);
      checkArrays(stepArr, userArr);
    })
  );
};

const level = () => {
  addRandomColor();
  showMoves(stepArr);
  console.log(stepArr);
  userOrder = !userOrder;
  if (userOrder) userMoves(userArr);
  userOrder = !userOrder;
};

const initGame = () => {
  inputHard.disabled = false;
  scoreLabel.classList.add("active");
  level();
};

// const stopGame = () => {
//   scoreLabel.classList.remove("active");
//   initGame();
//   initPar();
//   scoreLabel.innerHTML = score;
// };
const toggleClass = (div, divClass) => {
  console.log(this);
  div.classList.add(divClass);
  setTimeout(() => {
    div.classList.remove(divClass);
  }, 1000);
};

startGame.addEventListener("click", () => {
  game = !game;
  console.log("game:" + game);

  game ? initGame() : window.location.reload(true);

  resetGame.addEventListener("click", function () {
    scoreLabel.classList.remove("win");
    initPar();
    toggleClass(resetGame, "active");
    level();
  });

  hardGame.addEventListener("click", () => {
    !inputHard.checked ? (gameType = "hard") : (gameType = "simple");
    console.log(gameType);
    initPar();
    level();
  });
});
