
import { Usuario, Producto, Pedido, CartItem, BoletaDigital, SeguimientoDeEntrega } from "./models";

let users: Usuario[] = [
  { id: 1, name: "Demo", email: "demo@floryvida.com", password: "1234" },
];

let products: Producto[] = [
  {
    id: 1,
    name: "Pack 6 Rosas y Chocolates",
    category: "Ramos",
    price: 31990,
    oldPrice: 45000,
    stock: 8,
    img: "",
    desc: "Pack ideal para ocasiones especiales.",
  },
  {
    id: 2,
    name: "Ramo de 10 Tulipanes Rojos",
    category: "Tulipanes",
    price: 29990,
    oldPrice: 45000,
    stock: 5,
    img: "",
    desc: "Tulipanes premium selección de temporada.",
  },
];

let cartItems: CartItem[] = [];
let orders: Pedido[] = [];
let invoices: BoletaDigital[] = [];
let tracking: SeguimientoDeEntrega[] = [];

let nextOrderId = 1001;

export const DB = {
  users,
  products,
  cartItems,
  orders,
  invoices,
  tracking,
  getNextOrderId(): number {
    return nextOrderId++;
  },
};
