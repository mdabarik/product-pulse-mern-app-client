import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import firebaseAuth from "../config/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resolver, setResolver] = useState(false);
    const [observeAddReview, setObserveAddReview] = useState(false);
    const axiosPublic = useAxiosPublic();

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
        logOut,
        resolver,
        setResolver,
        observeAddReview,
        setObserveAddReview
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, currUser => {
            setUser(currUser);
            console.log("inside onauthstatechanged", currUser);
            /*---------JWT TOKEN----------*/
            if (currUser) {
                console.log(import.meta.env.VITE_SERVER_URL, 'url');
                // get token and store client
                const userInfo = { email: currUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log(res);
                        if (res?.data?.token) {
                            localStorage.setItem('access-token', res?.data?.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                // TODO: remove access-token
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            /*---------JWT TOKEN----------*/
        });

        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;