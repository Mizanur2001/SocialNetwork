import userModel from '../models/userModel.js'
import otpGenerator from 'otp-generator'
import otpModel from "../models/otpModel.js"
import nodeMailer from 'nodemailer'
import bcrypt from 'bcrypt'

const forgotpass = () => {
    const sendMail = async (email) => {
        try {
            const otp = await genOTP(email)
            const transporter = nodeMailer.createTransport({
                service: "gmail",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);


            const mailOption = {
                from: process.env.EMAIL_USER,
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
                    <h1>Forgot Password</h1>
                    <p>Holla,</p>
                    <p>You have requested to reset your password for your social network account. To proceed, please use the following One-Time Password (OTP) code:</p>
                    <div class="otp">${otp}</div>
                    <p>Enter this OTP code on the website to reset your password. It's not cool that you forgot your password.</p>
                </div>
            </body>
            
            </html>`
            }

            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOption, (err, info) => {
                    if (err) {
                        console.error('Email sending error:', err);
                        reject(err);
                    } else {
                        console.log('Email sent successfully:', info.response);
                        resolve("Mail sent successfully");
                    }
                });
            });

        } catch (error) {
            console.error('Error in sendMail function:', error);
            throw error;
        }
    }

    const genOTP = async (email) => {
        let fynalOTP;
        const OTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        })
        const otp = new otpModel({
            email: email,
            otp: OTP,
            type: "forget Password",
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

        //Sending OTP to valid mail
        async findEmail(req, res) {
            try {
                const { email } = req.body;
                const isUser = await userModel.findOne({ email: email })
                if (!isUser) {
                    res.status(400).send("Email not found");
                }
                else {
                    await sendMail(email)
                    res.status(200).send("OTP send to your mail")
                }
            } catch (error) {
                console.error('Error in findEmail:', error);
                res.status(500).send("Failed to send OTP. Please try again.");
            }
        },

        // Varify Otp
        async verifyOTP(req, res) {
            const { otp, email } = req.body
            try {
                const oriOTP = await otpModel.findOne({ email: email })
                if (oriOTP != null) {
                    if (oriOTP.otp != otp) {
                        res.status(400).send("OTP not matched")
                    } else {
                        await otpModel.updateOne({ email: email }, { $set: { 'activation': true } })
                        res.send("OTP verivied")
                    }
                } else {
                    res.status(400).send("invalid Mail id")
                }
            } catch (error) {
                res.send("Internal Server Error")
            }

        },

        //Change Password
        async changepass(req, res) {
            const { password, cnfpassword, email } = req.body
            try {
                const otpVari = await otpModel.findOne({ email: email })
                if (otpVari == null) {
                    return res.status(400).send("Bad request")
                }
                if (otpVari.activation) {
                    const strongPassTrue = password.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

                    //Strong password & password matching
                    if (strongPassTrue == -1) {
                        return res.status(400).send("Chose a Strong password")
                    }

                    if (password != cnfpassword) {
                        return res.status(400).send("Password Not Matched")
                    }

                    //password hassing
                    const salt = await bcrypt.genSalt(10)
                    const hassedPassword = await bcrypt.hash(password, salt)

                    //changing password
                    await userModel.updateOne({ email: email }, { $set: { password: hassedPassword } })
                    await otpModel.deleteOne({ email: email })
                    res.send("password changed Successfully")

                }
                else {
                    return res.status(400).send("bad request")
                }
            } catch (error) {
                res.send("Internal server error")
            }


        }
    }
}

export default forgotpass