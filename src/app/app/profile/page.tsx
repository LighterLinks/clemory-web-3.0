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
    <div>
      <h1>Profile</h1>
      <Image src={userInfo?.avatarUrl!} width={200} height={200} alt="avatar" />
      <h3>User ID: {userInfo?.type}</h3>
      <h3>Username: {userInfo?.displayName}</h3>
      <h3>Email: {userInfo?.email}</h3>
      <Link href="/">
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </Link>
    </div>
  );
}
