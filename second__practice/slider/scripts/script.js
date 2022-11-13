/* Constants */
const SLIDES_COUNT = 5;
const DELAY = 5000;

const sliderInner = document.querySelector(".slider__inner");
const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");

/* Variables */
let slideIndex = 0;
let timeout = "";

const save = () => {
  localStorage.setItem("slideIndex", slideIndex);
};

const draw = () => {
  let img = document.createElement("img");
  img.classList.add("slider__item_invisible");
  img.src = `./images/image_${slideIndex + 1}.jpg`;
  img.classList.add("slider__item");
  sliderInner.appendChild(img);
};

const remove = () => {
  timeout = true;
  let slide = document.querySelectorAll(".slider__item");
  slide[0].classList.add("slider__item_invisible");
  slide[1].classList.remove("slider__item_invisible");
  setTimeout(() => {
    sliderInner.removeChild(slide.item(0));
    timeout = false;
  }, 1000);
};

const goRight = () => {
  if (!timeout) {
    slideIndex == SLIDES_COUNT - 1 ? (slideIndex = 0) : slideIndex++;
    draw();
    save();
    remove();
  }
};

const goLeft = () => {
  if (!timeout) {
    slideIndex == 0 ? (slideIndex = SLIDES_COUNT - 1) : slideIndex--;
    draw();
    save();
    remove();
  }
};

/* Listeners */

rightButton.addEventListener("click", goRight);

leftButton.addEventListener("click", goLeft);

document.addEventListener("keydown", function (event) {
  if (event.key == " " || event.key == "ArrowRight") {
    goRight();
  } else if (event.key == "ArrowLeft") {
    goLeft();
  }
});

setInterval(goRight, DELAY);

/* Init */

if (localStorage.length) {
  slideIndex = parseInt(localStorage.getItem("slideIndex"));
  draw();
} else {
  draw();
}

document
  .querySelector(".slider__item")
  .classList.remove("slider__item_invisible");
