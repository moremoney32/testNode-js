 const mongoose = require("mongoose");
 require("dotenv").config({path:"./.env"})
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Mongo connection error:', err)
   
  }
}

module.exports = connectDB;