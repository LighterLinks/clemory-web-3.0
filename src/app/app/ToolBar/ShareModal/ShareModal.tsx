"use client";

import { useAppSelector } from "@/lib/hooks";
import styles from "./ShareModal.module.css";
import { AnimatePresence, motion } from "framer-motion";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { logEvent, readPage } from "@/app/API/API";
import LinkIcon from "../Icons/LinkIcon";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import { defaultTransition } from "@/Designer/animation";

export default function ShareModal() {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const [viewPageId, setViewPageId] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const isShareModalOpen = useAppSelector(
    (state) => state.toolbarSlice.isShareModalOpen
  );

  useEffect(() => {
    readPage(userId, pageId).then((res) => {
      setViewPageId(res.pageInfo.viewPageId);
    });
  }, []);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(
      `https://clemory.io/app/shared/${viewPageId}`
    );
    setIsCopied(true);
    logEvent('copy_link');
  }, [viewPageId]);

  const goToLink = useCallback(() => {
    window.open(`https://clemory.io/app/shared/${viewPageId}`, "_blank");
  }, [viewPageId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  return (
    <AnimatePresence>
      {isShareModalOpen && (
        <motion.div
          className={styles.container}
          id="share-modal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={defaultTransition}
        >
          <div className={styles.title}>
            <p>Share</p>
          </div>
          <AnimatePresence>
            {isCopied && (
              <motion.div
                id="copy-complete"
                className={styles.copiedText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p>Copied to clipboard</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles.urlWrapper}>
            <div className={styles.url} onClick={goToLink}>
              <p>{`https://clemory.io/app/shared/${viewPageId}`}</p>
            </div>
            <motion.button
              className={styles.button}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={handleCopyToClipboard}
            >
              <LinkIcon size={20} color={colorTheme.toolbarFontColor} />
            </motion.button>
          </div>
          <div className={styles.description}>
            <p>Anyone with the link can view this page in readonly mode</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
