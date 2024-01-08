"use client";

import { useCallback } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Community</h1>
      <h2 className={styles.subTitle}>Coming Soon</h2>
    </div>
  );
}
