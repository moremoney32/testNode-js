
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import cors, { type CorsOptions } from "cors";
import routes from "./routes/router";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./config/.env" });
 connectDB();
// Connexion à la base de données


const app: Application = express();

// Configuration de CORS
const corsOptions: CorsOptions = {
  origin: "*", // à restreindre en prod (ex: ["https://tonsite.com"])
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Custom-Header"
  ],
};

// Middlewares globaux
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.get("/", (req, res) => {
  res.send("🚀 automatisation !");
});

// Routes
app.use("/api", routes);

// Gestion des erreurs
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "Erreur serveur" });
});

export default app;

// Si tu veux écouter dans ce fichier (plutôt dans index.ts généralement) :
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
