const  {UserRegister,VerifyCode,UserLogin} = require("../services/UserServices");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path:"../config/.env"})

async function UserControllers(req,res,next){
    try {
        const userDoc = await UserRegister(req.body);
       const {firstName,lastName,email} = userDoc.toObject();//toObject qui permet de rendre un document en objet
       res.status(201).json({message:"Inscription reussie",user:{firstName,lastName,email}});
        
    } catch (err) {
        next(err)  
    }
}
const logoutControllers = async(req, res) => {
  // On écrase le cookie "jwt" avec une valeur vide et une durée de vie très courte
  res.cookie("jwt", "", {
    maxAge: 1,       // 1ms pour expirer immédiatement
    httpOnly: true,  // même options que pour le cookie d’authent
    path: "/",       // doit correspondre au `path` initial
    sameSite: "strict",
    secure: false,   // true en prod HTTPS
  });
  // Puis on redirige ou on renvoie une réponse JSON
  // Si c’est une API JSON-only, fait plutôt un res.json(...)
  return res.json({ message: "Déconnexion réussie" });
};


async function UserControllersVerifyCode(req,res,next){
    try {
         await VerifyCode(req.body);
       res.status(201).json({message:"code verifié avec succes ,vous pouvez actuellement vous connecter"});
        
    } catch (err) {
        next(err)
        
    }
}




async function UserControllersLogin(req,res,next){
    try {
        const userDoc = await UserLogin(req.body);
        const token = jwt.sign({userId:userDoc._id},process.env.secretKey,  {expiresIn:process.env.expiresInn})
       const {firstName,lastName,email} = userDoc.toObject();
        res.cookie("jwt", token, {
                httpOnly:true,
                maxAge: Number(process.env.COOKIE_MAX_AGE),  // 1 296 000 000 ms = 15 jours,
                sameSite: 'strict',
                // domain: "tchouta-social.onrender.com", // Remplacer par votre domaine réel
                path: "/",// Accessible sur toutes les routes 
                secure:false//je vais mettre a true quand je serais en https.
              });
       res.status(201).json({message:"connexion reussie",user:{firstName,lastName,email}});
        
    } catch (err) {
        next(err)  
    }
}
module.exports = {UserControllers,UserControllersVerifyCode,UserControllersLogin,logoutControllers}