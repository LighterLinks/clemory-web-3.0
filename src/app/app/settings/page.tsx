"use client";

import { useCallback, useRef } from "react";
import styles from "./page.module.css";
import { useAppDispatch, useAppStore } from "@/lib/hooks";
import { updateIsDarkMode } from "@/lib/features/global/settingSlice";
import { openMenu } from "@/lib/features/sidePanel/menuSlice";

export default function Page() {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(openMenu(5));
    initialized.current = true;
  }
  const dispatch = useAppDispatch();

  const toggleDarkMode = useCallback((event: any) => {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    if (isDarkMode) {
      dispatch(updateIsDarkMode(false));
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      dispatch(updateIsDarkMode(true));
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <h2>Coming Soon</h2>
      <button className={styles.button} onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
    </div>
  );
}
