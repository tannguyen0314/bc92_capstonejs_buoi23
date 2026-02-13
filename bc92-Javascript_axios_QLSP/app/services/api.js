class Api {
  fetchProductsApi() {
    /**
     * axios trả về 1 promise (object)
     *  - pending: chờ
     *  - resolve: thành công
     *  - reject: thất bại
     */
    const promise = axios({
      url: "https://696365fe2d146d9f58d35d1d.mockapi.io/api/Product",
      method: "GET",
    });

    return promise;
  }

  deleteProductByIdApi(id) {
    const promise = axios({
      url: `https://696365fe2d146d9f58d35d1d.mockapi.io/api/Product/${id}`,
      method: "DELETE",
    });

    return promise;
  }

  addProductApi(product) {
    const promise = axios({
      url: `https://696365fe2d146d9f58d35d1d.mockapi.io/api/Product`,
      method: "POST",
      data: product,
    });
    return promise;
  }

  getProductByIdApi(id) {
    const promise = axios({
      url: `https://696365fe2d146d9f58d35d1d.mockapi.io/api/Product/${id}`,
      method: "GET",
    });

    return promise;
  }

  updateProductByIdApi(product) {
    const promise = axios({
      url: `https://696365fe2d146d9f58d35d1d.mockapi.io/api/Product/${product.id}`,
      method: "PUT",
      data: product,
    });

    return promise;
  }
}

export default Api;
