import app from "./app";
 require("dotenv").config({path:'./config/.env'});

app.listen(process.env.PORT,()=>console.log(`Notre terminal démarre sur le port  ${process.env.PORT}`));