import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import firebaseAuth from "../config/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(firebaseAuth, provider);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(firebaseAuth);
    }

    const info = {
        loading,
        setLoading,
        user,
        googleSignIn,
        loginUser,
        registerUser,
        logOut
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, currUser => {
            setUser(currUser);
            setLoading(false);
            console.log("inside onauthstatechanged", currUser);

            /*---------JWT TOKEN----------*/
            if (currUser) {
                // const jwtData = {
                //     email: currUser.email,
                //     name: currUser.displayName
                // }
                // fetch('https://crud-jwt-server.vercel.app/jwt', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body: JSON.stringify(jwtData),
                //     credentials: 'include'
                // })
                //     .then(res => res.json())
            } else {
                // logout fetch request
                // fetch('https://crud-jwt-server.vercel.app/logout', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body: JSON.stringify({}),
                //     credentials: 'include'
                // })
                // .then(res => {
                //     console.log(res.data);
                // })
            }
            /*---------JWT TOKEN----------*/

        })

        return () => {
            return unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;