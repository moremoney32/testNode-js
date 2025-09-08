
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config({path:"../config/.env"})
// /**
//  * Vérifie la présence et la validité du cookie `token`.
//  * Si tout est bon, injecte `req.userId` et appelle `next()` pour passer
//  * au middleware ou au contrôleur suivant dans la chaîne.
//  */
// export async function requireAuth(req, res, next) {
//   // 1) Récupération du token dans les cookies
//   //    Express (avec cookie‑parser) a déjà décodé les cookies dans req.cookies.
//   const token = req.cookies.jwt;

//   // 2) Si pas de token, on renvoie 401 Unauthorized
//   if (!token) {
//     return res.status(401).json({ error: "Non authentifié" });
//   }

//   try {
//     // 3) Vérification du JWT
//     //    - jwt.verify() vérifie la signature du token avec notre secret
//     //    - s’il est expiré ou falsifié, ça lèvera une exception
//     const payload = jwt.verify(token, process.env.secretKey);

//     // 4) On récupère les données de l’utilisateur stockées dans le token
//     //    Lors de la génération du token (à la connexion), on avait fait quelque chose comme :
//     //      jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
//     //    Ici, payload.userId contient donc l’ID Mongo du user.
//     //
//     //    On l’attache à req pour que les contrôleurs puissent savoir
//     //    « qui » fait la requête sans avoir à reparcourir la base.
//     req.userId = payload.userId;

//     // 5) Tout est ok, on appelle next()
//     //    Ça permet à Express de passer au prochain middleware ou au handler de route.
//     return next();

//   } catch (err) {
//     // 6) En cas de jwt.verify() qui échoue (token invalide ou expiré)
//     return res.status(401).json({ error: "Token invalide ou expiré" });
//   }
// }

// // module.exports = requireAuth;

// // services/upload.js
// // require('dotenv').config();
// // const path      = require('path');
// // const fs        = require('fs');
// // const multer    = require('multer');
// // const sharp     = require('sharp');
// // const ffmpeg    = require('fluent-ffmpeg');
// // const AWS       = require('aws-sdk');

// // // --- Configuration Multer ---
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const folder = file.mimetype.startsWith('image/') ? 'images' : 'videos';
// //     const dir = path.join(__dirname, '../public/uploads', folder);
// //     fs.mkdirSync(dir, { recursive: true });
// //     cb(null, dir);
// //   },
// //   filename: (req, file, cb) => {
// //     const ext = path.extname(file.originalname);
// //     cb(null, Date.now() + '-' + file.fieldname + ext);
// //   }
// // });
// // const upload = multer({
// //   storage,
// //   limits: {
// //     fileSize: 20 * 1024 * 1024, // max 20 Mo pour tous types
// //   },
// //   fileFilter: (req, file, cb) => {
// //     if (
// //       file.mimetype.startsWith('image/') ||
// //       file.mimetype.startsWith('video/')
// //     ) cb(null, true);
// //     else cb(new Error('Type non autorisé'), false);
// //   }
// // });

// // // --- Compression Image ---
// // async function compressImage(srcPath) {
// //   const dstPath = srcPath.replace(/(\.\w+)$/, '.min$1');
// //   await sharp(srcPath)
// //     .resize({ width: 1920, withoutEnlargement: true })
// //     .jpeg({ quality: 80 })
// //     .toFile(dstPath);
// //   fs.unlinkSync(srcPath);
// //   return dstPath;
// // }

// // // --- Compression Vidéo ---
// // function compressVideo(srcPath) {
// //   return new Promise((res, rej) => {
// //     const dstPath = srcPath.replace(/(\.\w+)$/, '.min.mp4');
// //     ffmpeg(srcPath)
// //       .videoCodec('libx264')
// //       .size('?x720')
// //       .outputOptions('-crf 23')
// //       .save(dstPath)
// //       .on('end', () => {
// //         fs.unlinkSync(srcPath);
// //         res(dstPath);
// //       })
// //       .on('error', rej);
// //   });
// // }

// // // --- Upload vers S3 si en cloud ---
// // const s3 = new AWS.S3({
// //   accessKeyId:     process.env.AWS_KEY,
// //   secretAccessKey: process.env.AWS_SECRET,
// //   region:          process.env.AWS_REGION,
// // });
// // async function uploadToS3(localPath, remoteKey) {
// //   const Body = fs.readFileSync(localPath);
// //   await s3.upload({
// //     Bucket: process.env.AWS_BUCKET,
// //     Key:    remoteKey,
// //     Body,
// //     ACL:    'public-read'
// //   }).promise();
// //   fs.unlinkSync(localPath);
// //   return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${remoteKey}`;
// // }

// // // --- Middleware complet pour Express ---
// // async function handleUpload(req, res, next) {
// //   try {
// //     await upload.single('file')(req, res, async err => {
// //       if (err) return next(err);

// //       let filePath = req.file.path;
// //       const isImage = req.file.mimetype.startsWith('image/');
// //       const isVideo = req.file.mimetype.startsWith('video/');

// //       // **Limites avant compression**  
// //       const maxImg = 10 * 1024 * 1024;
// //       const maxVid = 20 * 1024 * 1024;
// //       if (isImage && req.file.size > maxImg) {
// //         filePath = await compressImage(filePath);
// //       }
// //       if (isVideo && req.file.size > maxVid) {
// //         filePath = await compressVideo(filePath);
// //       }

// //       // **Switch Cloud vs Local**  
// //       if (process.env.USE_CLOUD === 'true') {
// //         const key = path.basename(filePath);
// //         const url = await uploadToS3(filePath, key);
// //         return res.json({ url });
// //       } else {
// //         // URL publique locale
// //         const url = `/uploads/${isImage ? 'images' : 'videos'}/${path.basename(filePath)}`;
// //         return res.json({ url });
// //       }
// //     });
// //   } catch (e) {
// //     next(e);
// //   }
// // }

// // module.exports = handleUpload;


// ✅ TypeScript + Middleware Express : Fichier requireAuth.ts

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



