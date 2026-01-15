import { connectDb } from "./db/connectionDb.js"
import bcrypt from "bcrypt"
import User from "./models/userModel.js"

const register = async() => {
    connectDb()
    const hashedPassword = await bcrypt.hash("admin", 10)
    const user = new User({
        name:"admin",
        email:"admin@gmail.com",
        password:hashedPassword,
        address:"address",
        role:"admin"
    })
    await user.save()
    console.log('new user created')
}
register()

