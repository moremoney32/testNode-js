// const express = require("express");
// const requireAuth = require("../middleware/requiredAuth");
// const checkSession = require("../middleware/checkSession");
// const {UserControllers,UserControllersVerifyCode,UserControllersLogin,logoutControllers} = require("../controllers/UserControllers");
// const handleUpload = require("../middleware/handleUpload");
// const MediaControllers = require("../controllers/MediaControllers");
// const router = express.Router();
// 1// POST /api/register
// // 1) Routes publiques (pas de token requis)
// router.post("/register",UserControllers);
// router.post("/verifyCode",UserControllersVerifyCode);
// router.post("/login",UserControllersLogin);
// router.use(requireAuth);
// // 3) Routes privées (toutes exigent un token valide)
// router.get("/check-session",checkSession);
// router.get("/logout",logoutControllers);
// router.post("/upload",handleUpload,MediaControllers);

// module.exports = router;


// 1. Importations typées
import express, { Router } from "express";
// import requireAuth from "../middleware/requiredAuth";
// import checkSession from "../middleware/checkSession";
// import handleUpload from "../middleware/handleUpload";

import {
  UserControllers,
  UserControllersVerifyCode,
  UserControllersLogin,
  logoutControllers,
  checkSession,
} from "../controllers/UserControllers";

// import MediaControllers from "../controllers/MediaControllers";
import { requireAuth } from "../middleware/requiredAuth";

// 2. Création du routeur typé
const router: Router = express.Router();

/* 
╔════════════════════════════════════════════════════════════════════╗
║                     ROUTES PUBLIQUES                              ║
╚════════════════════════════════════════════════════════════════════╝
*/
// 3. Inscription d'un utilisateur
router.post("/register", UserControllers);

// 4. Vérification de code
router.post("/verifyCode", UserControllersVerifyCode);
// 5. Connexion d'un utilisateur
router.post("/login", UserControllersLogin);

/* 
╔════════════════════════════════════════════════════════════════════╗
║                     MIDDLEWARE GLOBAL : requireAuth               ║
╚════════════════════════════════════════════════════════════════════╝
*/
// Toutes les routes ci-dessous sont protégées (token requis)
    router.use(requireAuth);

/* 
╔════════════════════════════════════════════════════════════════════╗
║                     ROUTES PROTÉGÉES                              ║
╚════════════════════════════════════════════════════════════════════╝
*/
// 6. Vérifie la session utilisateur
  router.get("/checkSession", checkSession);
// router.get("/check-session", requireAuth, checkSession);

// // 7. Déconnexion
 router.get("/logout", logoutControllers);

// // 8. Upload de fichier (avec multer ou autre)
// router.post("/upload", handleUpload, MediaControllers);

// 9. Export du routeur
export default router;
