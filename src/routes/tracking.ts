
import { Router } from "express";
import { DB } from "../db";
import { SeguimientoDeEntrega } from "../models";

const router = Router();

router.get("/:orderId", (req, res) => {
  const orderId = Number(req.params.orderId);
  const order = DB.orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

  let track = DB.tracking.find(t => t.pedidoId === orderId);
  if (!track) {
    track = {
      pedidoId: orderId,
      trackingUrl: `https://seguimiento.example.com/${orderId}`,
      notificado: false,
      falloSeguimiento: false,
    };
    DB.tracking.push(track);
  }

  res.json(track);
});

export default router;
