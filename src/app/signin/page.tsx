"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import GoogleLoginButton from "../Auth/GoogleLoginBtn";
import AppleLoginButton from "../Auth/AppleLoginBtn";
import { loginStandAlone, loginStandAloneAccountIdExists } from "../API/API";
import LocalStorage from "@/lib/localstroage";
import signInpic from "../Assets/Image/signinPic.png";
import Image from "next/image";

const warningMessages = {
  empty: "Please fill in all fields",
  mismatch: "Passwords do not match",
  invalid: "Invalid username or password",
};

export default function Page() {
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
        <Image className={styles.image} src={signInpic} alt="signInpic" />
      </motion.div>
      <motion.div className={styles.right}>
        <p className={styles.title}>Sign in</p>
        <p className={styles.subtitle}>
          Sign in to create and share your own canvas
        </p>
        <p className={styles.warning}>{warning}</p>
        <form
          className={styles.form}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSignIn(event);
            }
          }}
        >
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
        <p className={styles.subtitleLeft}>
          Don&apos;t have an account? <Link href="/signup">Join us now!</Link>
        </p>
        <div className={styles.divider}>
          <hr className={styles.dividerLine} />
          <div className={styles.or}>Sign in with</div>
          <hr className={styles.dividerLine} />
        </div>
        <div className={styles.snsLogin}>
          <GoogleLoginButton />
          <AppleLoginButton />
        </div>
      </motion.div>
    </div>
  );
}
