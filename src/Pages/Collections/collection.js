// class CartItem {
//   constructor(name, desc, img, price) {
//     this.name = name;
//     this.desc = desc;
//     this.img = img;
//     this.price = price;
//     this.quantity = 1;
//   }
// }

// class LocalCart {
//   static key = "cartItems";
//   static keyProduct = "productDetail";

//   static getLocalCartItems() {
//     let cartMap = new Map();
//     const cart = localStorage.getItem(LocalCart.key);
//     if (cart === null || cart.length === 0) return cartMap;
//     return new Map(Object.entries(JSON.parse(cart)));
//   }

//   static addItemToLocalCart(id, item) {
//     let cart = LocalCart.getLocalCartItems();
//     if (cart.has(id)) {
//       let mapItem = cart.get(id);
//       mapItem.quantity += 1;
//       cart.set(id, mapItem);
//     } else cart.set(id, item);
//     localStorage.setItem(
//       LocalCart.key,
//       JSON.stringify(Object.fromEntries(cart))
//     );
//     updateCartUI();
//   }

//   static removeItemFromCart(id) {
//     let cart = LocalCart.getLocalCartItems();
//     if (cart.has(id)) {
//       let mapItem = cart.get(id);
//       if (mapItem.quantity > 1) {
//         mapItem.quantity -= 1;
//         cart.set(id, mapItem);
//       } else cart.delete(id);
//     }
//     if (cart.length === 0) localStorage.clear();
//     else
//       localStorage.setItem(
//         LocalCart.key,
//         JSON.stringify(Object.fromEntries(cart))
//       );
//     updateCartUI();
//   }
//   static addItemFromCart(id) {
//     let cart = LocalCart.getLocalCartItems();
//     if (cart.has(id)) {
//       let mapItem = cart.get(id);
//       if (mapItem.quantity > 1) {
//         mapItem.quantity += 1;
//         cart.set(id, mapItem);
//       } else cart.delete(id);
//     }
//     if (cart.length === 0) localStorage.clear();
//     else
//       localStorage.setItem(
//         LocalCart.key,
//         JSON.stringify(Object.fromEntries(cart))
//       );
//     updateCartUI();
//   }
//   static removeAllItemFromCart(id) {
//     let cart = LocalCart.getLocalCartItems();
//     cart.delete(id);

//     if (cart.length === 0) localStorage.clear();
//     else
//       localStorage.setItem(
//         LocalCart.key,
//         JSON.stringify(Object.fromEntries(cart))
//       );
//     updateCartUI();
//   }
// }

// const cartIcon = document.querySelector(".fa-cart-shopping");
// const wholeCartWindow = document.querySelector(".whole-cart-window");
// wholeCartWindow.inWindow = 0;
// const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
// addToCartBtns.forEach((btn) => {
//   btn.addEventListener("click", addItemFunction);
// });

// // name
// const addToProductDetail = document.querySelectorAll(".add_productDetail");
// addToProductDetail.forEach((btn) => {
//   btn.addEventListener("click", addProductDetail);
// });
// function addProductDetail(e) {
//   const id =
//     e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
//   const img =
//     e.target.parentElement.parentElement.parentElement.children[0].attributes[0]
//       .value;
//   const name =
//     e.target.parentElement.parentElement.parentElement.children[1].childNodes[1]
//       .innerText;

//   const desc =
//     e.target.parentElement.parentElement.parentElement.children[1].childNodes[3]
//       .children[0].innerText;
//   let price =
//     e.target.parentElement.parentElement.parentElement.children[1].childNodes[3]
//       .childNodes[3].innerText;
//   price = price.replace("$", "");
//   const itemsProductDetal = new Object({ id, name, desc, img, price });
//   localStorage.setItem("productDetail", JSON.stringify(itemsProductDetal));
//   window.location.href = "/productDetail.html";
// }
// // imgDetail
// const addToProductDetailImg = document.querySelectorAll(
//   ".add_productDetail_img"
// );
// addToProductDetailImg.forEach((btn) => {
//   btn.addEventListener("click", addProductDetailImg);
// });
// function addProductDetailImg(e) {
//   const id = e.target.parentElement.getAttribute("data-id");
//   const img = e.target.getAttribute("src");
//   const name =
//     e.target.parentElement.children[1].childNodes[1].childNodes[1].innerText;

//   const desc =
//     e.target.parentElement.children[1].children[1].childNodes[1].innerText;
//   let price =
//     e.target.parentElement.children[1].childNodes[3].childNodes[3].innerText;
//   price = price.replace("$", "");
//   const itemsProductDetalImg = new Object({ id, name, desc, img, price });
//   console.log(itemsProductDetalImg);
//   localStorage.setItem("productDetail", JSON.stringify(itemsProductDetalImg));
//   window.location.href = "../ProductDetail/productDetail.html";
// }

// function addItemFunction(e) {
//   const id =
//     e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
//   const img = e.target.parentElement.parentElement.previousElementSibling.src;
//   const name = e.target.parentElement.previousElementSibling.textContent;
//   const desc = e.target.parentElement.children[0].textContent;
//   let price = e.target.parentElement.children[1].textContent;
//   price = price.replace("$", "");
//   const item = new CartItem(name, desc, img, price);
//   LocalCart.addItemToLocalCart(id, item);
// }

// wholeCartWindow.addEventListener("mouseover", () => {
//   wholeCartWindow.inWindow = 1;
// });

// wholeCartWindow.addEventListener("mouseleave", () => {
//   wholeCartWindow.inWindow = 0;
//   wholeCartWindow.classList.add("hide");
// });
// function removeAllProduct(key) {
//   LocalCart.removeAllItemFromCart(String(key));
// }
// function addProduct(key) {
//   LocalCart.addItemToLocalCart(String(key));
// }
// function removeProduct(key) {
//   LocalCart.removeItemFromCart(String(key));
// }

// function updateCartUI() {
//   const cartWrapper = document.querySelector(".cart-wrapper");
//   cartWrapper.innerHTML = "";
//   const items = LocalCart.getLocalCartItems();
//   if (items === null) return;
//   let count = 0;
//   let total = 0;
//   for (const [key, value] of items.entries()) {
//     const cartItem = document.createElement("div");
//     cartItem.classList.add("cart-item");
//     let price = value.price * value.quantity;
//     price = Math.round(price * 100) / 100;
//     count += 1;
//     total += price;
//     total = Math.round(total * 100) / 100;
//     cartItem.innerHTML = `
//                        <div
//                        data-id="${key}"
//                        class="cart-item"
//                        style="
//                          padding: 10px;
//                          background-color: rgba(0, 0, 0, 0.05);
//                          margin-bottom: 10px;
//                        ">
//                        <div
//                          style="
//                            display: flex;
//                            align-items: center;
//                            padding: 10px;
//                            border-radius: 6px;
//                            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
//                          ">
//                          <div style="width: 35%">
//                            <img
//                              src="${value.img}"
//                              style="width: 100%; height: 100%; object-fit: cover" />
//                          </div>
//                          <div class="details">
//                            <h3>${value.name}</h3>
//                            <p style="line-height: 17px">
//                            ${value.desc}
//                            </p>
//                          </div>
//                          <div class="price">$${price}</div>
//                        </div>
//                        <div
//                          style="
//                            display: flex;
//                            padding: 10px 10px 0 10px;
//                            justify-content: space-around;
//                          ">
//                          <div
//                            style="
//                              display: flex;
//                              align-items: center;
//                              border: 1px solid rgba(0, 0, 0, 0.08);
//                              background-color: rgba(240, 242, 246, 1);
//                              padding: 5px 12px;
//                            ">
//                            <span class="minus" onclick='removeProduct(${key})' style="cursor: pointer"
//                              ><i
//                                class="fa fa-minus"
//                                aria-hidden="true"
//                                style="font-size: 20px"></i
//                            ></span>
//                            <span
//                              class="num"
//                              style="
//                                padding: 0px 19px;
//                                font-size: 22px;
//                                transform: translateY(-3px);
//                              "
//                              >${value.quantity}</span
//                            >
//                            <span class="plus" onclick='addProduct(${key})' style="cursor: pointer"
//                              ><i
//                                class="fa fa-plus"
//                                aria-hidden="true"
//                                style="font-size: 20px"></i
//                            ></span>
//                          </div>

//                          <div
//                            class="cancel"
//                            style="
//                              padding: 5px 12px;
//                              display: flex;
//                              align-items: center;
//                              cursor: pointer;
//                            " onclick='removeAllProduct(${key})' >
//                            <i
//                              class="fa fa-trash-o"
//                              aria-hidden="true"
//                              style="margin-right: 10px"></i>
//                            Remove
//                          </div>
//                        </div>
//                      </div>
//         `;

//     cartWrapper.append(cartItem);
//   }

//   if (count > 0) {
//     cartIcon.classList.add("non-empty");

//     let root = document.querySelector(":root");
//     root.style.setProperty("--after-content", `"${count}"`);
//     const subtotal = document.querySelector(".subtotal");
//     subtotal.innerHTML = `SubTotal: $${total}`;
//   } else cartIcon.classList.remove("non-empty");
//   if (count === 0) {
//     const subtotal = document.querySelector(".subtotal");
//     subtotal.innerHTML = `SubTotal: $0`;
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   updateCartUI();
// });

const productList = document.querySelector(".card_product_contain");

// đổ product ra màn hình
function renderProduct() {
  productData.forEach((product) => {
    productList.innerHTML += `
        <div style="width: 260px" class="card_product">
        <div class="product_card_img">
          <img
            src="//bizweb.dktcdn.net/thumb/large/100/302/551/products/compressed-da-ne-nlogocropvi-2209-4-032-1.jpg?v=1672480252000"
            data-lazyload="//bizweb.dktcdn.net/thumb/large/100/302/551/products/compressed-da-ne-nlogocropvi-2209-4-032-1.jpg?v=1672480252000"
            alt="NEW COLLECTIONS - R MIDI DOUBLE LINE TWIST OXIDIZE"
            style="width: 100%; height: 100%" />
          <div class="product_card_icon">
            <div class="icon_box">
              <i class="fa-solid fa-heart"></i>
            </div>
            <div class="icon_box">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
        <div style="margin: auto">
          <p class="card_product_name">${product.nameProduct}</p>
          <div
            style="display: flex; justify-content: center"
            class="product_price">
            <div>490.000</div>
            <div>490.000</div>
          </div>
        </div>
      </div>
        `;
  });
}
renderProduct();
