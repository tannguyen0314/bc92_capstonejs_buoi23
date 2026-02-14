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
                <td>${product.img}</td>
                <td>${product.desc}</td>
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

  document.getElementById("loader").style.display = "block";

  const promise = api.fetchProductsApi();

  promise
    .then((result) => {
      console.log(result.data);
      renderUI(result.data);

      document.getElementById("loader").style.display = "none";
    })
    .catch((error) => {
      console.log(error);

      document.getElementById("loader").style.display = "none";
    });
};

getListProducts();



const handleDeleteProduct = (id) => {

  const promise = api.deleteProductByIdApi(id);
  promise
    .then((rs) => {

      alert(`Delete product ${rs.data.name} successfully`);

      getListProducts();
    })
    .catch((error) => {

      console.log(error);
    });
};

window.handleDeleteProduct = handleDeleteProduct;


document.getElementById("btnThemSP").onclick = function () {
  const title = "Thêm sản phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  const footer = `
    <button class="btn btn-success" onclick="handleAddProduct()">Add Product</button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

const validateForm = () => {
  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const img = document.getElementById("HinhSP").value;
  const desc = document.getElementById("MoTa").value;

  let isValid = true;

  if (name.trim() === "") {
    alert("Tên sản phẩm không được để trống");
    isValid = false;
  }

  else if (isNaN(price) || price <= 0) {
    alert("Giá phải là số và lớn hơn 0");
    isValid = false;
  }

  else if (img.trim() === "") {
    alert("Vui lòng nhập link hình ảnh");
    isValid = false;
  }

  return isValid;
};


const handleAddProduct = () => {

  if (!validateForm()) return;

  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const img = document.getElementById("HinhSP").value;
  const desc = document.getElementById("MoTa").value;


  const product = new Product("", name, price, img, desc);

  const promise = api.addProductApi(product);
  promise
    .then((rs) => {
      alert(`Add product ${rs.data.name} successfully`);

      getListProducts();

      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleAddProduct = handleAddProduct;


const handleEditProduct = (id) => {

  const title = "Sửa sản phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  const footer = `
    <button class="btn btn-success" onclick="handleUpdateProduct(${id})">Update Product</button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;


  const promise = api.getProductByIdApi(id);
  promise
    .then((result) => {
      const product = result.data;

      document.getElementById("TenSP").value = product.name;
      document.getElementById("GiaSP").value = product.price;
      document.getElementById("HinhSP").value = product.img;
      document.getElementById("MoTa").value = product.desc;
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleEditProduct = handleEditProduct;


const handleUpdateProduct = (id) => {

  if (!validateForm()) return;

  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const img = document.getElementById("HinhSP").value;
  const desc = document.getElementById("MoTa").value;


  const product = new Product(id, name, price, img, desc);


  const promise = api.updateProductByIdApi(product);
  promise
    .then((rs) => {
      alert(`Update product ${rs.data.name} successfully`);

      getListProducts();

      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleUpdateProduct = handleUpdateProduct;


document.getElementById("txtSearch").addEventListener("input", function (e) {
  const keyword = e.target.value.toLowerCase();
  
  api.fetchProductsApi()
    .then((result) => {
      const data = result.data;

      const filteredData = data.filter((product) => 
        product.name.toLowerCase().includes(keyword)
      );
      renderUI(filteredData);
    })
    .catch((error) => console.log(error));
});

document.getElementById("sortPrice").addEventListener("change", function (e) {
  const order = e.target.value; 
  
  api.fetchProductsApi()
    .then((result) => {
      let data = result.data;
      
      if (order === "asc") {
        data.sort((a, b) => a.price - b.price);
      } else if (order === "desc") {
        data.sort((a, b) => b.price - a.price);
      }
      
      renderUI(data);
    })
    .catch((error) => console.log(error));
});