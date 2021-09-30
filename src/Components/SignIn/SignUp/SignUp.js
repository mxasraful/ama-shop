import React, { useState } from 'react';
import useAuth from '../useAuth';

const SignUp = (props) => {

    // State for store sign up form value
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [signUpError, setSignUpError] = useState(false)

    const { passSignUp, authError, authErrorMsg, setAuthError } = useAuth()

    // Firebase password sign up
    const handlePassSignUp = (e) => {
        e.preventDefault()
        if (name && email && password) {

            // Use RegEx for validate email and password
            if (/\S+@\S+\.\S+/.test(email) && /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
                setSignUpError(false)
                setAuthError(false)
                passSignUp(name, email, password)
                e.target.reset()
            } else {
                setSignUpError(true)
            }
        }
    }

    return (
        <form onSubmit={handlePassSignUp} className="signUpFrom signInForm">
            <h4 className="text-center">Create Account</h4>
            <hr />
            {
                authError &&
                <div class="alert alert-warning" role="alert">
                    {authErrorMsg}
                </div>
            }
            {
                signUpError &&
                <div class="alert alert-warning" role="alert">
                    <span>Your email and password not valid. Please use valid email or password</span>
                </div>
            }
            <br />
            <div className="signInInputControl mb-2">
                <label htmlFor="signUpName"><strong>Name <span className="text-danger"> *</span></strong> </label>
                <input onChange={(e) => setName(e.target.value)} id="signUpName" type="name" name="name" className="signInInput" required />
            </div>
            <div className="signInInputControl mb-2">
                <label htmlFor="signUpEmail"><strong>Email <span className="text-danger"> *</span></strong> </label>
                <input onChange={(e) => setEmail(e.target.value)} id="signUpEmail" type="email" name="email" className="signInInput" required />
            </div>
            <div className="signInInputControl mb-2">
                <label htmlFor="signUpPassword"><strong>Password <span className="text-danger"> *</span></strong> </label>
                <input onChange={(e) => setPassword(e.target.value)} id="signUpPassword" type="password" name="password" className="signInInput" required />
            </div>
            <input className="btn btn-primary button w-100 mt-3" type="submit" value="Sign Up" />
            <div className="signInFormChanger mt-3">I Have An Account<span onClick={() => props.login(true)}> Login</span> </div>
        </form>
    );
};

export default SignUp