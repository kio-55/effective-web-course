let menuBtn = document.querySelector(".header__navigation-btn");
let navigation = document.querySelector(".header__navigation");


menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navigation.classList.toggle('active');
})