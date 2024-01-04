'use client';

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { useRouter } from "next/navigation";
import { signInWithPopup, getRedirectResult, getAuth, OAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { loginGoogle } from "../API/API";

import styles from './Auth.module.css';
import initializeFirebase from "./initializeFirebase";
import GoogleIcon from './Icons/GoogleIcon'

export default function GoogleLoginButton() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    
    const handleGoogleLogin = () => {
        setOpenModal(true);
        initializeFirebase();
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
            .then((result) => {
                result.user.providerData.forEach((profile) => {
                    loginGoogle(profile.displayName as string, profile.uid, profile.email as string, profile.phoneNumber as string, profile.photoURL as string, profile.providerId).then((data: any) => {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userId', data.userInfo.userId);
                        localStorage.setItem('isAuth', 'true');
                        setOpenModal(false);
                        router.replace('/app');
                    });
                }, (error: any) => {
                    console.log(error);
                    window.location.reload();
                }
            );
        });
    }
    
    return (
        <>
            { openModal && <div className={styles.popUpOverlay} />}
            <div className={styles.button} onClick={handleGoogleLogin}>
                <div className={styles.buttonIcon}>
                    <GoogleIcon size={30} />
                </div>
                <div className={styles.buttonText}>
                    <p>Sign in with Google</p>
                </div>
            </div>
        </>
    );
}