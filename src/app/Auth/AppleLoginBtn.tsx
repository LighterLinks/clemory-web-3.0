"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { useRouter } from "next/navigation";
import { signInWithPopup, getAuth, OAuthProvider } from "firebase/auth";

import styles from "./Auth.module.css";
import { loginApple } from "../API/API";
import initializeFirebase from "./initializeFirebase";
import AppleIcon from "./Icons/AppleIcon";

export default function AppleLoginButton() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleAppleLogin = () => {
    setOpenModal(true);
    initializeFirebase();
    const provider = new OAuthProvider("apple.com");
    signInWithPopup(getAuth(), provider).then(
      (result) => {
        loginApple(
          result.user.email as string,
          result.user.uid,
          result.user.uid,
          result.user.providerId
        ).then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userInfo.userId);
          localStorage.setItem("isAuth", "true");
          setOpenModal(false);
          router.replace("/app");
        });
      },
      (error) => {
        setOpenModal(false);
        window.location.reload();
      }
    );
  };

  return (
    <>
      {openModal && <div className={styles.popUpOverlay} />}
      <div className={styles.button} onClick={handleAppleLogin}>
        <div className={styles.buttonIcon}>
          <AppleIcon size={30} />
        </div>
        <div className={styles.buttonText}>
          <p>Sign in with Apple</p>
        </div>
      </div>
    </>
  );
}
