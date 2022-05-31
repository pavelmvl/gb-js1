
const cartIconWrapEl = document.querySelector(".cartIconWrap");
const basketEl = document.querySelector(".basket");
cartIconWrapEl.addEventListener('click', event => {
  basketEl.classList.toggle("hidden");
});