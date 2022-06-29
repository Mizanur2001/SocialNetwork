import authController from '../controllers/authController.js'

const web = (app) => {
    app.post('/register', authController().register)
    app.post('/login', authController().login)
    app.post('/verify', authController().verify)
}

export default web