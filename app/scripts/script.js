const totalTime$ = document.querySelector(".total-time__content");
const selectionTime$ = document.querySelector(".selection-time__content");
const points$ = document.querySelector(".points__content");
const startBtn$ = document.querySelector(".start");
const endBtn$ = document.querySelector(".finish");

let totalTimer;

let points = 0;
let totalTime = 0;
let selectionTime = 0;

const BUTTON_STATE = {
  start: "start",
  wait: "wait",
  press: "press",
};

totalTime$.textContent = totalTime;
selectionTime$.textContent = selectionTime;
points$.textContent = points;

startBtn$.onclick = startGame;
endBtn$.onclick = endGame;

let btnState = BUTTON_STATE.start;
let totalTimerStarted = false;

function startGame() {
  if (!totalTimerStarted) {
    startTotalTimer();
  }
  switch (btnState) {
    case BUTTON_STATE.start:
      setWaitBtnState();
      break;
    case BUTTON_STATE.wait:
      points$.textContent = --points;
      break;
    case BUTTON_STATE.press:
      points$.textContent = ++points;
      setWaitBtnState();
      break;
  }
}

function endGame() {
  totalTimerStarted = false;
  stopTotalTimer();
  clearData();
}

function startTotalTimer() {
  totalTimerStarted = true;
  totalTime$.textContent = ++totalTime + " s";
  totalTimer = setInterval(() => {
    totalTime$.textContent = ++totalTime + " s";
  }, 1000);
}

function stopTotalTimer() {
  clearInterval(totalTimer);
}

function clearData() {
  points = 0;
  totalTime = 0;
  selectionTime = 0;
}

function setStartBtnState() {
  btnState = BUTTON_STATE.start;
  startBtn$.style.backgroundColor = "yellow";
  startBtn$.textContent = "start";
  startBtn$.textTransform = "uppercase";
}

function setWaitBtnState() {
  console.log("set wait btn state");
  btnState = BUTTON_STATE.wait;
  startBtn$.style.backgroundColor = "grey";
  startBtn$.textContent = "wait...";
  startBtn$.textTransform = "uppercase";
  setTimeout(setPressBtnState, getRandInt(1, 6));
}

function setPressBtnState() {
  console.log("set press btn state");
  btnState = BUTTON_STATE.press;
  startBtn$.style.backgroundColor = "green";
  startBtn$.textContent = "press now!!!";
  startBtn$.textTransform = "uppercase";
}

function getRandInt(min, max) {
  console.log("time: ", Math.floor(Math.random() * (max - min + 1) + min));
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}
