import User from "../models/user.js"
import bcrypt from "bcrypt"

export async function createAccount(req, res){
    try {
        const {number, password} = req.body
        if(!number.trim() || !password.trim()){
            res.status(400).json({message: "Phone number and password are required."})
        }

        const oldUser = await User.findOne({number})
        if(oldUser){
            res.status(409).json({message: "User with the Phone Number already exist"})
        } else{
           const newPassword = await bcrypt.hash(password, 10) 
           const newUser = new User({ number, password: newPassword });
           const savedUser = await newUser.save();
           res.status(201).json(savedUser);
           console.log("Account created successfully");           
        }
        
    } catch (error) {
        console.error("Error creating account", error);
        res.status(500).json({message: "internal server error"})
    }
}

export async function LoginAccount(req, res){
    try {
        const {number, password} = req.body
       if (!number || !password) {
            return res.status(400).json({ message: "Phone number and password are required." });
        }
        const user = await User.findOne({number})
        if(!user){
            res.status(404).json({message: "user cannot be found"})
            console.log("user not found");
        } else{
            res.status(200).json({message: "Login successful", userId: user._id})
            console.log("Login successful");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(isPasswordMatch){
            res.status(200).json({message: "Login successful", userId: user._id})
            console.log("Login successful");
        } else{
            res.status(401).json({message: "wrong login details"})
            console.log("wrong login details");
        }
    } catch (error) {
        console.error("invalid credentials", error);
        res.status(500).json({message: "internal server error"})
    }
}