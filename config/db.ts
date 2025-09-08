//  const mongoose = require("mongoose");
//  require("dotenv").config({path:"./.env"})
// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//     });
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Mongo connection error:', err)
   
//   }
// }

// module.exports = connectDB;
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config({ path: "./.env" });

// export async function connectDB(): Promise<void> {
//   try {
//     await mongoose.connect(process.env.MONGO_URI as string, {});
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.error("Mongo connection error:", err);
//   }
// }
// config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Laisse ça, mais ne fais pas appel à la fonction automatiquement

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "test", // optionnel selon environnement
    });
    console.log("✅ Connexion MongoDB réussie");
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB :", err);
    process.exit(1);
  }
};
