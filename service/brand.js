 
 import https from "./config";
 const brand = {
    create:(data) => https.post("/brand/create",data),
    get:() => https.post("/brand"),
    update:(data) => https.post("/brand/update",data),
    delete:(id) => https.delete(`brand/delete/${id}`)
 }
 export default brand