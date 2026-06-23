'use strict';



/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}


console.log("script.js підключився");

const productCards = document.querySelectorAll('.product-card');
const cartCount = document.getElementById('cart-count');

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  if (cartCount) {
    cartCount.textContent = total;
  }
}

// вибір розміру
productCards.forEach(card => {
  const sizes = card.querySelectorAll('.product__size');

  sizes.forEach(size => {
    size.addEventListener('click', () => {
      sizes.forEach(s => s.classList.remove('active-size'));
      size.classList.add('active-size');
      console.log("Обраний розмір:", size.textContent.trim());
    });
  });
});

// додавання в кошик
productCards.forEach(card => {
  const addBtn = card.querySelector('.add-to-cart-btn');
  const iconBtn = card.querySelector('.add-to-cart-icon');

  function addToCart() {
    console.log("Натиснули Додати");

    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const image = card.dataset.image;

    console.log("Дані товару:", { id, name, price, image });

    const selectedSize = card.querySelector('.product__size.active-size');

    if (!selectedSize) {
      alert("Оберіть розмір!");
      return;
    }

    const size = selectedSize.textContent.trim();

    let cart = getCart();

    const existingProduct = cart.find(item => item.id === id && item.size === size);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        size,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartCount();

    console.log("Кошик після додавання:", cart);
    alert("Товар додано в кошик!");
  }

  if (addBtn) {
    addBtn.addEventListener('click', addToCart);
  }

  if (iconBtn) {
    iconBtn.addEventListener('click', addToCart);
  }
});

updateCartCount();

/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});
