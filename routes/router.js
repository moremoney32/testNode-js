const express = require("express");
const requireAuth = require("../middleware/requiredAuth");
const checkSession = require("../middleware/checkSession");
const {UserControllers,UserControllersVerifyCode,UserControllersLogin,logoutControllers} = require("../controllers/UserControllers");
const handleUpload = require("../middleware/handleUpload");
const MediaControllers = require("../controllers/MediaControllers");
const router = express.Router();
1// POST /api/register
// 1) Routes publiques (pas de token requis)
router.post("/register",UserControllers);
router.post("/verifyCode",UserControllersVerifyCode);
router.post("/login",UserControllersLogin);
router.use(requireAuth);
// 3) Routes privées (toutes exigent un token valide)
router.get("/check-session",checkSession);
router.get("/logout",logoutControllers);
router.post("/upload",handleUpload,MediaControllers);

module.exports = router;