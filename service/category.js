import https from "./config";

const categoryServise = {
  create: (data) => https.post("/category/create", data),
  get: () => https.get("/category/search"),
  update: (id, data) => https.patch(`/category/update/${id}`, data),
  delete: (id) => https.delete(`/category/delete/${id}`)
};

export default categoryServise;
