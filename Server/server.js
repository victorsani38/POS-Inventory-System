import dotenv from "dotenv"; dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDb } from "./db/connectionDb.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import supplierRoute from "./routes/supplierRoute.js";
import productRoute from "./routes/productRoute.js"
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js"

const app = express();

app.set("trust proxy", 1);

 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true})); 

const allowedOrigins = [ "http://localhost:5173" ];
if(process.env.NODE_ENV === "production"){
    allowedOrigins.push(process.env.FRONTEND_URL); // set this in Vercel env
}
 
app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials:true
}));


const PORT = process.env.PORT || 1000
app.use("/api/users", authRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/suppliers", supplierRoute)
app.use("/api/products", productRoute) 
app.use("/api/profiles", userRoute)
app.use("/api/orders", orderRoute)
app.use('/api/dashboard', dashboardRoute)

app.listen(PORT, () => {
    connectDb()
    console.log(`Server running on http://localhost:${PORT}`)
})