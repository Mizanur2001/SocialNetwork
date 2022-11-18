import userModel from '../models/userModel.js'
import otpGenerator from 'otp-generator'
import otpModel from "../models/otpModel.js"
import nodeMailer from 'nodemailer'
import bcrypt from 'bcrypt'

const forgotpass = () => {
    const sendMail = async (email) => {
        const otp = await genOTP(email)
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
            text: `holla!! , you otp is < ${otp} > don't share it with anyone else . don't forgot it again .  Have a good day`
        })

        transpoter.sendMail(mailOption, (err, info) => {
            if (err) {
                return err
            }

            return "Mail send Successfully"
        })

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
            const { email } = req.body;
            const isUser = await userModel.findOne({ email: email })
            if (!isUser) {
                res.status(400).send("Email not found");
            }
            else {
                await sendMail(email)
                res.status(200).send("OTP send to your mail")
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
                if(otpVari==null){
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