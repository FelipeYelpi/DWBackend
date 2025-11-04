
import { Router } from "express";
import { DB } from "../db";
import { Usuario } from "../models";

const router = Router();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };

  const exists = DB.users.find(u => u.email === email);
  if (exists) return res.status(400).json({ error: "Email ya registrado" });

  const newUser: Usuario = {
    id: DB.users.length ? DB.users[DB.users.length - 1].id + 1 : 1,
    name,
    email,
    password,
  };
  DB.users.push(newUser);
  res.status(201).json(newUser);
});

router.post("/login", (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = DB.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  res.json({
    token: "fake-token",
    user: { id: user.id, name: user.name, email: user.email },
  });
});

export default router;
