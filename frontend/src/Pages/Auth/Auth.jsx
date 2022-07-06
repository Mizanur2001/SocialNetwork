import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const nevigate = useNavigate()

    const [signUpError, setSignUpError] = useState({ status: false, message: "" })
    const [credentials, setCredentials] = useState({ username: '', email: '', firstname: '', lastname: '', password: '', cpassword: '' })

    const [islogin, setIsLogin] = useState(true)

    const funcOnSubmitData = async (e) => {
        e.preventDefault()

        const API = axios.create({ baseURL: "http://localhost:5000" })

        const SignUp = async (formData) => { await API.post('/register', formData) }
        SignUp(credentials).then(() => { localStorage.setItem('userInfo', JSON.stringify(credentials)); setSignUpError({ status: false, message: "" }); nevigate("/auth/verify") }).catch((err) => { setSignUpError({ status: true, message: err.response.data }) })
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setSignUpError({ status: false, message: "" })
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

            {islogin && <form className="SignUp" onSubmit={funcOnSubmitData}>
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
                    <button className="btn SignUpBtn" type='submit'>SignUp</button>
                </div>
            </form>}

            {/* SignIn  */}

            {!islogin && <form action="#" className="SignUp">
                <h3 className='gradientText'>Sign In</h3>
                <div className="InpUname">
                    <input type="text" placeholder='User Name' name='username' className='InfoInput' autoComplete="off" />
                    <input type="password" placeholder='Password' name='password' className='InfoInput' autoComplete="off" />
                </div>

                <div className='bottomPartSignIn'>
                    <span className='gradientText c-pointer' onClick={() => setIsLogin(true)}>Dont Have an Accunt ? SingUp </span>
                    <button className="btn SignUpBtn" type='submit'>Singn In</button>
                </div>
            </form>}
        </div>
    )
}

export default Auth
