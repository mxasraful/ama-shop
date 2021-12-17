import { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import firebaseConfig from "../../firebase.config";
import { useStateValue } from "../StateProvider/StateProvider";
import { useHistory } from "react-router";

const useAuth = () => {

    const [authError, setAuthError] = useState(false)
    const [authErrorMsg, setAuthErrorMsg] = useState('')

    const [successMsg, setSuccessMsg] = useState(null)

    const [, dispatch] = useStateValue()

    const history = useHistory()

    // Firebase App
    const firebaseApp = initializeApp(firebaseConfig)

    // Firebase Auth
    const fireAuth = getAuth(firebaseApp)

    // Firebase Auth Google Auth Provider    

    // Get search value for redirect
    const redirectPath = window.location?.search?.split('=')[1]


    // Filter user data form user
    const getUser = user => {
        const { displayName, email, photoURL, uid } = user
        return { name: displayName, email, photo: photoURL, userId: uid }
    }


    // Firebase password sign up
    const passSignUp = (name, email, pass) => {
        createUserWithEmailAndPassword(fireAuth, email, pass)
            .then(res => {
                fireAuth.currentUser.updateProfile({
                    displayName: name,
                })
                    .then(result => {
                        setSuccessMsg("Account Created Successful..")
                        setAuthError(false)
                        setAuthErrorMsg("")
                    })
                    .catch(err => {

                    })
            })
            .catch(err => {
                setAuthError(true)
                setAuthErrorMsg(err.message)
            })
    }

    // Firebase password sign in
    const passLogin = (email, pass) => {
        signInWithEmailAndPassword(fireAuth, email, pass)
            .then(res => {
                setSuccessMsg("Logged In Successful..")
                setAuthError(false)
                setAuthErrorMsg("")
            })
            .catch(err => {
                setAuthError(true)
                setAuthErrorMsg(err.message)
            })
    }

    // Firebase Google sign in
    const gLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(fireAuth, provider)
            .then(res => {
                setSuccessMsg("Google Sign In Successful..")
                setAuthError(false)
                setAuthErrorMsg("")
                storeLoggedInUserData()
            })
            .catch(err => {
                setAuthError(true)
                setAuthErrorMsg(err.message)
            })
    }

    // Firebase user sign out
    const authSignOut = () => {
        signOut(fireAuth)
            .then(res => {
                setSuccessMsg("Sign Out Successful..")
                setAuthError(false)
                setAuthErrorMsg("")
                localStorage.removeItem('asrafuls-amazon-user-token')
                window.location.reload()
            })
            .catch(err => {
                setAuthError(true)
                setAuthErrorMsg(err.message)
            })
    }

    const storeLoggedInUserData = () => {
        fireAuth.currentUser.getIdToken(true)
            .then(function (idToken) {
                localStorage.setItem('asrafuls-amazon-user-token', idToken)
                dispatch({
                    type: "SET_USER",
                    user: getUser(fireAuth.currentUser)
                })
                if (redirectPath) {
                    history.replace(redirectPath)
                } else {
                    history.goBack()

                }
            })
            .catch(function (error) {

            });
    }


    return {
        gLogin,
        passLogin,
        passSignUp,
        authSignOut,
        authError,
        authErrorMsg,
        successMsg,
        setAuthError
    }
}

export default useAuth