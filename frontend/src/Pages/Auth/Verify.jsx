import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Verify.css'
import otpSendImg from '../../img/otpSend.png'


const Verify = () => {
    const notify = () => toast.success("OTP Sent Successfully");
    const nevigate = useNavigate()
    const [error, setError] = useState({ status: false, message: "" })
    const [otp, setOtp] = useState("")
    const [data, setData] = useState({ otp: "", userInfo: "" })

    const handleChange = (otp) => { setError({ status: false, message: "" }); setOtp(otp); setData({ otp: otp, userInfo: JSON.parse(localStorage.getItem('userInfo')) }) }

    const submitForm = (e) => {
        e.preventDefault()
        const API = axios.create({ baseURL: "http://localhost:5000" })
        const verify = async (formData) => { await API.post('/verify', formData) }
        verify(data).then(() => { localStorage.clear('userInfo'); nevigate("/auth") }).catch((err) => { setError({ status: true, message: err.response.data }) })
    }

    const resendOtp = () => {

        const API = axios.create({ baseURL: "http://localhost:5000" })
        const reSendOtp = async (formData) => { await API.post('/resendotp', formData) }
        reSendOtp({ userInfo: JSON.parse(localStorage.getItem('userInfo')) }).then(() => { notify() }).catch(err => { setError({ status: true, message: err.response.data }) })
    }

    return (
        <div className='Verify'>
            <ToastContainer />
            <img src={otpSendImg} alt="otpSend" />
            <form className='Form' onSubmit={submitForm}>
                <div className='startingDiv'>
                    <h3>Enter OTP</h3>
                    {error.status && <span>*{error.message}</span>}
                </div>
                <OtpInput
                    numInputs={6}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    value={otp}
                    onChange={handleChange}
                    inputStyle={{
                        border: "1px solid transparent",
                        borderRadius: "8px",
                        width: "54px",
                        height: "54px",
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: "bold",
                        caretColor: "blue"
                    }}
                    focusStyle={{
                        border: "1px solid #CFD3DB",
                        outline: "none"
                    }}
                />
                <div className='endDivOfForm'>
                    <span onClick={resendOtp}>Resend OTP</span>
                    <button type='submit' className='btn veriBtn'>Verify</button>
                </div>
            </form>
        </div>
    )
}

export default Verify
