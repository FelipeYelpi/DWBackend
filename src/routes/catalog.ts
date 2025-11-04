
import { Router } from "express";
import { DB } from "../db";

const router = Router();

// GET /catalog/products
router.get("/products", (req, res) => {
  const { q, categoria, maxPrice } = req.query as {
    q?: string;
    categoria?: string;
    maxPrice?: string;
  };

  let items = DB.products;

  if (categoria) {
    items = items.filter(p => p.category === categoria);
  }
  if (maxPrice) {
    const max = Number(maxPrice);
    items = items.filter(p => p.price <= max);
  }
  if (q) {
    const qLower = q.toString().toLowerCase();
    items = items.filter(p =>
      (p.name + " " + p.category).toLowerCase().includes(qLower)
    );
  }

  res.json(items);
});

// GET /catalog/products/:id
router.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const prod = DB.products.find(p => p.id === id);
  if (!prod) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(prod);
});

export default router;

