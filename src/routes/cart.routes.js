import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager("./cart.txt");

const cartRouter = Router();

cartRouter.get("/:id", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.id);
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

cartRouter.post("/carts/:idCart/products/:idProduct", async (req, res) => {
  try {
    const idCart = req.params.idCart;
    const idProduct = req.params.idProduct;
    const quantity = req.body.quantity;
    await cartManager.addProductCart(idProduct, quantity, idCart);
    res
      .status(200)
      .json({
        message: `Product with id ${idProduct} added to cart with id ${idCart}`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default cartRouter;
