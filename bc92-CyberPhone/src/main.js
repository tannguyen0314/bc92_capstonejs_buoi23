import Api from "./api.js";
const api = new Api();

const renderUI = (data) => {
  let content = "";

  data.forEach((product) => {
    content += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card cardPhone">
                <img src="./img/${product.imageUrl}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                    <div>
                        <h3 class="cardPhone__title">${product.name}</h3>
                        <p class="cardPhone__text">${product.description}</p>
                    </div>
                    <div>
                        <h3 class="cardPhone__title">$99.99</h3>
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
                        <button class="btnPhone-shadow">
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

const getListProduct = () => {
  api
    .fetchProductsApi()
    .then((response) => {
      // Xử lý khi gọi API thành công
      console.log("Danh sách sản phẩm:", response.data);
      renderUI(response.data);
    })
    .catch((error) => {
      // Xử lý khi gọi API thất bại
      console.error("Lỗi khi gọi API:", error);
    });
};

getListProduct();
