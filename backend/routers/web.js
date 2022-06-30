import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'

const web = (app) => {
    app.post('/register', authController().register)
    app.post('/login', authController().login)
    app.post('/verify', authController().verify)
    app.get('/user/:id' , userController().getUser)
    app.put('/user/:id', userController().updateUser)
    app.delete('/user/:id', userController().deleteUser)
    app.put('/user/:id/follow', userController().followUser)
    app.put('/user/:id/unfollow', userController().unFollowUser)
}

export default web