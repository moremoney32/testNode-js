


// 1. Importations typées
import { Request, Response, NextFunction } from "express";
 const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { UserRegister, VerifyCode, UserLogin } from "../services/UserServices";
import User from "../models/User";
// import { IUser } from "../models/User"; // Type utilisateur

dotenv.config({ path: "../config/.env" });

// 2. Contrôleur d'inscription
export const UserControllers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userDoc = await UserRegister(req.body);
    
    // ✅ toObject() est une méthode mongoose pour rendre l’objet manipulable
    const { firstName, lastName, email } = userDoc.toObject();

    res.status(201).json({
      message: "Inscription réussie",
      user: { firstName, lastName, email },
    });
    console.log("Nouvel utilisateur inscrit :", email);
  } catch (err) {
    next(err);
  }
};

// 3. Contrôleur de déconnexion
export const logoutControllers = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.cookie("jwt", "", {
    maxAge: 1,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: false, // à mettre sur true en prod
  });

  res.json({ message: "Déconnexion réussie" });
};

// 4. Contrôleur de vérification de code
export const UserControllersVerifyCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await VerifyCode(req.body);

    res.status(201).json({
      message: "Code vérifié avec succès, vous pouvez actuellement vous connecter",
    });
  } catch (err) {
    next(err);
  }
};

// 5. Contrôleur de connexion
export const UserControllersLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userDoc = await UserLogin(req.body);

    // ✅ Signature du token JWT
    const token = jwt.sign(
      { userId: userDoc._id },
      process.env.secretKey as string, // on force le cast car secretKey peut être undefined
      { expiresIn: process.env.expiresInn }
    );

    const { firstName, lastName, email } = userDoc.toObject();

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_MAX_AGE),
      sameSite: "strict",
      path: "/",
      secure: false,
    });

    res.status(201).json({
      message: "Connexion réussie",
      user: { firstName, lastName, email },
    });
  } catch (err) {
    next(err);
  }
  
};

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function checkSession(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.userId).select('firstName lastName email');
    
    if (!user) {
      res.status(401).json({ authenticated: false });
      return;
    }

    res.json({
      authenticated: true,
      user: {
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email
      }
    });
  } catch (error) {
    console.error('Erreur dans checkSession:', error);
    res.status(500).json({ authenticated: false, error: 'Erreur interne du serveur' });
  }
}
