class Api {
  fetchProductsApi() {

    const promise = axios({
      url: "https://696366032d146d9f58d35d4c.mockapi.io/api/Products",
      method: "GET",
    });

    return promise;
  }
}

export default Api;
