import Api from "./api.js";
const api = new Api();

let cart = JSON.parse(localStorage.getItem("CART_LIST")) || [];

const saveLocalStorage = () => {
  localStorage.setItem("CART_LIST", JSON.stringify(cart));
};

const renderUI = (data) => {
  let content = "";

  data.forEach((product) => {
    content += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card cardPhone">
                <img src="${product.img}" class="card-img-top" alt="${product.name}" />
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                    <div>
                        <h3 class="cardPhone__title">${product.name}</h3>
                        <p class="cardPhone__text">${product.desc}</p>
                    </div>
                    <div>
                        <h3 class="cardPhone__title">${product.price}</h3>
                    </div>
                    </div>
                    <div class="d-flex justify-content-between">
                    <div class="cardPhone__rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <div>
                        <button class="btnPhone-shadow" onClick="addToCart('${product.id}')">
                        <i class="fa fa-shopping-cart"></i> Buy Now
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
  });

  document.getElementById("products").innerHTML = content;
};

document.getElementById("filterType").onchange = function (e) {
  const type = e.target.value;
  api.fetchProductsApi().then((response) => {
    let data = response.data;
    if (type !== "all") {
      data = data.filter((p) => p.type.toLowerCase() === type.toLowerCase());
    }
    renderUI(data);
  });
};

const addToCart = (id) => {

  api.fetchProductsApi().then((response) => {
    const product = response.data.find((p) => p.id === id);
    

    const index = cart.findIndex((item) => item.id === id);

    if (index === -1) {

      const cartItem = {
        id: product.id,
        name: product.name,
        price: Number(product.price), 
        img: product.img,
        quantity: 1
      };
      cart.push(cartItem);
    } else {

      cart[index].quantity += 1;
    }

    renderCart();
    alert("Đã thêm " + product.name + " vào giỏ hàng!");
  });
};

window.addToCart = addToCart;

const renderCart = () => {
  let content = "";
  let total = 0;

  cart.forEach((item) => {

    let subTotal = item.price * item.quantity;
    total += subTotal;

    content += `
      <tr>
        <td>${item.name}</td>
        <td><img src="${item.img}" width="50" /></td>
        <td>${Number(item.price).toLocaleString()}</td>
        <td>
          <button class="btn btn-sm btn-info" onclick="changeQuantity('${item.id}', 'down')">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-info" onclick="changeQuantity('${item.id}', 'up')">+</button>
        </td>
        <td>${subTotal.toLocaleString()}</td>
        <td>
          <button class="btn btn-danger" onclick="removeCartItem('${item.id}')">
            <i class="fa fa-trash"></i> Xóa
          </button>
        </td>
      </tr>`;
  });

  document.getElementById("tblCart").innerHTML = content;

  document.getElementById("totalPrice").innerHTML = total.toLocaleString();
  

  saveLocalStorage(); 
};

const changeQuantity = (id, action) => {
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    if (action === "up") {
      cart[index].quantity += 1;
    } else {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {

        if(confirm("Bạn muốn xóa sản phẩm này?")) cart.splice(index, 1);
      }
    }
    renderCart();
  }
};
window.changeQuantity = changeQuantity;

const removeCartItem = (id) => {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    cart = cart.filter((item) => item.id !== id);
    renderCart();
  }
};
window.removeCartItem = removeCartItem;

const checkout = () => {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống, hãy chọn sản phẩm trước khi thanh toán!");
    return;
  }

  if (confirm("Bạn xác nhận muốn thanh toán đơn hàng này?")) {

    cart = [];
    
    renderCart();
    
    alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
  }
};
window.checkout = checkout;

const getListProduct = () => {
  api
    .fetchProductsApi()
    .then((response) => {

      console.log("Danh sách sản phẩm:", response.data);
      renderUI(response.data);
    })
    .catch((error) => {

      console.error("Lỗi khi gọi API:", error);
    });
};

getListProduct();
renderCart();

