
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import catalogRoutes from "./routes/catalog";
import cartRoutes from "./routes/cart";
import orderRoutes from "./routes/orders";
import paymentRoutes from "./routes/payments";
import invoiceRoutes from "./routes/invoices";
import trackingRoutes from "./routes/tracking";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/error";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/catalog", catalogRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/tracking", trackingRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Flor & Vida API en http://localhost:${PORT}`);
});
