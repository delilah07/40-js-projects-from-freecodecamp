let userScore = 0;
let compScore = 0;

const userScoreText = document.querySelector(".user__score");
const compScoreText = document.querySelector(".comp__score");
const btns = document.querySelectorAll(".choises__wrapper button");
const stepDivs = document.querySelectorAll(".score__wrappe .step");
const movementText = document.querySelector(".movement");

const userChoiseFunction = () => {
  const choise = btn.id;
};

btns.forEach((btn) => btn.addEventListener("click", userChoiseFunction));
