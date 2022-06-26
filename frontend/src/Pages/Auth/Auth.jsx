import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'

const Auth = () => {
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
            <SignUp />
            {/* <SignIn /> */}
        </div>
    )
    
    function SignUp() {
        return (
            <form action="#" className="SignUp">
                <h3 className='gradientText'>SignUp</h3>
                <div className="InpName">
                    <input type="text" placeholder='First Name' name='firstName' className='InfoInput' />
                    <input type="text" placeholder='Last Name' name='lastName' className='InfoInput' />
                </div>
                <div className="InpUname">
                    <input type="text" placeholder='User Name' name='username' className='InfoInput' />
                    <input type="email" placeholder='Email Id' name='email' className='InfoInput' />
                </div>
                <div className="Password">
                    <input type="password" name='password' placeholder='Password' className='InfoInput' />
                    <input type="password" name='password' placeholder='Confirm Password' className='InfoInput' />
                </div>
                <div className='bottomPartSignUp'>
                    <span className='gradientText'>Have an Accunt ? SingIn</span>
                    <button className="btn SignUpBtn" type='submit'>SignUp</button>
                </div>
            </form>
        )
    }
    // eslint-disable-next-line
    function SignIn() {
        return (
            <form action="#" className="SignUp">
                <h3 className='gradientText'>Sign In</h3>
                <div className="InpUname">
                    <input type="text" placeholder='User Name' name='username' className='InfoInput' />
                    <input type="password" placeholder='Password' name='password' className='InfoInput' />
                </div>

                <div className='bottomPartSignIn'>
                    <span className='gradientText'>Dont Have an Accunt ? SingUp</span>
                    <button className="btn SignUpBtn" type='submit'>Singn In</button>
                </div>
            </form>
        )
    }
}

export default Auth
