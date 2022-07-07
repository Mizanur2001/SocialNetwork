import userModel from "../models/userModel.js"
import otpModel from "../models/otpModel.js"
import bcrypt from 'bcrypt'
import otpGenerator from 'otp-generator'
import dotenv from 'dotenv'
import nodeMailer from 'nodemailer'
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
            text: `holla!!, you otp is < ${otp} > don't share it with anyone else . Have a good day`
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
            otp: OTP
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
                const { username, password } = req.body
                if (!username || !password) {
                    return res.status(400).send("All field Required")
                }
                const user = await userModel.findOne({ username: username })
                if (user == null) {
                    return res.status(400).send("Invalid UserName or Password")
                }

                const compPass = await bcrypt.compare(password, user.password)

                if (!compPass) {
                    return res.status(400).send("Invalid UserName or Password")
                }

                res.status(200).json(user)
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