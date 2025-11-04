
import { Router } from "express";
import { DB } from "../db";
import { PaymentInput, PaymentResult } from "../models";
import { OrderStatus, PaymentGatewayResult } from "../enums";

const router = Router();

router.post("/:orderId", (req, res) => {
  const orderId = Number(req.params.orderId);
  const order = DB.orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

  const body = req.body as PaymentInput;

  let gatewayResult = body.simulateResult || PaymentGatewayResult.AUTHORIZED;

  let status: OrderStatus;
  if (gatewayResult === PaymentGatewayResult.AUTHORIZED) {
    status = OrderStatus.PAGADO;
  } else if (gatewayResult === PaymentGatewayResult.REJECTED) {
    status = OrderStatus.PAGO_FALLIDO;
    order.items.forEach(it => {
      const p = DB.products.find(p => p.id === it.id);
      if (p) p.stock += it.qty;
    });
  } else {
    status = order.status;
  }

  if (gatewayResult !== PaymentGatewayResult.ERROR) {
    order.status = status;
  }

  const result: PaymentResult = {
    status,
    gatewayResult,
  };

  res.json(result);
});

export default router;
