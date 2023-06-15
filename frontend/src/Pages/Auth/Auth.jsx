import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const nevigate = useNavigate()
    const URL = process.env.REACT_APP_BACKEND_URL
    const [signUpError, setSignUpError] = useState({ status: false, message: "" })
    const [signInError, setSignInError] = useState({ status: false, message: "" })
    const [credentials, setCredentials] = useState({ username: '', email: '', firstname: '', lastname: '', password: '', cpassword: '' })
    const [loginCredential, setLoginCredential] = useState({ lusername: "", lpassword: "" })
    const [islogin, setIsLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isForgetPass, setisForgetPass] = useState(false);
    const [isForgetPassCode, setisForgetPassCode] = useState(false);
    const [isForgetPassConf, setisForgetPassConf] = useState(false);
    const [forgetPass, setForgetpass] = useState({ fEmail: '', fOtp: '', fpassword: "", fcnfpassword: "" })
    const [forgetpassError, setForgetpassError] = useState({ status: false, message: "" })

    const funcOnSubmitSigninData = async (e) => {
        setLoading(true)
        e.preventDefault()

        const API = axios.create({ baseURL: URL })

        const SignUp = async (formData) => { await API.post('/register', formData) }
        SignUp(credentials).then(() => { localStorage.setItem('userInfo', JSON.stringify(credentials)); setSignUpError({ status: false, message: "" }); nevigate("/auth/verify") }).catch((err) => { setSignUpError({ status: true, message: err.response.data }); setLoading(false) })
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setSignUpError({ status: false, message: "" })
        setLoginCredential({ ...loginCredential, [e.target.name]: e.target.value })
        setSignInError({ message: "", status: false })
        setForgetpass({ ...forgetPass, [e.target.name]: e.target.value })
        setForgetpassError({ status: false, message: false })
    }

    const funcSubmitLoginData = async (e) => {
        setLoading(true)
        e.preventDefault()
        const API = axios.create({ baseURL: URL })
        API.post('/login', loginCredential).then((response) => {
            setLoading(false)
            localStorage.setItem("authToken", response.data.token)
            localStorage.setItem("userId", response.data.userId)
            localStorage.setItem("userName", response.data.userName)
            document.location.reload()
            nevigate('/')
        }).catch((error) => {
            setSignInError({ message: error.response.data, status: true })
            setLoading(false)
        })
    }

    //email send to server for check (forget Password)
    const funcForgetPassSendMail = async (e) => {
        e.preventDefault();
        setSignUpError({ status: false, message: "" })
        setSignInError({ message: "", status: false })
        setLoading(true)

        await axios.post(`${URL}/forgotpass`, { email: forgetPass.fEmail }).then((response) => {
            setisForgetPassCode(true);
            setisForgetPass(false)
            setLoading(false)
        }).catch(err => { setForgetpassError({ status: true, message: err.response.data }, setLoading(false)) })
    }

    //check OTP (forget Password)
    const funcForgetPassOtpVerify = async (e) => {
        e.preventDefault();
        e.preventDefault();
        setSignUpError({ status: false, message: "" })
        setSignInError({ message: "", status: false })
        setLoading(true)

        await axios.post(`${URL}/forgotpass/verifyotp`, { email: forgetPass.fEmail, otp: forgetPass.fOtp }).then((response) => {
            setisForgetPassCode(false);
            setisForgetPassConf(true)
            setLoading(false)
        }).catch(err => { setForgetpassError({ status: true, message: err.response.data }, setLoading(false)) })
    }

    //Change password (forget Password)
    const funcForgetPassChangePass = async (e) => {
        e.preventDefault();
        e.preventDefault();
        setSignUpError({ status: false, message: "" })
        setSignInError({ message: "", status: false })
        setLoading(true)

        await axios.post(`${URL}/forgotpass/changepass`, { email: forgetPass.fEmail, password: forgetPass.fpassword, cnfpassword: forgetPass.fcnfpassword }).then((response) => {
            setLoading(false)
            forgetPass.fcnfpassword = ""
            forgetPass.fpassword = ""
            nevigate('/')
        }).catch(err => {
            setForgetpassError({ status: true, message: err.response.data }, setLoading(false))
        })
    }

    return (
        <div className='Auth'>
            <div className="LeftSide">
                <img src={Logo} alt="Logo" />
                <div className="webName">
                    <h1>Social Network</h1>
                    <div className='Slogan'>
                        <span># </span>
                        <span> Explore the Idea throughout the world</span>
                    </div>
                </div>
            </div>

            {/* SignUP  */}

            {islogin && <form className="SignUp signUpMob relative" onSubmit={funcOnSubmitSigninData}>
                <div className='startingDivSignUpForm'>
                    <h3 className='gradientText'>SignUp</h3>
                    {signUpError.status && <span>*{signUpError.message}</span>}
                </div>
                <div className="InpName">
                    <input type="text" placeholder='First Name' name='firstname' className='InfoInput' onChange={onChange} value={credentials.firstname} autoComplete="off" />
                    <input type="text" placeholder='Last Name' name='lastname' className='InfoInput' onChange={onChange} value={credentials.lastname} autoComplete="off" />
                </div>
                <div className="InpUname">
                    <input type="text" placeholder='User Name' name='username' className='InfoInput' onChange={onChange} value={credentials.username} autoComplete="off" />
                    <input type="email" placeholder='Email Id' name='email' className='InfoInput' onChange={onChange} value={credentials.email} autoComplete="off" />
                </div>
                <div className="Password relative">
                    <input type="password" name='password' placeholder='Password' className='InfoInput' onChange={onChange} value={credentials.password} autoComplete="off" />
                    <span className="material-symbols-outlined infoBtn">
                        info
                    </span>
                    <span className='PasswordInfoBox'>
                        Make sure it's at least 8 characters and including a number and a lowercase letter and aslo a uppercase letter
                        <br />
                        <span className='bold'>e.g :- Abcd123$</span>
                    </span>
                    <input type="password" name='cpassword' placeholder='Confirm Password' className='InfoInput' onChange={onChange} value={credentials.cpassword} autoComplete="off" />
                </div>
                <div className='bottomPartSignUp'>
                    <span className='gradientText c-pointer' onClick={() => setIsLogin(false)}>Have an Account ? SingIn</span>
                    <button className="btn SignUpBtn" type='submit' disabled={loading}>{loading ? "Loading..." : "SignUp"}</button>
                </div>
            </form>}

            {/* SignIn  */}

            {!islogin && !isForgetPass && !isForgetPassCode && !isForgetPassConf && <form onSubmit={funcSubmitLoginData} className="SignUp">
                <div className="startingDivSignUpForm">
                    <h3 className='gradientText'>Sign In</h3>
                    {signInError.status && <span>*{signInError.message}</span>}
                </div>
                <div className="InpUname">
                    <input type="text" placeholder='Email id' name='lusername' className='InfoInput' autoComplete="off" onChange={onChange} value={loginCredential.lusername} />
                    <input type="password" placeholder='Password' name='lpassword' className='InfoInput' autoComplete="off" onChange={onChange} value={loginCredential.lpassword} />
                </div>

                <div className='bottomPartSignIn'>
                    <span className='gradientText c-pointer' onClick={() => setIsLogin(true)}>Dont Have an Account ? SingUp </span>
                    <button className="btn SignUpBtn" type='submit' disabled={loading}>{loading ? "Loading..." : "Singn In"}</button>
                </div>
                <span className='c-pointer forgetPass' onClick={() => { setisForgetPass(true) }}>Forget Password ? </span>
            </form>}

            {/*Forget password */}

            {isForgetPass && <form className="SignUp" onSubmit={funcForgetPassSendMail}>
                <div className="startingDivSignUpForm">
                    <h3 className='gradientText'>Forget password</h3>
                    {forgetpassError.status && <span>*{forgetpassError.message}{signInError.message}</span>}
                </div>
                <div className="InpUname">
                    <input type="email" placeholder='Enter your Mail Id' name='fEmail' className='InfoInput' autoComplete="off" onChange={onChange} value={forgetPass.fEmail} />
                </div>

                <div className='bottomPartSignIn'>
                    <span className='gradientText c-pointer' onClick={() => setisForgetPass(false)}> Go back to sign In Page </span>
                    <button className="btn SignUpBtn" type='submit' disabled={loading} >{loading ? "Loading..." : "Next"}</button>
                </div>
            </form>}

            {/* forget Password OTP chacker*/}

            {isForgetPassCode && <form onSubmit={funcForgetPassOtpVerify} className="SignUp">
                <div className="startingDivSignUpForm">
                    <h3 className='gradientText'>Verify Yourself</h3>
                    {forgetpassError.status && <span>*{forgetpassError.message}{signInError.message}</span>}
                </div>
                <div className="InpUname">
                    <input type="number" placeholder='Enter OTP' name='fOtp' className='InfoInput' autoComplete="off" onChange={onChange} value={forgetPass.fOtp} />
                </div>

                <div className='bottomPartSignIn'>
                    <span className='gradientText'> Don't Send it with Anyone Else  </span>
                    <button className="btn SignUpBtn" type='submit' disabled={loading}>{loading ? "Loading..." : "Next"}</button>
                </div>
            </form>}

            {/* Change Password(forget password)*/}

            {isForgetPassConf && <form onSubmit={funcForgetPassChangePass} className="SignUp">
                <div className="startingDivSignUpForm">
                    <h3 className='gradientText'>Change Your Password</h3>
                    {forgetpassError.status && <span>*{forgetpassError.message}{signInError.message}</span>}
                </div>
                <div className="InpUname relative">
                    <input type="password" name='fpassword' placeholder='Password' className='InfoInput' onChange={onChange} value={forgetPass.fpassword} autoComplete="off" />
                    <span className="material-symbols-outlined forgetPassInfoBtn">
                        info
                    </span>
                    <span className='ForgetPasswordInfoBox'>
                        Make sure it's at least 8 characters and including a number and a lowercase letter and aslo a uppercase letter
                        <br />
                        <span className='bold'>e.g :- Abcd123$</span>
                    </span>
                    <input type="password" name='fcnfpassword' placeholder='Confirm Password' className='InfoInput' onChange={onChange} value={forgetPass.fcnfpassword} autoComplete="off" />
                </div>

                <div className='bottomPartSignIn'>
                    <span className='gradientText'> It's Not cool You forget your Password :(  </span>
                    <button className="btn SignUpBtn" type='submit' disabled={loading}>{loading ? "Loading..." : "Cofirm"}</button>
                </div>
            </form>}

        </div>
    )
}

export default Auth
