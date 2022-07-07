import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'
import postController from '../controllers/postController.js'

const web = (app) => {
    app.post('/register', authController().register)
    app.post('/login', authController().login)
    app.post('/verify', authController().verify)
    app.get('/user/:id', userController().getUser)
    app.put('/user/:id', userController().updateUser)
    app.delete('/user/:id', userController().deleteUser)
    app.put('/user/:id/follow', userController().followUser)
    app.put('/user/:id/unfollow', userController().unFollowUser)
    app.post('/post/', postController().createPost)
    app.get('/post/:id', postController().getPost)
    app.put('/post/:id', postController().updatePost)
    app.delete('/post/:id', postController().deletePost)
    app.put('/post/:id/like', postController().likeDislikePost)
    app.get("/post/:id/timeline", postController().getTimeLine)
    app.post("/resendotp", authController().resendOtp)
}

export default web