// const User = require("../models/User")
// async function checkSession(req, res, next){
//   // req.userId est disponible grâce à requireAuth
//   const user = await User.findById(req.userId, "firstName lastName email");
//   if (!user) {
//     return res.status(401).json({ authenticated: false });
//   }
//   // on renvoie un objet user ne contenant que les champs demandés
//   res.json({
//     authenticated: true,
//     user: {
//       firstName: user.firstName,
//       lastName:  user.lastName,
//       email:     user.email
//     }
//   });
// };/////ceci nest pas un midleware cest un controlleur dans les normes...
// module.exports = checkSession;