import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'

const userController = () => {
    return {
        async getUser(req, res) {
            const id = req.params.id
            try {
                const user = await userModel.findById(id)
                if (user) {
                    const { password, ...otherDetaits } = user._doc
                    return res.status(200).json(otherDetaits)
                }
                res.status(400).send("user not found")

            } catch (error) {
                res.status(400).send(error)
            }
        },
        async getAllUser(req, res) {
            try {
                let users = await userModel.find();
                users = users.map((user) => {
                    const { password, ...otherDetails } = user._doc
                    return otherDetails
                })
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json(error);
            }
        },
        async updateUser(req, res) {
            const id = req.params.id
            const { _id, currentUserAdmin, password, email, isadmin, following, followers, username } = req.body
            if (id === _id || currentUserAdmin) {
                if (email || isadmin || following || followers || email == '' || following == '' || followers == '') {
                    return res.status(403).send("Access Denied!")
                }
                if (password === '') {
                    return res.status(400).send("chose a Strong password")
                }
                if (password) {
                    const strongPassTrue = password.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
                    if (strongPassTrue == -1) {
                        return res.status(400).send("chose a Strong password")
                    }
                    const salt = await bcrypt.genSalt(10)
                    const hasedPass = await bcrypt.hash(password, salt)
                    req.body.password = hasedPass

                }
                try {
                    if (username) {
                        if (username.length <= 2) {
                            return res.send("username shold be grater thna 3 char")
                        }
                        const findUsername = await userModel.findOne({ username: username })
                        if (findUsername) {
                            return res.send("Ures already Exist try defarend one")
                        }
                    }
                    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })
                    res.status(200).json(user)
                } catch (error) {
                    res.status(400).send(error)
                }
            }
            else {
                res.status(403).send("Access Denied! ")
            }
        },
        async deleteUser(req, res) {
            const id = req.params.id
            const { _id, currentUserAdmin } = req.body
            if (_id === id || currentUserAdmin) {
                try {
                    const findUser = await userModel.findById(id)
                    if (findUser) {
                        await userModel.findByIdAndDelete(id)
                        res.send("account Deleted Successfully")
                    }
                    else {
                        res.status(400).send("User not found")
                    }
                } catch (err) {
                    res.send(err)
                }
            }
            else {
                res.status(403).send("Access Denied! ")
            }
        },
        async followUser(req, res) {
            const id = req.params.id
            const { _id } = req.body
            if (id === _id) {
                return res.status(403).send("Action Forbidden")
            }

            try {
                const followUser = await userModel.findById(id)
                const followingUser = await userModel.findById(_id)
                if (!followUser.followers.includes(_id)) {
                    await followUser.updateOne({ $push: { followers: _id } })
                    await followingUser.updateOne({ $push: { following: id } })
                    res.send("User followed")
                }
                else {
                    res.send("You are already following this id")
                }
            } catch (error) {
                res.send(error)
            }
        },
        async unFollowUser(req, res) {
            const id = req.params.id
            const { _id } = req.body
            if (id === _id) {
                return res.status(403).send("Action Forbidden")
            }

            try {
                const unFollowUser = await userModel.findById(id)
                const unFollowingUser = await userModel.findById(_id)
                if (unFollowUser.followers.includes(_id)) {
                    await unFollowUser.updateOne({ $pull: { followers: _id } })
                    await unFollowingUser.updateOne({ $pull: { following: id } })
                    res.send("User Unfollowed")
                }
                else {
                    res.send("You are not following this id")
                }
            } catch (error) {
                res.send(error)
            }
        }
    }
}

export default userController