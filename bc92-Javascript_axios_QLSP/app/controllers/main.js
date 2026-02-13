import Api from "./../services/api.js";
import Product from "../models/product.js";

const api = new Api();

const renderUI = (data) => {
  let content = "";

  data.forEach((product, index) => {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.imageUrl}</td>
                <td>${product.description}</td>
                <td>
                    <button class="btn btn-danger" onclick="handleDeleteProduct(${product.id})">Delete</button>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditProduct(${product.id})">Edit</button>
                </td>
            </tr>
        `;
  });

  document.getElementById("tblDanhSachSP").innerHTML = content;
};

const getListProducts = () => {
  // request to server => get list products
  // pending: chờ (request đang được gửi đi => chờ phản hồi từ server)
  // open loader
  document.getElementById("loader").style.display = "block";

  const promise = api.fetchProductsApi();

  promise
    .then((result) => {
      console.log(result.data);
      renderUI(result.data);
      // close loader
      document.getElementById("loader").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      // close loader
      document.getElementById("loader").style.display = "none";
    });
};

getListProducts();

const handleDeleteProduct = (id) => {
  // pending
  const promise = api.deleteProductByIdApi(id);
  promise
    .then((rs) => {
      // resolve
      alert(`Delete product ${rs.data.name} successfully`);
      // gọi lại hàm lấy danh sách sản phẩm
      getListProducts();
    })
    .catch((error) => {
      // reject
      console.log(error);
    });
};

window.handleDeleteProduct = handleDeleteProduct;

/**
 * Open Modal => click "Thêm mới"
 * - Update Modal title
 * - Render button "Add Product"
 */
document.getElementById("btnThemSP").onclick = function () {
  const title = "Thêm sản phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  const footer = `
    <button class="btn btn-success" onclick="handleAddProduct()">Add Product</button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Add Product
 */
const handleAddProduct = () => {
  // Lấy thông tin người dùng nhập từ form
  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const imageUrl = document.getElementById("HinhSP").value;
  const description = document.getElementById("MoTa").value;

  // Tạo ra đối tượng product từ thông tin người dùng nhập
  const product = new Product("", name, price, imageUrl, description);

  const promise = api.addProductApi(product);
  promise
    .then((rs) => {
      alert(`Add product ${rs.data.name} successfully`);
      // Gọi lại hàm lấy danh sách sản phẩm
      getListProducts();
      // Đóng modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleAddProduct = handleAddProduct;

/**
 * Edit Product
 */
const handleEditProduct = (id) => {
  // Update Modal title
  const title = "Sửa sản phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  // Render button "Update Product"
  const footer = `
    <button class="btn btn-success" onclick="handleUpdateProduct(${id})">Update Product</button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  // Call API getProductByIdApi
  const promise = api.getProductByIdApi(id);
  promise
    .then((result) => {
      const product = result.data;
      // Fill data to form
      document.getElementById("TenSP").value = product.name;
      document.getElementById("GiaSP").value = product.price;
      document.getElementById("HinhSP").value = product.imageUrl;
      document.getElementById("MoTa").value = product.description;
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleEditProduct = handleEditProduct;

/**
 * Update Product
 */
const handleUpdateProduct = (id) => {
  // Lấy thông tin người dùng nhập từ form
  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const imageUrl = document.getElementById("HinhSP").value;
  const description = document.getElementById("MoTa").value;

  // Tạo ra đối tượng product từ thông tin người dùng nhập
  const product = new Product(id, name, price, imageUrl, description);

  // Call API updateProductByIdApi
  const promise = api.updateProductByIdApi(product);
  promise
    .then((rs) => {
      alert(`Update product ${rs.data.name} successfully`);
      // Gọi lại hàm lấy danh sách sản phẩm
      getListProducts();
      // Đóng modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleUpdateProduct = handleUpdateProduct;
