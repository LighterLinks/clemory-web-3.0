"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/app/API/API";
import { IUser } from "@/lib/interface";
import Image from "next/image";
import LocalStorage from "@/lib/localstroage";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const isAuth = LocalStorage.getItem("isAuth")!;
  const userId = LocalStorage.getItem("userId")!;
  const [userInfo, setUserInfo] = useState<IUser>();

  const handleLogout = useCallback(() => {
    LocalStorage.removeItem("userId");
    LocalStorage.removeItem("isAuth");
    LocalStorage.removeItem("token");
    LocalStorage.removeItem("theme");
  }, []);

  const handleGetUserInfo = useCallback(() => {
    getUserInfo(userId).then((res) => {
      setUserInfo(res.userInfo);
    });
  }, []);

  useEffect(() => {
    if (!isAuth) {
      router.replace("/");
    }
    handleGetUserInfo();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>
      <hr className={styles.hr} />
      <div className={styles.subSection}>
        <Image
          src={userInfo?.avatarUrl!}
          width={100}
          height={100}
          alt="avatar"
        />
      </div>
      <div className={styles.subSection}>
        <p className={styles.label}>User name</p>
        <input
          type="text"
          className={styles.input}
          defaultValue={userInfo?.displayName}
        />
      </div>
      <div className={styles.subSection}>
        <p className={styles.label}>Email</p>
        <input
          type="text"
          className={styles.input}
          defaultValue={userInfo?.email}
        />
      </div>
    </div>
  );
}
