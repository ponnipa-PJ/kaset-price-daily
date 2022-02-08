import http from "../http-common";

class ProductDataService {
  getproducts() {
    return http.get(`/gis-products`);
  }
  getprice(product_id,from_date,to_date){
    return http.get(`/gis-product-prices?product_id=${product_id}&from_date=${from_date}&to_date=${to_date}`);
  }
}

export default new ProductDataService();