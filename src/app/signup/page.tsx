"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { loginStandAloneAccountIdExists, registerStandAlone } from "../API/API";
import LocalStorage from "@/lib/localstroage";
import signInpic from "../Assets/Image/signinPic.png";
import Image from "next/image";

const warningMessages = {
  empty: "Please fill in all fields",
  mismatch: "Passwords do not match",
  invalid: "Invalid username or password",
};

export default function Page() {
  useEffect(() => {
    if (LocalStorage.getItem("isAuth") === "true") {
      window.location.href = "/app";
    }
  }, []);

  const userNameRef = useRef<HTMLInputElement>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState<string>("");

  const handleSignUp = useCallback((event: any) => {
    event.preventDefault();
    const userEmail = userEmailRef.current?.value;
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    if (
      userName === "" ||
      userEmail === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setWarning(warningMessages.empty);
      return;
    }
    loginStandAloneAccountIdExists(userName!).then((res) => {
      if (res.result) {
        setWarning("Username already exists");
        return;
      }
    });
    if (password !== confirmPassword) {
      setWarning(warningMessages.mismatch);
      return;
    }
    registerStandAlone(userEmail!, password!, userName!).then((res) => {
      if (res.resCode.responseCode === 200) {
        setWarning("");
        LocalStorage.setItem("token", res.token);
        // localStorage.setItem("isAuth", "true");
        // localStorage.setItem("userId", res.userInfo.userId);
        window.location.href = "/app";
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <motion.div className={styles.left}>
        <Image className={styles.image} src={signInpic} alt="signInpic" />
      </motion.div>
      <motion.div className={styles.right}>
        <p className={styles.title}>Sign up</p>
        <p className={styles.subtitle}>Please sign up to continue</p>
        <p className={styles.warning}>{warning}</p>
        <form
          className={styles.form}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSignUp(event);
            }
          }}
        >
          <input
            ref={userEmailRef}
            className={styles.input}
            type="text"
            placeholder="Email"
          />
          <input
            ref={userNameRef}
            className={styles.input}
            type="text"
            placeholder="Username"
          />
          <input
            ref={passwordRef}
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <input
            ref={confirmPasswordRef}
            className={styles.input}
            type="password"
            placeholder="Confirm your password"
          />
          <button className={styles.button} onClick={handleSignUp}>
            Sign up
          </button>
        </form>
        <p className={styles.subtitleLeft}>
          Already have an account? <Link href="/signin">Sign in!</Link>
        </p>
      </motion.div>
    </div>
  );
}
