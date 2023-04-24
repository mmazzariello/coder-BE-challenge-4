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

cartRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;
    await cartManager.addProductCart({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });
    res.send("Cart created");
  } catch (error) {
    res.send(error);
  }
});

export default cartRouter;
