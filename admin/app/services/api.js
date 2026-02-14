  class Api {
    fetchProductsApi() {
      const promise = axios({
        url: "https://696366032d146d9f58d35d4c.mockapi.io/api/Products",
        method: "GET",
      });

      return promise;
    }

    deleteProductByIdApi(id) {
      const promise = axios({
        url: `https://696366032d146d9f58d35d4c.mockapi.io/api/Products/${id}`,
        method: "DELETE",
      });

      return promise;
    }

    addProductApi(product) {
      const promise = axios({
        url: `https://696366032d146d9f58d35d4c.mockapi.io/api/Products`,
        method: "POST",
        data: product,
      });
      return promise;
    }

    getProductByIdApi(id) {
      const promise = axios({
        url: `https://696366032d146d9f58d35d4c.mockapi.io/api/Products/${id}`,
        method: "GET",
      });

      return promise;
    }

    updateProductByIdApi(product) {
      const promise = axios({
        url: `https://696366032d146d9f58d35d4c.mockapi.io/api/Products/${product.id}`,
        method: "PUT",
        data: product,
      });

      return promise;
    }
  }

  export default Api;
