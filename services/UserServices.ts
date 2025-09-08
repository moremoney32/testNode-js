//  const validator = require("validator");
//  const bcrypt = require("bcrypt");
import validator from "validator";
import bcrypt from "bcrypt";
// const User = require("../models/User");
// const sendVerificationEmail = require("../helpers/sendVerificationEmail");
// import validator from "validator";
// import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import sendVerificationEmail from "../helpers/sendVerificationEmail";
type UserRegisterInput = {
    email:string,
    password:string,
    firstName:string,
    lastName:string
}
type VerifyInput = {
    email:string,
    code:number|string
}
type LoginInput = {
    email:string,
    password:string
}


export async function UserRegister({email,password,firstName,lastName}:UserRegisterInput):Promise<Promise<IUser>>{
    const checkInput = [];
    if(!email) checkInput.push(email);
    if(!password) checkInput.push(password)
    if(!firstName) checkInput.push(firstName)
    if(!lastName) checkInput.push(lastName)
        if(checkInput.length){
            const err = new Error(`Champ(s) manquant(s) : ${checkInput.join(", ")}`);
    (err as any).statusCode = 400;
    throw err;
            // const err  = new Error(`Champ(s) manquant(s) ${checkInput.join(",")}`)//join Convertir un tableau en une chaîne de caractères, en concaténant ses éléments avec un séparateur spécifié.
            // err.statusCode = 400;
            // throw err //interrompt le flot normal et fait remonter l’erreur directement au catch du contrôleur
        }
        //Validation de la forme de l’e-mail
        if(!validator.isEmail(email)){
            // const err = new Error("Adresse  e-mail invalide")
            // err.statusCode = 422
            // throw err
            const err = new Error("Adresse e-mail invalide");
    (err as any).statusCode = 422;
    throw err;
        }
        //   //  3) Vérification de la force du mot de passe
        // const pwdOpts = {minLengt:8,minUppercase:1,minSymbols:1,minNumbers:1}
        // if(!validator.isStrongPassword(password,pwdOpts)){
        //     const err = new Error("Mot de passe trop faible : 8+ chars, 1 majuscule, 1 chiffre,1 symbole")
        //     err.statusCode = 422
        //     throw err
        // }
        // //  4) On s’assure qu’aucun utilisateur n’existe déjà avec cet e-mail
        // if(await User.exists({email})){
        //     const err = new Error("Cette adresse e-mail est déjà utilisée");
        //     err.statusCode = 409;             
        //     throw err;
        // } 
        //  //5) Tout est OK, on hash le mot de passe
        //  const hasPwd = await bcrypt.hash(password,10);
        //  const code = String(Math.floor(1000 + Math.random() * 9000));    // 4 chiffres
        // const expires = new Date(Date.now() + 10 * 60 * 1000);            // +10 minutes
        //  // 6) Puis on crée et renvoie l’utilisateur
        // const user = await User.create({
        //     email,
        //     password:hasPwd,
        //     firstName,lastName,
        //     verificationCode:code,
        //     verificationDate: expires
        //  })
        //   await sendVerificationEmail(email, code);
         const pwdOpts = { minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 };
  if (!validator.isStrongPassword(password, pwdOpts)) {
    const err = new Error("Mot de passe trop faible : 8+ chars, 1 majuscule, 1 chiffre, 1 symbole");
    (err as any).statusCode = 422;
    throw err;
  }

  if (await User.exists({ email })) {
    const err = new Error("Cette adresse e-mail est déjà utilisée");
    (err as any).statusCode = 409;
    throw err;
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const code = String(Math.floor(1000 + Math.random() * 9000));
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    email,
    password: hashedPwd,
    firstName,
    lastName,
    verificationCode: code,
    verificationDate: expires,
  });

  await sendVerificationEmail(email, code);
  return user;
}
// async function VerifyCode({email,code}){
//     const userDoc = await User.findOne({email})  
//       if(!userDoc){
//             const err = new Error("Cette adresse e-mail n 'existe pas");
//             err.statusCode = 409;             
//             throw err;
//         }
//         if(userDoc.verificationCode !== code){
//             const err = new Error("code invalide");
//             err.statusCode = 404
//             throw err;
//         }
        
//          if(userDoc.verificationDate < new Date()){
//             const err = new Error("le code a expiré");
//             err.statusCode = 410
//             throw err;
//         }
//         ///si tout est ok : 
//         userDoc.isVerified = true;
//         userDoc.verificationCode = undefined
//         userDoc.verificationDate = undefined
//         await userDoc.save()
//         return userDoc

// }
export async function VerifyCode({ email, code }: VerifyInput): Promise<IUser> {
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    const err = new Error("Cette adresse e-mail n'existe pas");
    (err as any).statusCode = 409;
    throw err;
  }

  if (userDoc.verificationCode !== code) {
    const err = new Error("Code invalide");
    (err as any).statusCode = 404;
    throw err;
  }

  if (userDoc.verificationDate && userDoc.verificationDate < new Date()) {
    const err = new Error("Le code a expiré");
    (err as any).statusCode = 410;
    throw err;
  }

  userDoc.isVerified = true;
  userDoc.verificationCode = undefined;
  userDoc.verificationDate = undefined;
  await userDoc.save();

  return userDoc;
}

// async function UserLogin ({email,password}){
//     const userDoc = await User.findOne({email})
//     if(!userDoc){
//         const err = new Error("cette adtesse email n existe pas");
//         err.statusCode = 404
//         throw err
//     }
//     if(userDoc.isVerified === false){
//         const err = new Error("veuillez terminer l inscription");
//         err.statusCode = 410
//         throw err
//     }
//     ////tout est ok
//      const hasPwd = await bcrypt.hash(password,10);
//     userDoc.password = hasPwd
//     return userDoc

// }

export async function UserLogin({ email, password }: LoginInput): Promise<IUser> {
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    const err = new Error("Cette adresse e-mail n'existe pas");
    (err as any).statusCode = 404;
    throw err;
  }

  if (!userDoc.isVerified) {
    const err = new Error("Veuillez terminer l'inscription");
    (err as any).statusCode = 410;
    throw err;
  }

  // ⚠️ Correction importante : il faut comparer, pas re-hasher le mot de passe !
  const match = await bcrypt.compare(password, userDoc.password);
  if (!match) {
    const err = new Error("Mot de passe incorrect");
    (err as any).statusCode = 401;
    throw err;
  }

  return userDoc;
}
// module.exports = {UserRegister,VerifyCode,UserLogin}