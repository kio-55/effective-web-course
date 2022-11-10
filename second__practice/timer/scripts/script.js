const startBtn = document.querySelector(".start__button");
const stopBtn = document.querySelector(".stop__button");
const pauseBtn = document.querySelector(".pause__button");

const min = document.querySelector("#min");
const sec = document.querySelector("#sec");

let hour = 00,
  minute = 00,
  seconds = 00,
  interval;

let timerState = false;

const print = (elem, val) => {
  elem.value = val > 9 ? val : `0${val}`;
};

const timer = () => {
  if (seconds == 0) {
    if (minute == 0) {
      clearInterval(interval);
    } else {
      minute--;
      seconds = 60;
      print(min, minute);
    }
  } else {
    seconds--;
    print(sec, seconds);
  }
};

startBtn.addEventListener("click", () => {
  const time = min.value * 60 + sec.value;
  seconds = sec.value;
  minute = min.value % 60;
  hour = min.value / 60;

  clearInterval(interval);

  interval = setInterval(timer, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  hour = 0;
  minute = 0;
  seconds = 0;
  min.value = 0;
  sec.value = 0;
});
