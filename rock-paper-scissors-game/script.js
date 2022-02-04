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
  console.log(userStep);
};

const toUppCaseLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const textContent = (winCh, win, verb, loseCh, lose, congrat) => {
  resultText.insertAdjacentHTML(
    "afterbegin",
    `<span>${toUppCaseLetter(
      winCh
    )}</span> <sub>(${win})</sub> ${verb} <span>${loseCh}</span> <sub>(${lose})</sub>. ${congrat}!`
  );
};

const changeUserDivs = (win, verb, lose) => {
  textContent(win, "user", verb, lose, "comp", "You win");
  userScore += 1;
  userScoreText.textContent = userScore;
  console.log(userScore);
  return userScore;
};
const changeCompDivs = (win, verb, lose) => {
  textContent(win, "comp", verb, lose, "user", "Computer wins");
  compScore += 1;
  compScoreText.textContent = compScore;
  console.log(compScore);
  return compScore;
};

const compare = (userCh, compCh) => {
  resultText.innerHTML = "";

  if (userCh === compCh) {
    resultText.textContent = "It's a tie!";
  } else {
    if (userCh === "rock") {
      compCh == "scissors"
        ? changeUserDivs(userCh, "bitts", compCh)
        : changeCompDivs(compCh, "covers", userCh);
    }
    if (userCh === "paper") {
      compCh == "rock"
        ? changeUserDivs(userCh, "covers", compCh)
        : changeCompDivs(compCh, "cuts", userCh);
    }
    if (userCh === "scissors") {
      compCh == "paper"
        ? changeUserDivs(userCh, "cuts", compCh)
        : changeCompDivs(compCh, "bitts", userCh);
    }
  }
  console.log("after", userScore, compScore);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    const userChoise = btn.id;
    changeUser();
    
    sleep(1500).then(() => {
      compare(userChoise, compChoiseFunction());

      if (userScore === 3 || compScore === 3) {
        resultText.textContent = `Game over. ${
          compScore === 3 ? "Computer wins the game" : "You win the game"
        }!!!`;
        btns.forEach((btn) => (btn.disabled = true));
        btns.forEach((btn) => btn.classList.add("hide"));
        movementText.innerHTML = "";
      } else {
        changeUser();
      }
    });
  })
);
