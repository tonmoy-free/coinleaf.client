import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, updateProfile, fetchSignInMethodsForEmail, } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import { auth } from "../../firebase.config";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(10000);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    // update profile imURL state
    const [previewUrl, setPreviewUrl] = useState("");





    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {

        return signOut(auth);
    }

    const restPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const gSignIN = () => {
        return signInWithPopup(auth, provider);
    }

    const upProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        })
    }

    const deleteUser = () => {
        return auth.currentUser.delete();
    };

    const upProfileRegistration = (curUser, name, photoUrl) => {
        return updateProfile(curUser, {
            displayName: name,
            photoURL: photoUrl
        })
    }

    const eamilCheckFirebase = (email) => {
        return fetchSignInMethodsForEmail(auth, email);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser)
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authData = {
        createUser,
        signIn,
        deleteUser,
        user,
        setUser,
        logOut,
        loading,
        setLoading,
        restPassword,
        gSignIN,
        upProfile,
        upProfileRegistration,
        balance,
        setBalance,
        eamilCheckFirebase,
        showMobileSidebar,
        setShowMobileSidebar,
        previewUrl,
        setPreviewUrl
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;