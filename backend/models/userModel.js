import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    isadmin: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    profilepicture: String,
    coverpicture: String,
    about: String,
    liverin: String,
    worksat: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
}, { timestamps: true })

export default mongoose.model('Users', userSchema)