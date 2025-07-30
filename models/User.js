const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true, //unique
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        lowercase:true,
        trim:true

    },
    lastName:{
        type:String,
        lowercase:true,
        trim:true
    },
   isVerified:{
    type:Boolean,
    default:false
   },
   verificationCode:{
    type:String
   },
   verificationDate:{
    type:Date
   }
    
},{
    timestamps:true // ➔ ajoute automatiquement createdAt et updatedAt
})
module.exports = mongoose.model('User',userSchema)

//Le modèle : ne fait qu’énoncer la structure des documents.

//Le service : centralise toute la logique métier et validation, utilise throw pour remonter immédiatement une erreur.

//Le contrôleur : mince, appelle le service, extrait les données sûres, répond 201 ou fait next(err).

//next(err) : assure que toutes les erreurs, quel que soit leur point d’origine, aboutissent au même middleware d’erreur.