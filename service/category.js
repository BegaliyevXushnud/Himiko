import https from "./config";

const category = {
  create: (data) => https.post("/category/create", data),
  get: () => https.get("/category"),
  update: (data) => https.put("/category/update", data),
  delete: (id) => https.delete(`/category/delete/${id}`),
};

export default category;
