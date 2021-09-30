import { useState } from "react";
import firebase from 'firebase';
import { auth, googleAuthProvider } from "../../firebase.config";
import { useStateValue } from "../StateProvider/StateProvider";
import { useHistory } from "react-router";

const useAuth = () => {

    const [authError, setAuthError] = useState(false)
    const [authErrorMsg, setAuthErrorMsg] = useState('')

    const [successMsg, setSuccessMsg] = useState(null)

    const [, dispatch] = useStateValue()
    
    const history = useHistory()

    // Get search value for redirect
    const redirectPath = window.location?.search?.split('=')[1]

    
  // Filter user data form user
  const getUser = user => {
    const { displayName, email, photoURL, uid } = user
    return { name: displayName, email, photo: photoURL, userId: uid }
  }


    // Firebase password sign up
    const passSignUp = (name, email, pass) => {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(res => {
                auth.currentUser.updateProfile({
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
        auth.signInWithEmailAndPassword(email, pass)
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
        auth.signInWithPopup(googleAuthProvider)
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
    const signOut = () => {
        auth.signOut()
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
        firebase.auth().currentUser.getIdToken(true)
        .then(function (idToken) {
          localStorage.setItem('asrafuls-amazon-user-token', idToken)
          dispatch({
            type: "SET_USER",
            user: getUser(auth.currentUser)
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
        signOut,
        authError,
        authErrorMsg,
        successMsg,
        setAuthError
    }
}

export default useAuth