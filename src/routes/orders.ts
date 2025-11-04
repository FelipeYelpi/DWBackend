
import { Router } from "express";
import { DB } from "../db";
import { OrderStatus } from "../enums";
import { Pedido } from "../models";
import { calcCart, isoNow } from "../util";

const router = Router();

router.post("/", (req, res) => {
  const { customerEmail } = req.body as { customerEmail?: string };

  if (!DB.cartItems.length) {
    return res.status(400).json({ error: "Carrito vacío" });
  }

  const cart = calcCart(DB.cartItems);
  const id = DB.getNextOrderId();

  const newOrder: Pedido = {
    id,
    items: [...DB.cartItems],
    subtotal: cart.subtotal,
    shipping: cart.shipping,
    total: cart.total,
    status: OrderStatus.PENDIENTE_PAGO,
    customerEmail: customerEmail || "cliente@correo.com",
    createdAt: isoNow(),
  };

  newOrder.items.forEach(it => {
    const p = DB.products.find(p => p.id === it.id);
    if (p) p.stock -= it.qty;
  });

  DB.orders.unshift(newOrder);
  DB.cartItems = [];

  res.status(201).json(newOrder);
});

router.get("/", (req, res) => {
  res.json(DB.orders);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = DB.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
  res.json(order);
});

export default router;
