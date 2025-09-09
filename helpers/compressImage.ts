// // // --- Compression Image ---
//  const sharp     = require('sharp');
//  const fs = require("fs")
// async function compressImage(srcPath) {
//   const dstPath = srcPath.replace(/(\.\w+)$/, '.min$1');
//   await sharp(srcPath)
//     .resize({ width: 1920, withoutEnlargement: true })
//     .jpeg({ quality: 80 })
//     .toFile(dstPath);
//   fs.unlinkSync(srcPath);
//   return dstPath;
// }
// module.exports =compressImage