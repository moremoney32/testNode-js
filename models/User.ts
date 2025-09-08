// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//     email:{
//         type:String,
//         required:true,
//         unique:true, //unique
//         lowercase:true,
//         trim:true
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     firstName:{
//         type:String,
//         lowercase:true,
//         trim:true

//     },
//     lastName:{
//         type:String,
//         lowercase:true,
//         trim:true
//     },
//    isVerified:{
//     type:Boolean,
//     default:false
//    },
//    verificationCode:{
//     type:String
//    },
//    verificationDate:{
//     type:Date
//    }
    
// },{
//     timestamps:true // ➔ ajoute automatiquement createdAt et updatedAt
// })
// module.exports = mongoose.model('User',userSchema)

// //Le modèle : ne fait qu’énoncer la structure des documents.

// //Le service : centralise toute la logique métier et validation, utilise throw pour remonter immédiatement une erreur.

// //Le contrôleur : mince, appelle le service, extrait les données sûres, répond 201 ou fait next(err).

// //next(err) : assure que toutes les erreurs, quel que soit leur point d’origine, aboutissent au même middleware d’erreur.


import mongoose, { Schema, Document } from "mongoose";

// 1. Définir une interface TypeScript pour typer les utilisateurs
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  verificationCode?: string;
  verificationDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Définir le schéma mongoose
const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    verificationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Exporter le modèle avec son type
const User = mongoose.model<IUser>("User", userSchema);
export default User;
