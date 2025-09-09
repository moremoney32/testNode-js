// // --- Middleware complet pour Express ---
// // // --- Configuration Multer ---
// const path      = require('path');
// const fs        = require('fs');
// const multer    = require('multer');
// const dotenv = require("dotenv")
// dotenv.config({path:"../config/.env"})
// const checkMagicNumbers = require("../helpers/checkMagicNumbers")
// const compressVideo = require("../helpers/compressVideo")
// const compressImage = require("../helpers/compressImage")

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const folder = file.mimetype.startsWith('image/') ? 'images' : 'videos';
//     const dir = path.join(__dirname, '../public/uploads', folder);
//     fs.mkdirSync(dir, { recursive: true });
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + '-' + file.fieldname + ext);
//   }
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 20 * 1024 * 1024, // max 20 Mo pour tous types
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedImageTypes = ['image/jpeg', 'image/png'];
//     const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    
//     const isImage = allowedImageTypes.includes(file.mimetype);
//     const isVideo = allowedVideoTypes.includes(file.mimetype);
    
//     if (
//       isImage || isVideo
//     ) cb(null, true);
//     else cb(new Error('Type non autorisé'), false);
//   }
// });
// // async function handleUpload(req, res, next) {
// //   try {
// //     await upload.single('file')(req, res, async err => {
// //       if (err) return next(err);
// //       let filePath = req.file.path;
// //       const mimeType = req.file.mimetype;
// //       const isImage = req.file.mimetype.startsWith('image/');
// //       const isVideo = req.file.mimetype.startsWith('video/');
// //        // Vérification de la signature
// //       const isValid = checkMagicNumbers(filePath, mimeType);
// //       if (!isValid) {
// //         fs.unlinkSync(filePath);
// //         return res.status(415).json({ 
// //           error: "Signature de fichier invalide. Le fichier peut être corrompu ou falsifié" 
// //         });
// //       }


// //       // **Limites avant compression**  
// //       const maxImg = 10 * 1024 * 1024;
// //       const maxVid = 20 * 1024 * 1024;
// //       if (isImage && req.file.size > maxImg) {
// //         filePath = await compressImage(filePath);
// //       }
// //       else if(isVideo && req.file.size > maxVid) {
// //         filePath = await compressVideo(filePath);
// //       }

// //       // **Switch Cloud vs Local**  
// //     //   if (process.env.USE_CLOUD === 'true') {
// //     //     const key = path.basename(filePath);
// //     //     const url = await uploadToS3(filePath, key);
// //     //     return res.json({ url });
// //     //   } 
    
// //      const fileName = path.basename(filePath);
      
// //       // 3. Déterminer le type de média
// //       const mediaType = isImage ? 'images' : 'videos';
      
// //       // 4. Construire l'URL complète
// //       const url = `http://localhost:${process.env.PORT}/uploads/${mediaType}/${fileName}`;
      
// //       // Stocker l'URL dans la requête
// //       req.fileUrl = url;
// //       next();
      
// //     });
// //   } catch (e) {
// //     next(e);
// //   }
// // }

// async function handleUpload(req, res, next) {
//   try {
//     await upload.single('file')(req, res, async err => {
//       if (err) {
//         if (err.code === 'LIMIT_FILE_SIZE') {
//           return res.status(413).json({ 
//             error: "Fichier trop volumineux (max 20MB)" 
//           });
//         }
//         return next(err);
//       }
      
//       if (!req.file) {
//         return res.status(400).json({ error: "Aucun fichier fourni" });
//       }
      
//       let filePath = req.file.path;
//       const mimeType = req.file.mimetype;
//       const fileSize = req.file.size;
//       const isImage = mimeType.startsWith('image/');
//       const isVideo = mimeType.startsWith('video/');
      
//       // Vérification de la signature
//       const isValid = checkMagicNumbers(filePath, mimeType);
//       if (!isValid) {
//         fs.unlinkSync(filePath);
//         return res.status(415).json({ 
//           error: "Signature de fichier invalide. Le fichier peut être corrompu ou falsifié" 
//         });
//       }

//       // Définir les limites selon vos exigences
//       const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 Mo
//       const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20 Mo
//       const COMPRESS_IMAGE_THRESHOLD = 5 * 1024 * 1024; // 5 Mo
//       const COMPRESS_VIDEO_THRESHOLD = 10 * 1024 * 1024; // 10 Mo

//       // Vérification et traitement des images
//       if (isImage) {
//         if (fileSize > MAX_IMAGE_SIZE) {
//           fs.unlinkSync(filePath);
//           return res.status(413).json({ 
//             error: "L'image dépasse la taille maximale de 10 Mo" 
//           });
//         }
//         else if (fileSize > COMPRESS_IMAGE_THRESHOLD) {
//           try {
//             filePath = await compressImage(filePath);
//           } catch (compressError) {
//             fs.unlinkSync(req.file.path);
//             return res.status(500).json({ 
//               error: "Échec de la compression de l'image" 
//             });
//           }
//         }
//       }
      
//       // Vérification et traitement des vidéos
//       if (isVideo) {
//         if (fileSize > MAX_VIDEO_SIZE) {
//           fs.unlinkSync(filePath);
//           return res.status(413).json({ 
//             error: "La vidéo dépasse la taille maximale de 20 Mo" 
//           });
//         }
//         else if (fileSize > COMPRESS_VIDEO_THRESHOLD) {
//           try {
//             filePath = await compressVideo(filePath);
//           } catch (compressError) {
//             fs.unlinkSync(req.file.path);
//             return res.status(500).json({ 
//               error: "Échec de la compression de la vidéo" 
//             });
//           }
//         }
//       }

//       // Générer l'URL
//       const fileName = path.basename(filePath);
//       const mediaType = isImage ? 'images' : 'videos';
//       const url = `http://localhost:${process.env.PORT}/uploads/${mediaType}/${fileName}`;
      
//       // Stocker l'URL dans la requête
//       req.fileUrl = url;
//       next();
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// module.exports = handleUpload;
