import ProductManager from "./ProductManager.js";

const test = async () => {
    let miProducto = new ProductManager.ProductManager("./productos.json")
    await miProducto.addProduct("producto 1","Este es un producto de prueba",200,"sin imagen","abc123",35); 
    await miProducto.addProduct("producto 2","Este es un producto de prueba",300,"sin imagen","abc1234",35);  
    await miProducto.deleteProduct(2)
    //await miProducto.updateProduct(1,{code:"123",stock: 500,title:"NUEVO PRODUCTO"})
    console.log(await miProducto.getProducts())
}

test()

