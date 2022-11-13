/* Constants */
const startBtn = document.querySelector(".start__button");
const stopBtn = document.querySelector(".stop__button");
const pauseBtn = document.querySelector(".pause__button");

const min = document.querySelector("#min");
const sec = document.querySelector("#sec");

const body = document.querySelector("body");
const music = document.querySelector(".music");
const errors = document.querySelector(".errors");

const preTimerButton = document.querySelectorAll(".timer__pre-timer-button");

/* Variables */
let minute = 00,
  seconds = 00,
  interval;

let timerRunning = "";
let inputBlocked = "";

const print = (elem, val) => {
  elem.value = parseInt(val) > 9 ? val : `0${parseInt(val)}`;
};

const timer = () => {
  if (seconds == 0) {
    if (minute == 0) {
      clearInterval(interval);
      body.classList.add("red");
      turnOnMusic();
    } else {
      minute--;
      seconds = 59;
      print(min, minute);
      print(sec, seconds);
    }
  } else {
    seconds--;
    print(sec, seconds);
  }
  saveStatate();
};

const saveStatate = () => {
  localStorage.setItem("min", minute);
  localStorage.setItem("sec", seconds);
  localStorage.setItem("timerRunning", timerRunning);
  localStorage.setItem("inputBlocked", inputBlocked);
};

const turnOnMusic = () => {
  let promise = music.play();
  if (promise !== undefined) {
    promise
      .then((_) => {})
      .catch((error) => {
        errors.innerHTML = `<p>Music is off, press the button to turn it on</p> <button class="timer__button" onClick="turnOnMusic()">Turn on</button>`;
      });
  }
};

const startEvent = () => {
  min.setAttribute("disabled", "");
  sec.setAttribute("disabled", "");
  inputBlocked = true;
  timerRunning = true;
  clearInterval(interval);
  interval = setInterval(timer, 1000);
  saveStatate();
  print(sec, seconds);
  print(min, minute);
  setButtonsStatus("");
};

const setButtonsStatus = (status) => {
  preTimerButton.forEach((button) => status ? button.removeAttribute('disabled') : button.setAttribute("disabled", ""));
};

/* Listeners */

startBtn.addEventListener("click", () => {
  seconds = sec.value;
  minute = min.value;
  startEvent();
});

pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  timerRunning = "";
  saveStatate();
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  if (seconds == 0 && minute == 0) {
    body.classList.remove("red");
    music.pause();
    music.currentTime = 0;
  }
  min.removeAttribute("disabled");
  sec.removeAttribute("disabled");
  inputBlocked = "";
  timerRunning = "";
  minute = 0;
  seconds = 0;
  min.value = 0;
  sec.value = 0;
  errors.innerHTML = "";
  setButtonsStatus(true);
  saveStatate();
});

preTimerButton.forEach((button) =>
  button.addEventListener("click", () => {
    seconds = 0;
    minute = parseInt(button.value);
    startEvent();
  })
);

/* Init after reload */
if (localStorage.length) {
  minute = localStorage.getItem("min");
  seconds = localStorage.getItem("sec");
  timerRunning = localStorage.getItem("timerRunning");
  inputBlocked = localStorage.getItem("inputBlocked");
  if (timerRunning) {
    setButtonsStatus("");
    clearInterval(interval);
    interval = setInterval(timer, 1000);
    if (minute == 0 && seconds == 0) {
      clearInterval(interval);
      turnOnMusic();
      body.classList.add("red");
    }
  }
  if (inputBlocked) {
    setButtonsStatus("");
    min.setAttribute("disabled", "");
    sec.setAttribute("disabled", "");
  }
  print(sec, seconds);
  print(min, minute);
}
