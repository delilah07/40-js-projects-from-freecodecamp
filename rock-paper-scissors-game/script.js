let userScore = 0;
let compScore = 0;
const choiseArr = ["rock", "paper", "scissors"];
let userStep = true;

const userScoreText = document.querySelector(".user__score");
const compScoreText = document.querySelector(".comp__score");
const btns = document.querySelectorAll(".choises__wrapper button");
const stepDivs = document.querySelectorAll(".score__wrapper .step");
const userDivs = document.querySelector(".score__wrapper .user");
const compDivs = document.querySelector(".score__wrapper .comp");
const movementText = document.querySelector(".movement");
const resultText = document.querySelector(".result__text");

const compChoiseFunction = () => {
  const randomNum = Math.floor(Math.random() * choiseArr.length);
  const compChoise = choiseArr.at(randomNum);
  return compChoise;
};

const changeUser = () => {
  userStep ? (userStep = false) : (userStep = true);
  stepDivs.forEach((div) => div.classList.remove("active"));
  userStep
    ? userDivs.classList.add("active")
    : compDivs.classList.add("active");
  movementText.textContent = userStep
    ? "Make your move"
    : "Computer makes move";
  btns.forEach((btn) => (btn.disabled = userStep ? false : true));
  btns.forEach((btn) =>
    userStep ? btn.classList.remove("hide") : btn.classList.add("hide")
  );
};

const compare = (userCh, compCh) => {
  console.log("-----", userCh, compCh);
  resultText.innerHTML = "";
  if (userCh === compCh) {
    console.log("same");
    resultText.textContent = "It's a tie!";
  } else {
    if (userCh === "rock") {
      if (compCh == "scissors") {
        resultText.insertAdjacentHTML(
          "afterbegin",
          `
    <span>${toUppCaseLetter(
      userCh
    )}</span> <sub>(user)</sub> bitts <span>${compCh}</span> <sub>(comp)</sub>. You win!`
        );
        console.log("win");
        userScore++;
        userScoreText.textContent = userScore;
      } else {
        resultText.insertAdjacentHTML(
          "afterbegin",
          `
    <span>${toUppCaseLetter(
      compCh
    )}</span> <sub>(comp)</sub> covers <span>${userCh}</span> <sub>(user)</sub>. Computer wins!`
        );
        compScore++;
        console.log("lose");
        compScoreText.textContent = compScore;
      }
    }
    if (userCh === "paper") {
      if (compCh == "rock") {
        resultText.insertAdjacentHTML(
          "afterbegin",
          `
      <span>${toUppCaseLetter(
        userCh
      )}</span> <sub>(user)</sub> covers <span>${compCh}</span> <sub>(comp)</sub>. You win!`
        );
        userScore++;
        console.log("win");
        userScoreText.textContent = userScore;
      } else {
        resultText.insertAdjacentHTML(
          "afterbegin",
          `
      <span>${toUppCaseLetter(
        compCh
      )}</span> <sub>(comp)</sub> cuts <span>${userCh}</span> <sub>(user)</sub>. Computer wins!`
        );
        compScore++;
        compScoreText.textContent = compScore;
        console.log("lose");
      }
    }
    if (userCh === "scissors") {
      if (compCh == "paper") {
        resultText.insertAdjacentHTML(
          "afterbegin",
          `
      <span>${toUppCaseLetter(
        userCh
      )}</span> <sub>(user)</sub> cuts <span>${compCh}</span> <sub>(comp)</sub>. You win!`
        );
        userScore++;
        console.log("win");
        userScoreText.textContent = userScore;
      } else {
        resultText.insertAdjacentHTML(
          "afterbegin",
          `
      <span>${toUppCaseLetter(
        compCh
      )}</span> <sub>(comp)</sub> bitts <span>${userCh}</span> <sub>(user)</sub>. Computer wins!`
        );
        compScore++;
        console.log("lose");
        compScoreText.textContent = compScore;
      }
    }
  }
};
const toUppCaseLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    const userChoise = btn.id;
    changeUser();

    compare(userChoise, compChoiseFunction());
    sleep(1000).then(() => {
      changeUser();
    });
  })
);
