import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
 
} from "firebase/auth";
import { auth } from '../FireBase/firebase.init';

const GoogleProvider=new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    const RegisterUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const LoginUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const socialLogin=()=>{
        setLoading(true)
        return signInWithPopup(auth,GoogleProvider)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)

    }
    const updateUser=(profile)=>{
        return updateProfile(auth.currentUser,profile)
    }

    // observer
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)

        })
        return ()=>{
            unsubscribe()
        }
    },[])
    const userInfo={
        RegisterUser,
        LoginUser,
        socialLogin,
        logOut,
        updateUser,
        user,
        loading,
    }
    return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;