import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager("./cart.txt");

const cartRouter = Router();

// cartRouter.get("/", async (req, res) => {
//   try {
//     const carts = await cartManager.getProducts();
//     res.send(carts);
//   } catch (error) {
//     res.send(error);
//   }
// });

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
    const { title, description, price, thumbnail, code, stock } = req.body;
    await cartManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    res.send("Cart created");
  } catch (error) {
    res.send(error);
  }
});

export default cartRouter;
