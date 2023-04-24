import { promises as fs } from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      throw new Error("All fields are mandatory");
    }

    const productsArr = await fs.readFile(this.path, "utf-8");
    const parsedProducts = JSON.parse(productsArr);
    const duplicateCode = parsedProducts.some((p) => p.code === product.code);

    try {
      if (duplicateCode) {
        throw new Error("Product code is already in use");
      } else {
        const content = await fs.readFile(this.path, "utf-8");

        const aux = JSON.parse(content);
        aux.push(product);

        await fs.writeFile(this.path, JSON.stringify(aux));
        console.log("Product added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    //Consulto
    const productsArr = await fs.readFile(this.path, "utf-8");
    //Paso a formato json
    const products = JSON.parse(productsArr);
    return products;
  }

  async getProductById(id) {
    //Consulto
    const productsArr = await fs.readFile(this.path, "utf-8");
    const productToFind = JSON.parse(productsArr);
    if (productToFind.some((prod) => prod.id === parseInt(id))) {
      console.log(`Product with id: ${id} found`);
      return productToFind.find((prod) => prod.id === parseInt(id));
    } else {
      console.error("Product not found");
      return { error: `Product with id ${id} not found` };
    }
  }

  async updateProduct(
    { title, description, price, thumbnail, code, stock },
    id
  ) {
    const prodsJson = await fs.readFile(this.path, "utf-8");
    const prodsParse = JSON.parse(prodsJson);

    if (prodsParse.some((prod) => prod.id === parseInt(id))) {
      let index = prodsParse.findIndex((prod) => prod.id === parseInt(id));
      prodsParse[index].title = title;
      prodsParse[index].description = description;
      prodsParse[index].price = price;
      prodsParse[index].thumbnail = thumbnail;
      prodsParse[index].code = code;
      prodsParse[index].stock = stock;

      await fs.writeFile(this.path, JSON.stringify(prodsParse));
      return "Product updated successfully";
    } else {
      return "Product not found";
    }
  }

  async deleteProduct(id) {
    const productsArr = await fs.readFile(this.path, "utf-8");
    const products = JSON.parse(productsArr);

    if (products.some((prod) => prod.id === parseInt(id))) {
      // Remuevo el producto con el id específico aplicando filter
      const filteredProducts = products.filter(
        (prod) => prod.id !== parseInt(id)
      );

      // Escribo el contenido en el archivo
      await fs.writeFile(this.path, JSON.stringify(filteredProducts));

      return "Product removed successfully.";
    } else {
      return "Product not found.";
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementID();
  }

  static incrementID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}

const product1 = new Product(
  "Product 1",
  "Description 1",
  10,
  "thumbnail0.png",
  "aaa124",
  10
);
const product2 = new Product(
  "Product 2",
  "Description 2",
  20,
  "thumbnail1.png",
  "aab125",
  20
);
const product3 = new Product(
  "Product 3",
  "Description 3",
  30,
  "thumbnail2.png",
  "aac125",
  30
);

const product4 = new Product(
  "Product 4",
  "",
  40,
  "thumbnail4.png",
  "aaa123",
  40
);

const product5 = new Product(
  "Product 5",
  "Description 5",
  50,
  "thumbnail5.png",
  "aab123",
  50
);

const product6 = new Product(
  "Product 6",
  "Description 6",
  60,
  "thumbnail6.png",
  "aab123",
  60
);

const product7 = new Product(
  "Product 7",
  "Description 7",
  10,
  "thumbnail7.png",
  "aaa127",
  10
);

const product8 = new Product(
  "Product 8",
  "Description 8",
  20,
  "thumbnail8.png",
  "aab128",
  20
);

const product9 = new Product(
  "Product 9",
  "Description 9",
  30,
  "thumbnail9.png",
  "aac129",
  30
);

const product10 = new Product(
  "Product 10",
  "Description 10",
  30,
  "thumbnail10.png",
  "aac130",
  30
);

//ADD PRODUCTS
// const productManager = new ProductManager("./products.txt");
// await productManager.addProduct(product1);
// // await productManager.addProduct(product1); // Se generará error porque ya existe en el txt
// await productManager.addProduct(product2);
// await productManager.addProduct(product3);
// // await productManager.addProduct(product4); //Se generará error por tener un campo vacío
// await productManager.addProduct(product5);
// // await productManager.addProduct(product6); // Se generará error por tener el campo code duplicado
// await productManager.addProduct(product7);
// await productManager.addProduct(product8);
// await productManager.addProduct(product9);
// await productManager.addProduct(product10);
