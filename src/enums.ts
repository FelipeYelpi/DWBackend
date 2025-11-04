
export enum OrderStatus {
  PENDIENTE_PAGO = "pendientePago",
  PAGADO = "pagado",
  PAGO_FALLIDO = "pagoFallido",
}

export enum PaymentMethod {
  VISA = "visa",
  MASTERCARD = "mastercard",
  DEBITO = "debito",
}

export enum InvoiceStatus {
  PENDIENTE = "pendiente",
  ENVIADO = "enviado",
  REINTENTO = "reintentoEnvio",
}

export enum PaymentGatewayResult {
  AUTHORIZED = "AUTHORIZED",
  REJECTED = "REJECTED",
  ERROR = "ERROR",
}
