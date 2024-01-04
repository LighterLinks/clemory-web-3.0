"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import GoogleLoginButton from "../Auth/GoogleLoginBtn";
import AppleLoginButton from "../Auth/AppleLoginBtn";
import { loginStandAlone, loginStandAloneAccountIdExists } from "../API/API";
import LocalStorage from "@/lib/localstroage";

const warningMessages = {
  empty: "Please fill in all fields",
  mismatch: "Passwords do not match",
  invalid: "Invalid username or password",
};

export default function page() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState<string>("");

  useEffect(() => {
    if (LocalStorage.getItem("isAuth") === "true") {
      window.location.href = "/app";
    }
  }, []);

  const handleSignIn = useCallback((event: any) => {
    event.preventDefault();
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    if (userName === "" || password === "") {
      setWarning(warningMessages.empty);
      return;
    }
    loginStandAlone(userName!, password!).then((res) => {
      if (res.resCode.responseCode === 200) {
        setWarning("");
        localStorage.setItem("token", res.token);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userId", res.userInfo.userId);
        window.location.href = "/app";
      } else {
        setWarning(warningMessages.invalid);
        return;
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <motion.div className={styles.left}>
        <p className={styles.titleLeft}>Welcome to Clemory!</p>
        <p className={styles.subtitleLeft}>
          The world’s finest information storage
        </p>
        <p className={styles.subtitleLeft}>
          Don't have an account? <Link href="/signup">Join us now!</Link>
        </p>
      </motion.div>
      <motion.div className={styles.right}>
        <p className={styles.title}>Sign in</p>
        <p className={styles.subtitle}>Please sign in to continue</p>
        <p className={styles.warning}>{warning}</p>
        <div className={styles.snsLogin}>
          <GoogleLoginButton />
          <AppleLoginButton />
        </div>
        <form className={styles.form} action={handleSignIn}>
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
          <button className={styles.button} onClick={handleSignIn}>
            Sign in
          </button>
        </form>
      </motion.div>
    </div>
  );
}
