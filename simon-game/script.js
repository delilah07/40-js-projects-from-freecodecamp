"use strict";

const startGame = document.querySelector(".start .button");
const hardGame = document.querySelector(".hard .button");
const colorBtn = document.querySelectorAll(".outer-circle .color-btn");
const scoreLabel = document.querySelector(".score");

const maxScore = 5;

const colors = ["green", "red", "yellow", "blue"];
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

const addRandomColor = () => {
  const randomNum = Math.trunc(Math.random() * colors.length);
  stepArr.push(colors[randomNum]);
  console.log(stepArr);
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
      console.log(score);
    } else {
      gameType === "simple" ? score-- : (score = 0);
    }
    scoreLabel.innerHTML = score < 10 ? `0${score}` : score;
    userArr = [];
    score < maxScore ? level() : scoreLabel.classList.add("win");
  }
};
const userMoves = (arr) => {
  colorBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      oneMove(btn.id);
      arr.push(btn.id);
      checkArrays(stepArr, userArr);
    })
  );
};

const level = () => {
  addRandomColor();
  showMoves(stepArr);
  userMoves(userArr);
};

const initGame = () => {
  scoreLabel.classList.add("active");
  level();
};

const stopGame = () => {
  scoreLabel.classList.remove("active");
  score = 0;
  stepArr = [];
  userArr = [];
  gameType = "simple";
  //   button.disabled = false;
};

startGame.addEventListener("click", () => {
  const inputStart = document.querySelector("#start-btn");
  !inputStart.checked ? initGame() : stopGame();
});
