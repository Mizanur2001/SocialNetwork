import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'
import postController from '../controllers/postController.js'
import jwtVerifyUser from '../middleware/jwtFetchUser.js'
import uploadController from '../controllers/uploadController.js'
import multerUpload from '../files/multer.js'

const web = (app) => {
    app.post('/register', authController().register)
    app.post('/login', authController().login)
    app.post('/verify', authController().verify)
    app.get('/user/:id', jwtVerifyUser, userController().getUser)
    app.get('/users/', jwtVerifyUser, userController().getAllUser)
    app.put('/user/:id', userController().updateUser)
    app.delete('/user/:id', userController().deleteUser)
    app.put('/user/:id/follow', jwtVerifyUser, userController().followUser)
    app.put('/user/:id/unfollow', userController().unFollowUser)
    app.post('/post/', jwtVerifyUser, postController().createPost)
    app.get('/post/:id', postController().getPost)
    app.put('/post/:id', postController().updatePost)
    app.delete('/post/:id', postController().deletePost)
    app.put('/post/:id/like', jwtVerifyUser, postController().likeDislikePost)
    app.get("/post/:id/timeline", jwtVerifyUser, postController().getTimeLine)
    app.get('/post/user/posts', jwtVerifyUser, postController().getuserposts)
    app.put('/post/:id/comment', postController().comments)
    app.post('/upload/img', jwtVerifyUser, multerUpload.single('Photo'), uploadController().uploadimg)
    app.post("/resendotp", authController().resendOtp)
}

export default web