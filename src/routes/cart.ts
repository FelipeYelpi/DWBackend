
import { Router } from "express";
import { DB } from "../db";
import { CartItem } from "../models";
import { calcCart } from "../util";

const router = Router();

router.get("/", (req, res) => {
  res.json(calcCart(DB.cartItems));
});

router.post("/items", (req, res) => {
  const { productId, qty } = req.body as { productId: number; qty: number };
  const product = DB.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Producto no existe" });

  const quantity = qty ?? 1;
  const existing = DB.cartItems.find(i => i.id === productId);
  const currentQty = existing ? existing.qty : 0;

  if (currentQty + quantity > product.stock) {
    return res.status(400).json({ error: "Sin stock suficiente" });
  }

  if (existing) {
    existing.qty += quantity;
  } else {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      qty: quantity,
      img: product.img,
    };
    DB.cartItems.push(newItem);
  }

  res.json(calcCart(DB.cartItems));
});

router.patch("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const { qty } = req.body as { qty: number };

  const item = DB.cartItems.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item no encontrado" });

  if (qty <= 0) {
    DB.cartItems = DB.cartItems.filter(i => i.id !== id);
  } else {
    item.qty = qty;
  }
  res.json(calcCart(DB.cartItems));
});

router.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  DB.cartItems = DB.cartItems.filter(i => i.id !== id);
  res.json(calcCart(DB.cartItems));
});

router.delete("/", (req, res) => {
  DB.cartItems = [];
  res.status(204).send();
});

export default router;
