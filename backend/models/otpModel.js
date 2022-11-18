import mongoose from "mongoose";

const optSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    type: { type: String, required: true },
    activation: { type: Boolean, required: true }
}, { timestamps: true })

export default mongoose.model('OTP', optSchema)