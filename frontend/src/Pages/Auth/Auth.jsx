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

            {islogin && <form className="SignUp signUpMob" onSubmit={funcOnSubmitSigninData}>
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
                <div className="Password">
                    <input type="password" name='password' placeholder='Password' className='InfoInput' onChange={onChange} value={credentials.password} autoComplete="off" />
                    <input type="password" name='cpassword' placeholder='Confirm Password' className='InfoInput' onChange={onChange} value={credentials.cpassword} autoComplete="off" />
                </div>
                <div className='bottomPartSignUp'>
                    <span className='gradientText c-pointer' onClick={() => setIsLogin(false)}>Have an Accunt ? SingIn</span>
                    <button className="btn SignUpBtn" type='submit' disabled={loading}>{loading ? "Loading..." : "SignUp"}</button>
                </div>
            </form>}

            {/* SignIn  */}

            {!islogin && <form onSubmit={funcSubmitLoginData} className="SignUp">
                <div className="startingDivSignUpForm">
                    <h3 className='gradientText'>Sign In</h3>
                    {signInError.status && <span>*{signInError.message}</span>}
                </div>
                <div className="InpUname">
                    <input type="text" placeholder='User Name' name='lusername' className='InfoInput' autoComplete="off" onChange={onChange} value={loginCredential.lusername} />
                    <input type="password" placeholder='Password' name='lpassword' className='InfoInput' autoComplete="off" onChange={onChange} value={loginCredential.lpassword} />
                </div>

                <div className='bottomPartSignIn'>
                    <span className='gradientText c-pointer' onClick={() => setIsLogin(true)}>Dont Have an Accunt ? SingUp </span>
                    <button className="btn SignUpBtn" type='submit' disabled={loading}>{loading ? "Loading..." : "Singn In"}</button>
                </div>
            </form>}
        </div>
    )
}

export default Auth
