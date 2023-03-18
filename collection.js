class CartItem {
  constructor(name, desc, img, price) {
    this.name = name;
    this.desc = desc;
    this.img = img;
    this.price = price;
    this.quantity = 1;
  }
}

class LocalCart {
  static key = "cartItems";

  static getLocalCartItems() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap;
    return new Map(Object.entries(JSON.parse(cart)));
  }

  static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      mapItem.quantity += 1;
      cart.set(id, mapItem);
    } else cart.set(id, item);
    localStorage.setItem(
      LocalCart.key,
      JSON.stringify(Object.fromEntries(cart))
    );
    updateCartUI();
  }

  static removeItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
      } else cart.delete(id);
    }
    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  }
  static addItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity += 1;
        cart.set(id, mapItem);
      } else cart.delete(id);
    }
    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  }
  static removeAllItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    cart.delete(id);

    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  }
}

const cartIcon = document.querySelector(".fa-cart-shopping");
const wholeCartWindow = document.querySelector(".whole-cart-window");
wholeCartWindow.inWindow = 0;
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", addItemFunction);
});

function addItemFunction(e) {
  const id =
    e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
  const img = e.target.parentElement.parentElement.previousElementSibling.src;
  const name = e.target.parentElement.previousElementSibling.textContent;
  const desc = e.target.parentElement.children[0].textContent;
  let price = e.target.parentElement.children[1].textContent;
  price = price.replace("Price: $", "");
  const item = new CartItem(name, desc, img, price);
  LocalCart.addItemToLocalCart(id, item);
}

wholeCartWindow.addEventListener("mouseover", () => {
  wholeCartWindow.inWindow = 1;
});

wholeCartWindow.addEventListener("mouseleave", () => {
  wholeCartWindow.inWindow = 0;
  wholeCartWindow.classList.add("hide");
});

function updateCartUI() {
  const cartWrapper = document.querySelector(".cart-wrapper");
  cartWrapper.innerHTML = "";
  const items = LocalCart.getLocalCartItems();
  if (items === null) return;
  let count = 0;
  let total = 0;
  for (const [key, value] of items.entries()) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    let price = value.price * value.quantity;
    price = Math.round(price * 100) / 100;
    count += 1;
    total += price;
    total = Math.round(total * 100) / 100;
    cartItem.innerHTML = `
        <img src="${value.img}"> 
                       <div class="details">
                           <h3>${value.name}</h3>
                           <p>${value.desc}
                            <span class="quantity">Quantity: </span>
                               <span class="price">Price: $ ${price}</span>
                               <div class="wrapper">
                               <span class="minus">-</span>
                               <span class="num">${value.quantity}</span>
                               <span class="plus">+</span>
                             </div>
                           </p>
                       </div>
                       <div class="cancel"><i class="fas fa-window-close"></i></div>
        `;
    cartItem.lastElementChild.addEventListener("click", () => {
      LocalCart.removeAllItemFromCart(key);
    });

    cartWrapper.append(cartItem);
    const plus = document.querySelector(".plus"),
      minus = document.querySelector(".minus"),
      num = document.querySelector(".num");

    plus.addEventListener("click", () => {
      LocalCart.addItemToLocalCart(key);
    });

    minus.addEventListener("click", () => {
      LocalCart.removeItemFromCart(key);
    });
  }

  if (count > 0) {
    cartIcon.classList.add("non-empty");

    let root = document.querySelector(":root");
    root.style.setProperty("--after-content", `"${count}"`);
    const subtotal = document.querySelector(".subtotal");
    subtotal.innerHTML = `SubTotal: $${total}`;
  } else cartIcon.classList.remove("non-empty");
  if (count === 0) {
    cartIcon.classList.add("non-empty");

    let root = document.querySelector(":root");
    root.style.setProperty("--after-content", `"${count}"`);
    const subtotal = document.querySelector(".subtotal");
    subtotal.innerHTML = `SubTotal: $0`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
