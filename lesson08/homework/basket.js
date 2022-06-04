
const cartIconWrapEl = document.querySelector(".cartIconWrap");
const basketEl = document.querySelector(".basket");
cartIconWrapEl.addEventListener('click', event => {
  basketEl.classList.toggle("hidden");
});
const basketHeaderEl = basketEl.querySelector(".basketHeader");
const ProductInBasketEl = cartIconWrapEl.querySelector("span");
ProductInBasketEl.textContent = "0";
const basketTotalValueEl = document.querySelector(".basketTotalValue");
basketTotalValueEl.textContent = "0";
const basketRowEl = basketEl.querySelector(".basketRow");

/**
 * В корзине хранится количество каждого товара
 * Ключ это id продукта, значение это товар в корзине - объект, содержащий
 * id, название товара, цену, и количество штук, например:
 * {
 *    1: {id: 1, name: "product 1", price: 30, count: 2},
 *    3: {id: 3, name: "product 3", price: 25, count: 1},
 * }
 */
const basket = {};

document.querySelector(".featuredItems").addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const item = event.target.closest(".featuredItem")
  const id = Number(item.dataset.id);
  const name = item.dataset.name;
  const price = Number(item.dataset.price);
  addToCart(id, name, price);
});

function getTotalBasketCount() {
  let total = 0;
  for(const product in basket) {
    total += basket[product].count;
  }
  return total;
}

function getTotalBasketCost() {
  let cost = 0;
  for(const product in basket) {
    cost += basket[product].count * basket[product].price;
  }
  return cost;
}


function addToCart(id, name, price) {
  //8.1. В объект basket добавить новый продукт или изменить имеющийся.
  if (!(id in basket)) {
    basket[id] = {id, name, price, count:0};
  }
  basket[id].count++;
  //8.2. В html отрисовать новое количество добавленных товаров у значка корзины.
  const totalCount = getTotalBasketCount();
  ProductInBasketEl.textContent = totalCount.toString();
  //8.3. Отрисовать новую общую стоимость товаров в корзине.
  const totalCost = getTotalBasketCost();
  basketTotalValueEl.textContent = totalCost.toFixed(2);
  //8.4. Отрисовать правильно строку в окне корзины, в которой записаны все данные
  //о товаре.
  updateCart()
}

function updateCart() {
  for(const product in basket) {
    const id = basket[product].id;
    const productTotalCost = basket[product].price * basket[product].count;
    const rowEl = basketEl.querySelector(`div[data-id="${id}"]`)
    if (!rowEl) {
      const rowContent = `<div class="basketRow" data-id=${id}>
        <div>${basket[product].name}</div>
        <div><span class="productCount">${basket[product].count}</span> шт.</div>
        <div>$${basket[product].price}</div>
        <div>$<span class="productTotal">${productTotalCost}</span></div>
      </div>`;
      basketHeaderEl.insertAdjacentHTML('afterend', rowContent);
    } else {
      rowEl.querySelector(".productCount")
        .textContent = basket[product].count.toString();
      rowEl.querySelector(".productTotal")
        .textContent = productTotalCost.toFixed(2);
    }
  }
}