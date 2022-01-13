let count = 0;
let inc = 1;
const countNum = document.querySelector(".number");
const inputNum = document.querySelector("input");
const btns = document.querySelectorAll(".btn");
const numList = document.querySelector("#numbers__list");
const savedList = document.querySelector(".saved__numbers");

const numListArr = [];

const displayBlock = (arr) => {
  arr.length
    ? (savedList.style.display = "block")
    : (savedList.style.display = "none");
};

const addToNumList = (num) => {
  numListArr.push(num);
  const li = document.createElement("li");
  li.textContent = `${num}`;
  numList.append(li);
  displayBlock(numListArr);
};

const cleaneNumList = () => {
  numList.innerHTML = "";
  setTimeout(() => {
    numListArr.length = 0;
    displayBlock(numListArr);
  }, 500);
};

inputNum.addEventListener("input", () => {
  inc = +inputNum.value;
});

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (e.target.id === "decrease") count -= inc;
    if (e.target.id === "increase") count += inc;
    if (e.target.id === "reset") count = 0;
    if (e.target.id === "save") addToNumList(count);
    if (e.target.id === "delete") cleaneNumList();

    count > 0
      ? (countNum.style.color = "green")
      : count < 0
      ? (countNum.style.color = "red")
      : (countNum.style.color = "black");

    countNum.textContent = count;
  });
});
