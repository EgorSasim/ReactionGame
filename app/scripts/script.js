const totalTime$ = document.querySelector(".total-time__content");
const selectionTime$ = document.querySelector(".selection-time__content");
const points$ = document.querySelector(".points__content");
const startBtn$ = document.querySelector(".start");
const endBtn$ = document.querySelector(".finish");
const modal$ = document.querySelector(".modal-wrap");
const closeModal$ = document.querySelector(".modal__close");
const modalTotalTime$ = document.querySelector(".modal__total-time");
const modalSelectionTime$ = document.querySelector(".modal__selection-time");
const modalEfficiency$ = document.querySelector(".modal__efficiency");

let totalTimer;
let selectionTimer;

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
closeModal$.onclick = closeModal;

let btnState = BUTTON_STATE.start;
let totalTimerStarted = false;
let startTime;
let elapsedTime;

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
      elapsedTime = Date.now() - startTime;
      selectionTime += +(elapsedTime / 1000).toFixed(3);
      console.log("selection time: ", selectionTime);
      selectionTime$.textContent = selectionTime + " s";
      setWaitBtnState();
      break;
  }
}

function endGame() {
  totalTimerStarted = false;
  stopTotalTimer();
  showModal();
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

function startSelectionTimer() {
  selectionTimer = setInterval(() => {
    selectionTime$.textContent = ++selectionTime + " s";
  }, 1000);
}

function stopSelectionTimer() {
  clearInterval(selectionTimer);
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
  btnState = BUTTON_STATE.wait;
  startBtn$.style.backgroundColor = "grey";
  startBtn$.textContent = "wait...";
  startBtn$.textTransform = "uppercase";
  setTimeout(setPressBtnState, getRandInt(1, 6));
}

function setPressBtnState() {
  startTime = Date.now();
  btnState = BUTTON_STATE.press;
  startBtn$.style.backgroundColor = "green";
  startBtn$.textContent = "press now!!!";
  startBtn$.textTransform = "uppercase";
}

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

function showModal() {
  modal$.style.display = "block";
  modalTotalTime$.textContent = totalTime;
  modalSelectionTime$.textContent = selectionTime;
  modalEfficiency$.textContent =
    selectionTime == 0
      ? "no selection time? LOOOSER)"
      : points == 0
      ? "no points? : LOOOSER)"
      : (points / selectionTime) * 100;
}

function closeModal() {
  modal$.style.display = "none";
}
