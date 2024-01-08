"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./BottomBar.module.css";
import { useAppSelector } from "@/lib/hooks";
import { defaultTransition } from "@/Designer/animation";

export default function Bottombar() {
  const isBottomBarOpen = useAppSelector(
    (state) => state.bottomBarSlice.isOpen
  );
  return (
    <AnimatePresence>
      {isBottomBarOpen && (
        <motion.div
          key="bottom-toolbar"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={defaultTransition}
          className={styles.bottomBar}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
