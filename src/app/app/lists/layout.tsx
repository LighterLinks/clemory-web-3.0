"use client";

import { useCallback, useState } from "react";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import { useAppSelector } from "@/lib/hooks";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        backgroundColor: isDarkMode
          ? ColorSchemeDark.defaultBackground
          : ColorScheme.defaultBackground,
      }}
    >
      {children}
    </section>
  );
}
