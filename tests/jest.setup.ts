import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: "test",
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});
