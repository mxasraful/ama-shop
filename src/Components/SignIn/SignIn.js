import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider/StateProvider';
import logo from './../../logo/amazon_logo.png';
import FPass from './FPass/FPass';
import Login from './Login/Login';
import './signIn.css';
import SignUp from './SignUp/SignUp';
import { useHistory } from "react-router";

const SignIn = () => {

    const [{ user }, ] = useStateValue()

    const [fPass, setFPass] = useState(false)
    const [loginF, setLoginF] = useState(true)
    
    document.title = "Asrafuls Amazon Clone - Sign In";

    const history = useHistory()
    
    // Get search value for redirect
    const redirectPath = window.location?.search?.split('=')[1]

    // Menage Logged in user path
    useEffect(() => {
        if (user) {
            console.log(redirectPath)
            if (redirectPath) {
                history.replace(redirectPath)
            } else {
                history.replace('/')
            }
        }
    }, [user, redirectPath, history])

    return (
        <div className="signInMain">
            <div className="signInContainer">
                {
                    user ?
                        <div className="signInPageLoggedInMsg">
                            <div className="alert alert-success mt-5 mb-5">
                                <div className="alert-body">You Already Logged In...</div>
                            </div>
                            <div className="text-center">
                                <Link to="/" className="btn btn-info text-light">Home</Link>
                            </div>
                        </div>
                        :
                        <>
                            <div className="text-center">
                                <Link className="" to="/">
                                    <img style={{ width: "180px" }} src={logo} alt="" />
                                </Link>
                            </div><br /><br />
                            {
                                fPass ?
                                    <FPass />
                                    :
                                    <>
                                        {
                                            loginF ?
                                                <Login login={setLoginF} fPass={setFPass} />
                                                :
                                                <SignUp login={setLoginF} />
                                        }
                                    </>
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default SignIn;