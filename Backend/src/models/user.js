import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: false})

const User = mongoose.model("User", userSchema)

export default User