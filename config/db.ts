

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export const connectDB = async (): Promise<void> => {
     try {
     await mongoose.connect(process.env.MONGO_URI as string, {});
     console.log('Connected to MongoDB');
   } catch (err) {
     console.error('Mongo connection error:', err)
   
   }
};
