"use client";

import { useCallback, useState } from "react";
import SidePanel from "./SidePanel";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import { useAppSelector } from "@/lib/hooks";
import Toolbar from "./ToolBar/Toolbar";
import styles from "./layout.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isSidebarOpen = useAppSelector(
    (state) => state.toolbarSlice.isSidebarOpen
  );
  return (
    <section className={styles.section}>
      <Toolbar />
      <div className={styles.main}>
        <SidePanel />
        {children}
      </div>
    </section>
  );
}
