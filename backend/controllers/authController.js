import userModel from "../models/userModel.js"
import otpModel from "../models/otpModel.js"
import bcrypt from 'bcrypt'
import otpGenerator from 'otp-generator'
import dotenv from 'dotenv'
import nodeMailer from 'nodemailer'
import jwt from 'jsonwebtoken'
dotenv.config()

const authController = () => {
    const sendMail = async (email) => {
        const otp = await genOtp(email)
        const transpoter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        })

        const mailOption = ({
            from: process.env.USER,
            to: email,
            subject: "Your OTP From SocialNetwork",
            html: `
            <!DOCTYPE html>
            <html>
            
            <head>
                <title>Social Network - OTP Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
            
                    .container::before {
                        content: "";
                        background: url("backgroung_img.jpg") no-repeat center center/cover;
                        position: absolute;
                        top: 25px;
                        right: 480px;
                        width: 33%;
                        height: 434px;
                        z-index: -1;
                        opacity: 0.2;
                    }
            
                    h1 {
                        text-align: center;
                    }
            
                    p {
                        margin-bottom: 20px;
                    }
            
                    .otp {
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                        padding: 10px;
                        background-color: #eee;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
            
                    .cta-button {
                        display: block;
                        width: 200px;
                        margin: 0 auto;
                        padding: 10px;
                        text-align: center;
                        background-color: #4CAF50;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
            
                    .cta-button:hover {
                        background-color: #45a049;
                    }
            
                    .logo {
                        display: block;
                        margin: 0 auto;
                        width: 150px;
                        text-align: center;
                    }
            
                    .image {
                        display: block;
                        margin: 20px auto;
                        max-width: 100%;
                        height: auto;
                        border-radius: 5px;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <img class="logo" src="https://sn.mizanur.in/static/media/logo.89e5084e2e60a6f30c7c.png"
                        alt="Social Network Logo">
                    <h1>Verify Your Account</h1>
                    <p>Holla,</p>
                    <p>Thank you for signing up for our Social Network . To complete your registration, please use the
                        following One-Time Password (OTP) code:</p>
                    <div class="otp">${otp}</div>
                    <p>Enter this OTP code on the website to verify your account.</p>
                </div>
            </body>
            
            </html>`
        })

        transpoter.sendMail(mailOption, (err, info) => {
            if (err) {
                return err
            }

            return "Mail send Successfully"
        })

    }
    const genOtp = async (email) => {
        let fynalOTP;
        const OTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        })
        const otp = new otpModel({
            email: email,
            otp: OTP,
            type: "New Account creation",
            activation: false
        })
        const otpData = await otpModel.findOne({ email: email })
        if (otpData == null) {
            otp.save().then(() => { }).catch(err => console.log(err))
            fynalOTP = OTP
        }
        else {
            fynalOTP = otpData.otp
        }
        return fynalOTP
    }
    return {
        async register(req, res) {
            try {
                const { username, email, password, cpassword, firstname, lastname } = req.body
                const strongPassTrue = password.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

                if (!username || !email || !password || !cpassword || !firstname || !lastname) {
                    return res.status(400).send("All fields required")
                }

                if (strongPassTrue == -1) {
                    return res.status(400).send("Chose a Strong password")
                }

                if (password != cpassword) {
                    return res.status(400).send("Password not matched")
                }

                if (lastname.length <= 2 || firstname.length <= 2 || username.length <= 2) {
                    return res.status(400).send("Username and Name shold be grater than 3 char")
                }

                const findEmail = await userModel.findOne({ email: email })
                const findUserName = await userModel.findOne({ username: username })

                if (findEmail == null && findUserName == null) {
                    sendMail(email)
                    res.status(200).send("OTP sent Successfully")
                }
                else if (findUserName != null) {
                    res.status(400).send("UserName alreay exist")
                }
                else {
                    res.status(400).send("Email already exist")
                }

            } catch (error) {
                res.status(404).send("some error acurd with internal server")
            }
        },
        async login(req, res) {
            try {
                const { lusername, lpassword } = req.body
                if (!lusername || !lpassword) {
                    return res.status(400).send("All field Required")
                }
                const user = await userModel.findOne({ username: lusername })
                if (user == null) {
                    return res.status(400).send("Invalid UserName or Password")
                }

                const compPass = await bcrypt.compare(lpassword, user.password)

                if (!compPass) {
                    return res.status(400).send("Invalid UserName or Password")
                }

                const data = {
                    user: {
                        id: user.id
                    }
                }
                const jwt_Token = jwt.sign(data, process.env.SECTRE_KEY)
                const userInfo = {
                    token: jwt_Token,
                    userId: user.id,
                    userName: user.username
                }
                res.status(200).json(userInfo)

            } catch (error) {
                console.log("Internal server error")
            }
        },
        async verify(req, res) {
            try {
                const { userInfo, otp } = req.body
                if (userInfo == "" || userInfo == null) {
                    return res.status(400).send("Session Expaired")
                }
                //password hassing 
                const salt = await bcrypt.genSalt(10)
                const hasedPass = await bcrypt.hash(userInfo.password, salt)
                const oriOTP = await genOtp(userInfo.email)
                const findEmail = await userModel.findOne({ email: userInfo.email })
                const findUserName = await userModel.findOne({ username: userInfo.username })
                if (otp == oriOTP && findEmail == null && findUserName == null) {
                    //Create a user 
                    const user = new userModel({
                        username: userInfo.username,
                        email: userInfo.email,
                        password: hasedPass,
                        firstname: userInfo.firstname,
                        lastname: userInfo.lastname
                    })
                    user.save().then((user) => {
                        res.status(200).send("Account created successfully")
                    }).catch(err => { console.log(err) })
                    await otpModel.deleteOne({ email: userInfo.email })
                }
                else {
                    if (findEmail != null && findUserName != null) {
                        return res.status(400).send("User already been created")
                    }
                    res.status(400).send("Invalid OTP")
                }
            } catch (err) {
                console.log("Internal server error")
            }
        },
        async resendOtp(req, res) {
            const { userInfo } = req.body
            if (userInfo == null) {
                return res.status(400).send("session expaired")
            }

            try {
                sendMail(userInfo.email)
                res.status(200).send("mail send Successfully")
            } catch (error) {
                console.log("Internal Server Error")
            }
        }
    }
}

export default authController