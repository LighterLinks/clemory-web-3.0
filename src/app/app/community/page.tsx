"use client";

import { useCallback } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <div>
      <h1>Community</h1>
      <h2>Coming Soon</h2>
    </div>
  );
}
