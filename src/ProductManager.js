import utils from "./utils.js"

export class ProductManager {
    products;
    static id = 1;
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const producto = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };


        const incompleto = Object.values(producto)
        const validarCode = this.products.some((e) => e.code === code)

        if (incompleto.includes(undefined)){
            throw new Error("Faltan datos")
        }
        if (validarCode) {
            throw new Error(`Ya existe el producto con el ID: ${code}`);
        }
        ProductManager.id++;
        await this.products.push(producto)
        await utils.write(this.path, this.products)
    }

    async getProducts() {
        try {
            let data = await utils.read(this.path)
            return data
        }
        catch(error) {
            return console.log(error);
        }
    }

    async getProductsById(id) {
        try {
            const productsFilter = this.products.find((product) => product.id == id)
            if (productsFilter == undefined) {
                throw new Error(`No existe el producto con el ID: ${id}`)
            }
            return productsFilter
        }
        catch(error) {
            return console.log(error);
        }
    }

    async deleteProduct(id) {
        const productsFilter = this.products.find((product) => product.id == id)
        if (productsFilter == undefined) {
            throw new Error(`No existe el producto con el ID: ${id}`)
        }
        this.products = this.products.filter(e => e.id !== id)
        await utils.write(this.path, this.products)
    }

    async updateProduct(id, cambio) {

        let productUpdate = this.products.find(e => e.id === id)

        if (productUpdate == undefined) {
            throw new Error('Not Found');
        }

        if (Object.keys(cambio).includes('id')) {
            throw new Error('No se puede modificar el ID')
        }

        if (Object.keys(cambio).includes("code")) {
            let codigoRepetido = this.products.some(e => e.code === cambio.code)
            if (codigoRepetido) {
                throw new Error(`Ya existe el producto con el ID: ${cambio.code}`)
            } 
        }

        let productIndex = this.products.findIndex(e => e.id === id)
        this.products[productIndex] = {...this.products[productIndex],...cambio}
        
        await utils.write(this.path,this.products)
    }
}

export default {
    ProductManager
};