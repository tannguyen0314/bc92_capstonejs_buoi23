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
}

export default Api;
