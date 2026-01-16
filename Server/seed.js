import { connectDb } from "./db/connectionDb.js"
import bcrypt from "bcrypt"
import User from "./models/userModel.js"

// const register = async() => {
//    try{
//      await connectDb()
//     const hashedPassword = await bcrypt.hash("admin", 10)
//     const user = new User({
//         name:"admin",
//         email:"admin@gmail.com",
//         password:hashedPassword,
//         address:"address",
//         role:"admin"
//     })
//     await user.save()
//     console.log('new user created')
//    }
//    catch(error){
// console.error("❌ Seeding failed:", error);
//     process.exit(1);
//    }
// }
// register() 
 

const register = async() => {
   try{
     console.log("Connecting to DB...");
     await connectDb()
     console.log("DB connected, creating user...");

     const hashedPassword = await bcrypt.hash("admin", 10)
     const user = new User({
        name:"admin",
        email:"admin@gmail.com",
        password:hashedPassword,
        address:"address",
        role:"admin"
     })

     await user.save()
     console.log('✅ New user created in Atlas')
   }
   catch(error){
     console.error("❌ Seeding failed:", error);
     process.exit(1);
   }
}
register()