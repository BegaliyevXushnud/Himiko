import https from "./config";

const Product = {
 
  create: (data) => https.post("/products/create", data),
  get: () => https.get("/products/search"),
  update: (id, data) => https.patch(`/products/update/${id}`, data),
  delete: (id) => https.delete(`/products/delete/${id}`),
};

export default Product;
