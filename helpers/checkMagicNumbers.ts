// // Fonction de vérification des signatures
// const fs = require("fs")
// function checkMagicNumbers(filePath, expectedType) {
//   try {
//     const buffer = fs.readFileSync(filePath, { length: 12 }); // Lire 12 premiers octets
    
//     const signatures = {
//       'image/jpeg': [Buffer.from([0xFF, 0xD8, 0xFF])], // JPEG
//       'image/png': [Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])], // PNG
//       'video/mp4': [
//         Buffer.from([0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34]), // MP4
//         Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]) // MP4 alternative
//       ],
//       'video/quicktime': [
//         Buffer.from([0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x71, 0x74, 0x20]), // MOV
//         Buffer.from([0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70]) // MOV alternative
//       ],
//       'video/x-msvideo': [Buffer.from([0x52, 0x49, 0x46, 0x46])] // AVI ('RIFF')
//     };//documentation

//     const expectedSignatures = signatures[expectedType];
//     if (!expectedSignatures) return false;

//     return expectedSignatures.some(sig => 
//       buffer.slice(0, sig.length).equals(sig)
//     );
//   } catch (err) {
//     console.error("Erreur de vérification:", err);
//     return false;
//   }
// }
// module.exports = checkMagicNumbers


// // Nous avons un objet `signatures` qui mappe des types MIME (comme 'image/jpeg') vers un tableau de signatures possibles (chaque signature est un Buffer).
// //  Le paramètre `expectedType` est le type MIME du fichier (par exemple, 'image/jpeg' pour un fichier JPEG).
// //  Donc, `signatures[expectedType]` va chercher dans l'objet `signatures` la valeur associée à la clé `expectedType`.
// //  Par exemple, si `expectedType` est 'image/jpeg', alors `signatures['image/jpeg']` renvoie :
// //       [Buffer.from([0xFF, 0xD8, 0xFF])]
// //  Si le type MIME n'est pas dans notre objet `signatures` (par exemple, si on reçoit un type MIME inattendu comme 'image/gif'), alors `signatures[expectedType]` sera `undefined`.
// //  D'où la vérification : `if (!expectedSignatures) return false;` → on retourne false car on ne connaît pas les signatures pour ce type.
// //  Ensuite, `expectedSignatures` est un tableau de Buffers (même s'il n'y a qu'une signature, c'est un tableau d'un élément).
// //  On utilise `.some(...)` pour vérifier si au moins une des signatures dans ce tableau correspond au début du fichier.
// //  Pour chaque signature dans le tableau `expectedSignatures` :
// //    - On prend le début du buffer du fichier (les premiers `sig.length` octets) avec `buffer.slice(0, sig.length)`
// //    - On compare avec `sig` (la signature attendue) avec `.equals(sig)`
// //  Si l'une des signatures correspond, on retourne true. Sinon, on retourne false.
// //  Exemple concret pour un JPEG :
// //    - `expectedSignatures` = [ <Buffer ff d8 ff> ]
// //    - On prend les 3 premiers octets du fichier : `buffer.slice(0, 3)`
// //    - On compare avec <Buffer ff d8 ff> → si c'est égal, alors c'est un vrai JPEG.