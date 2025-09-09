// // // // --- Compression Vidéo ---
// // const ffmpeg    = require('fluent-ffmpeg');
// //  const fs = require("fs")
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
// // module.exports = compressVideo
// const ffmpeg    = require('fluent-ffmpeg');
//  const fs = require("fs")

// function compressVideo(srcPath) {
//   return new Promise((resolve, reject) => {
//     const dstPath = srcPath.replace(/(\.\w+)$/, '.min.mp4');
//     ffmpeg(srcPath)
//       .videoCodec('libx264')
//       .size('?x720')
//       .outputOptions('-crf 23')
//       .save(dstPath)
//       .on('end', () => {
//         fs.unlinkSync(srcPath);
//         resolve(dstPath);
//       })
//       .on('error', err => {
//         console.error("== fluent-ffmpeg error:", err);
//         reject(err);
//       });
//   });
// }
// module.exports = compressVideo
