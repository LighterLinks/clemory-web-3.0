"use client";

import { useCallback, useRef } from "react";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { updateIsDarkMode } from "@/lib/features/global/settingSlice";
import { openMenu } from "@/lib/features/sidePanel/menuSlice";
import BasicToggle from "../Assets/Widgets/Toggle/BasicToggle";

export default function Page() {
  // const store = useAppStore();
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   store.dispatch(openMenu(5));
  //   initialized.current = true;
  // }
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);

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
      <div className={styles.section}>
        <h1 className={styles.title}>Theme</h1>
        <hr className={styles.hr} />
        <div className={styles.subSection}>
          <div className={styles.label}>
            {!isDarkMode ? "Activate dark theme" : "Activate light theme"}
          </div>
          <button className={styles.toggle} onClick={toggleDarkMode}>
            <BasicToggle
              width={40}
              height={20}
              flag={isDarkMode}
              colorSet={{
                BG1: "#000000",
                BG2: "#FFFFFF",
                TG1: "#FFFFFF",
                TG2: "#000000",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
