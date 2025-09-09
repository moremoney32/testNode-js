

import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });
interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

// 🔐 Middleware d'authentification basé sur le cookie JWT
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies.jwt;
  if (!token) {
   res.status(401).json({ error: "Non authentifié" });
  }

  try {
    const payload = jwt.verify(token, process.env.secretKey!) as JwtPayload;
    req.userId = payload.userId;
    return next();
  } catch (err) {
     res.status(401).json({ error: "Token invalide ou expiré" });
  }
}



