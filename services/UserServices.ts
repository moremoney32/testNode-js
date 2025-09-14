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