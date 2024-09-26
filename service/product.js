import https from "./config";

const Product = {
  // CRUD operations for products
  create: (data) => https.post("/products/create", data),
  get: () => https.get("/products/search"),
  update: (id, data) => https.patch(`/products/update/${id}`, data),
  delete: (id) => https.delete(`/products/delete/${id}`),

  // Services related to products
  services: {
    getServices: (productId) => https.get(`/products/${productId}/services`),
    addService: (productId, serviceData) => https.post(`/products/${productId}/services`, serviceData),
    updateService: (productId, serviceId, serviceData) => 
      https.patch(`/products/${productId}/services/${serviceId}`, serviceData),
    deleteService: (productId, serviceId) => https.delete(`/products/${productId}/services/${serviceId}`)
  }
};

export default Product;
