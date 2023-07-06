import express, { response } from "express";
import ProductManager from "./ProductManager.js";

let miProducto = new ProductManager.ProductManager("./productos.json")
const port = 8080
const app = express()

app.get("/",(req,res)=>{
    res.send("DIRIGIRSE A /products")
})

app.get("/products", async (req,res)=>{
    try{
        const productos = await miProducto.getProducts()
        const {limit} = await req.query
        const response = await productos.slice(0,limit)
        if (limit){
            res.json(response)
        }
        res.json(productos)
    }
    catch (err){
        console.log(err);
    }
})

app.get("/products/:id", async (req,res)=>{
    try{        
        const productos = await miProducto.getProducts()
        const {id} = req.params
        const product = await productos.find((e)=>e.id==id)
        res.json(product)
    }
    catch (err){
        console.log(err);
    }
})





app.listen(port,()=>{
    console.log("Servidor corriendo");
})