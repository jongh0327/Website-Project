const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const erase = document.getElementById("jsErase");
const palette = document.getElementById("palette");
const reset = document.getElementById("jsReset");

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;
// 기본 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

background = "white";

let painting = false;
let filling = false;

stopPainting = () => {
  painting = false;
};

onMouseMove = e => {
  console.log(e);
  
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

onTouchMove = e => {
  console.log(e);

  const x = e.touches[0].clientX-canvas.getBoundingClientRect().left;
  const y = e.touches[0].clientY-canvas.getBoundingClientRect().top;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

startPainting = () => {
  painting = true;
};

startPainting_1 = () => {
  painting = true;
  ctx.beginPath();
};

handleCanvasClick = () => {
  ctx.fillStyle="white"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background = ctx.fillStyle;
};

handleCM = e => {
  e.preventDefault();
};

handleSaveClick = () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "그림판";
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("touchmove",onTouchMove)
  canvas.addEventListener('touchend',stopPainting);
  canvas.addEventListener("touchstart",startPainting_1);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}

changeColor = e => {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

handleRangeChange = e => {
  const brushWidth = e.target.value;
  ctx.lineWidth = brushWidth;
};

Array.from(colors).forEach(color =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

handleModeClick = e => {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

handleEraseClick = e => {
  painting = true;
  ctx.strokeStyle = background;
};

changeColorByPalette = e => {
  const color = e.target.value;
  ctx.strokeStyle = "#" + color;
  ctx.fillStyle = "#" + color;
};

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (erase) {
  erase.addEventListener("click", handleEraseClick);
}

if (palette) {
  palette.addEventListener("blur", changeColorByPalette);
}

if (reset) {
  reset.addEventListener("click", handleCanvasClick);
}