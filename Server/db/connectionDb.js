import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
 



dotenv.config();

export const connectDb = async () => {
  try {
    // Use Atlas in production, local MongoDB in development
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI_LOCAL;
       if (!uri) {
      throw new Error(
        `MongoDB URI not set. Check your .env or Render environment variables.`
      );
    }
    await mongoose.connect(uri);

    console.log("MongoDB connected:", uri);


  } catch (error) {
    console.error("Error connecting to db:", error.message);
    process.exit(1);
  }
}; 