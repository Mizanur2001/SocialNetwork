import mongoose from 'mongoose'
import postModel from '../models/postModels.js'
import userModel from '../models/userModel.js'

const postController = () => {
    return {
        async createPost(req, res) {
            const newPost = new postModel(req.body)
            //taking user id from jwt token
            newPost.userId = req.user.user.id
            try {
                const user = await userModel.findById(newPost.userId)
                const { firstname, lastname, username } = user
                newPost.userInfo = { firstname, lastname, username }
                if (user != null) {
                    await newPost.save();
                    res.send("Post Created")
                }
                else {
                    res.status(404).send("User not found")
                }

            } catch (error) {
                res.status(500).send(error)
            }
        },
        async getPost(req, res) {
            const postId = req.params.id
            try {
                const post = await postModel.findById(postId)
                res.send(post)
            } catch (error) {
                res.status(500).send(error)
            }
        },
        async updatePost(req, res) {
            const postId = req.params.id
            const { userId, likes } = req.body
            try {
                const post = await postModel.findById(postId)
                if (post.userId === userId) {
                    if (likes || likes == '') {
                        return res.status(403).send("Action forbidden")
                    }
                    await post.updateOne({ $set: req.body })
                    res.status(200).send("Post Updated Successfully")
                }
                else {
                    res.status(403).send("Access Denied")
                }
            } catch (error) {
                res.status(500).send(error)
            }
        },
        async deletePost(req, res) {
            const postId = req.params.id
            const { userId } = req.body
            try {
                const post = await postModel.findById(postId)
                if (post.userId === userId) {
                    await post.deleteOne()
                    res.send("Post deleted Successfully")
                }
                else {
                    res.status(403).send("Access Denied")
                }
            } catch (error) {
                res.status(500).send(error)
            }
        },
        async likeDislikePost(req, res) {
            const postId = req.params.id
            const { userId } = req.body
            try {
                const post = await postModel.findById(postId)
                const user = await userModel.findById(userId)
                if (user === null) {
                    return res.status(404).send("User not found")
                }
                if (!post.likes.includes(userId)) {
                    await post.updateOne({ $push: { likes: userId } })
                    res.send("post liked")
                }
                if (post.likes.includes(userId)) {
                    await post.updateOne({ $pull: { likes: userId } })
                    res.send("post Disliked")
                }
            } catch (error) {
                res.status(500).send(error)
            }
        },
        async getTimeLine(req, res) {
            //taking user id from jwt token
            const userId = req.user.user.id
            try {
                const currentUserPosts = await postModel.find({ userId: userId })
                const followingPosts = await userModel.aggregate([
                    {
                        $match: { _id: new mongoose.Types.ObjectId(userId) }
                    },
                    {
                        $lookup: { from: "posts", localField: "following", foreignField: "userId", as: "followingPosts" }
                    },
                    {
                        $project: { followingPosts: 1, _id: 0 }
                    }
                ])
                res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => { return b.createdAt - a.createdAt; }))
            } catch (error) {
                res.status(500).send(error)
            }

        },
        async getuserposts(req, res) {
            const posts = await postModel.find()
            //taking user id from jwt token
            const userId = req.user.user.id
            const userpost = []
            posts.map(post => {
                if (post.userId === userId) {
                    userpost.push(post)
                }
            })
            res.send(userpost.reverse())
        }
    }
}

export default postController