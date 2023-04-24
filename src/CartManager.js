import { promises as fs } from "fs";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  static incrementID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  async createCart() {
    const cartsJSON = await fs.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsJSON);
    const cart = {
      id: CartManager.incrementID(),
      quantity: [],
    };
    carts.push(cart);
    await fs.writeFile(this.path, JSON.stringify(carts));
    return "Cart created";
  }

  async getCartById(id) {
    const cartsJSON = await fs.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsJSON);
    if (carts.some((cart) => cart.id === parseInt(id))) {
      console.log(`Product with id: ${id} found`);
      return carts.find((cart) => cart.id === parseInt(id));
    } else {
      console.error("Cart not found");
      return { error: `Cart not found` };
    }
  }

  async addProductCart(id, quantity, idCart) {
    const cartsJSON = await fs.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsJSON);
    const cartIndex = carts.findIndex((cart) => cart.id === parseInt(idCart));
    const productIndex =
      cartIndex !== -1
        ? carts.quantity.findIndex((product) => product.id === parseInt(id))
        : -1;
    if (productIndex !== -1) {
      // Modifico la cantidad del producto existente:
      carts[cartIndex].quantity[productIndex].quantity += quantity;
    } else {
      // Creo un nuevo objeto:
      const product = {
        id: parseInt(id),
        quantity: parseInt(quantity),
      };
      carts[cartIndex].quantity.push(product);
    }
    // Guardar los cambios en el archivo:
    await fs.writeFile(this.path, JSON.stringify(carts));
    console.log(`Product with id: ${id} added to cart with id: ${idCart}`);
  }
}
