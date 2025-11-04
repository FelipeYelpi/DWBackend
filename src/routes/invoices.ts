
import { Router } from "express";
import { DB } from "../db";
import { BoletaDigital } from "../models";
import { InvoiceStatus } from "../enums";
import { isoNow } from "../util";

const router = Router();

router.get("/:orderId", (req, res) => {
  const orderId = Number(req.params.orderId);
  const order = DB.orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

  let invoice = DB.invoices.find(b => b.pedidoId === orderId);
  if (!invoice) {
    invoice = {
      number: "B-" + orderId,
      pedidoId: orderId,
      fechaCreacion: isoNow(),
      estadoMail: InvoiceStatus.PENDIENTE,
      reintentoEnvio: 0,
    };
    DB.invoices.push(invoice);
  }
  res.json(invoice);
});

export default router;
