import mongoose from 'mongoose'

const postModel = mongoose.Schema({
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
}, { timestamps: true })

export default mongoose.model("Posts", postModel)