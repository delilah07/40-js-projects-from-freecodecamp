import { colorArr as colorSimpleArr } from "./color-array.js";

let colorFormat = "simple";
let bgColor;
const colorSpan = document.querySelector("#color");
const changeColorBtn = document.querySelector("#btn");
const colorFormatBtn = document.querySelectorAll("nav li");

// generate color based on color format
// simple color
const generateSimpleColor = (arr) => {
  const randomNumber = Math.floor(Math.random() * (arr.length - 1));
  const randomColor = arr[randomNumber];
  return randomColor;
};
// hex color
const generateHexColor = () => {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  const hexString = `#${randomHex}`;
  return hexString;
};
// rgb color
const generateRgbColor = () => {
  const randomGrbArr = [...Array(3)].map(() => Math.floor(Math.random() * 256));
  const rgbString = `rgb( ${randomGrbArr[0]}, ${randomGrbArr[1]}, ${randomGrbArr[2]})`;
  return rgbString;
};

// change bg color
const changeCss = () => {
  if (colorFormat === "simple") {
    bgColor = generateSimpleColor(colorSimpleArr);
  }
  if (colorFormat === "hex") {
    bgColor = generateHexColor();
  }
  if (colorFormat === "rgb") {
    bgColor = generateRgbColor();
  }

  document.querySelector("body").style.backgroundColor = bgColor;
  colorSpan.innerHTML = bgColor;
};
changeCss(colorSimpleArr);

// change color on button click
changeColorBtn.addEventListener("click", changeCss);

// change format color
colorFormatBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    colorFormat = e.target.id;
    colorFormatBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
    changeCss();
  });
});
