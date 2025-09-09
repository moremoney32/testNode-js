// import User from "../models/User"
// import Media from "../models/Media"

// async function MediaControllers(req,res){
//     // on verifie si le fichier a ete uploadé
//     if(!req.file){
//         return res.status(400).json({message:"Aucun fichier trouvé"})
//     }
//     //rechercher le user
//     const user = await User.findById(req.userId)
//     if(!user) return res.status(400).json({message:"Le user n'existe pas"})
//         console.log(user)
//     // Déterminer le type de média
//     const mediaType = req.file.mimetype.startsWith('image/') ?"image":"video"
//     const media = await Media.create({
//         user:user.firstName,
//         owner:req.userId,
//         type:mediaType,
//         url:req.fileUrl
//     })
//     res.status(201).json({message:"Fichier upload avec succes",media})


// }
// module.exports = MediaControllers