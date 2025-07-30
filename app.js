const express = require("express");
const app = express();
const connectDB = require('./config/db');
const routes = require("./routes/router")
const cors = require("cors");
const path = require("path")
const cookieParser = require("cookie-parser");
require("dotenv").config({path:'./config/.env'});
connectDB();
//Configuration de CORS
const corsOptions = {
  origin: "*", // Autoriser les requêtes provenant de cette URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Custom-Header"] // Autoriser les cookies
};

app.use(cors(corsOptions)); // Utiliser les options de CORS
app.use(express.json());
app.use(cookieParser());
 app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use("/api",routes);
app.use((err, req, res, next) => {
  console.error(err);   // toujours journaliser pour debug
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || 'Erreur serveur' });
});

app.listen(process.env.PORT,()=>console.log(`Notre terminal démarre sur le port  ${process.env.PORT}`));
