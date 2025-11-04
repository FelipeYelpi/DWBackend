
import { OrderStatus, InvoiceStatus, PaymentMethod, PaymentGatewayResult } from "./enums";

export interface Usuario {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Producto {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  img: string;
  desc: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}

export interface Carrito {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export interface Pedido {
  id: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  customerEmail: string;
  userId?: number;
  createdAt: string;
}

export interface PaymentInput {
  method: PaymentMethod;
  simulateResult?: PaymentGatewayResult;
}

export interface PaymentResult {
  status: OrderStatus;
  gatewayResult: PaymentGatewayResult;
}

export interface BoletaDigital {
  number: string;
  pedidoId: number;
  fechaCreacion: string;
  estadoMail: InvoiceStatus;
  reintentoEnvio: number;
}

export interface SeguimientoDeEntrega {
  pedidoId: number;
  trackingUrl: string;
  notificado: boolean;
  falloSeguimiento: boolean;
}
