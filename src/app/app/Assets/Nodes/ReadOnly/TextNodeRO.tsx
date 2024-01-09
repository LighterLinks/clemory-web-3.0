"use client";

import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import styles from "../styles/Node.module.css";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import { usePathname } from "next/navigation";
import LocalStorage from "@/lib/localstroage";

export default function TextNodeRO(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const [textSize, setTextSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const textContainerStyle = {
    borderRadius: 5,
    // padding: "5px 10px",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={styles.container}
      style={{
        ...textContainerStyle,
        border: "none",
      }}
    >
      <div className={styles.textInputWrapper}>
        <input
          className={styles.textInput}
          type="text"
          readOnly={true}
          style={{
            userSelect: "none",
            width: textSize.width + 10,
            height: textSize.height + 5,
          }}
          defaultValue={props.data.content[0].content[0].text}
        />
      </div>
    </motion.div>
  );
}
