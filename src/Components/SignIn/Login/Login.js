import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@material-ui/core';
import useAuth from '../Auth';

const Login = (props) => {

    // State for store login form value
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loginError, setLoginError] = useState(false)

    const { gLogin, passLogin, authError, authErrorMsg, setAuthError } = useAuth()

    // Firebase password sign in
    const handelPassLogin = (e) => {
        e.preventDefault()
        if (email && password) {
            // Use RegEx for validate email and password
            if (/\S+@\S+\.\S+/.test(email) && /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
                setLoginError(false)
                setAuthError(false)
                passLogin(email, password)
                e.target.reset()
            } else {
                setLoginError(true)
            }
        }
    }


    return (
        <>
            <form onSubmit={handelPassLogin} className="loginFrom signInForm">
                <h4 className="text-center">Sign In</h4>
                <hr />
                {
                    authError &&
                    <div class="alert alert-warning" role="alert">
                        {authErrorMsg}
                    </div>
                }
                {
                    loginError &&
                    <div class="alert alert-warning" role="alert">
                        <span>Your email and password not valid. Please use valid email or password</span>
                    </div>
                }
                <Button onClick={gLogin} type="button" className="btn btn-info button w-100">
                    <span className="text-light"><FontAwesomeIcon icon={faGoogle} /> Sign In With Google</span>
                </Button>
                <br /><br />
                <div className="signInInputControl mb-2">
                    <label htmlFor="loginEmail"><strong>Email <span className="text-danger"> *</span></strong> </label>
                    <input onChange={(e) => setEmail(e.target.value)} id="loginEmail" type="email" name="email" className="signInInput" required />
                </div>
                <div className="signInInputControl mb-2">
                    <label htmlFor="loginPassword"><strong>Password <span className="text-danger"> *</span></strong> </label>
                    <input onChange={(e) => setPassword(e.target.value)} id="loginPassword" type="password" name="password" className="signInInput" required />
                </div>
                <span onClick={() => props.fPass(true)} style={{ cursor: "pointer" }} className="loginFormForgotBtn float-right mt-5">Forgot Password</span>
                <input className="btn btn-primary button w-100 mt-3" type="submit" value="Login" />
                <div className="signInFormChanger mt-3">I Don't Have An Account<span onClick={() => props.login(false)}> Sign Up</span> </div>
            </form>
        </>
    );
};

export default Login;
