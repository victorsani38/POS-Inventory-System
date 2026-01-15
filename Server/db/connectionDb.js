import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

// export const connectDb = async()=> {
//     try{
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log('db connected')
//     }
//     catch(error){
//         console.error('Error connecting to db', error)
//         process.exit(1)
//     }
// }



dotenv.config();

export const connectDb = async () => {
  try {
    // Use Atlas in production, local MongoDB in development
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI_LOCAL;

    await mongoose.connect(uri);

    console.log("MongoDB connected:", uri);
    console.log("MONGO_URI on Render:", process.env.MONGO_URI);

  } catch (error) {
    console.error("Error connecting to db:", error.message);
    process.exit(1);
  }
}; 