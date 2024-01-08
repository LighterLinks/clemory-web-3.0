"use client";

import LocalStorage from "@/lib/localstroage";
import styles from "./NodePH.module.css";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ColorScheme, ColorSchemeDark, NodeWebLayout } from "@/Designer";
import { NodeProps } from "reactflow";
import { motion } from "framer-motion";
import { INode, NODETYPE } from "@/lib/interface";
import { useCallback, useRef, useState } from "react";
import WebIcon from "../Assets/WebIcon";
import { createNode, deleteNode } from "@/app/API/API";
import { PuffLoader } from "react-spinners";
import { deleteToast, errorToast, successToast } from "../../Toasts/toasts";

export default function WebNodePH(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const urlRef = useRef<HTMLInputElement>(null);
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const [isGenerating, setIsGenerating] = useState(false);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();

  const containerStyle = {
    width: NodeWebLayout.width,
    height: NodeWebLayout.height,
    borderRadius: NodeWebLayout.borderRadius,
    backgroundColor: colorTheme.nodeBgColors[props.data.bgColorIdx],
    color: colorTheme.nodeColor,
  };

  const handleGenerate = useCallback(() => {
    if (isGenerating) return;
    if (!urlRef.current?.value) return;
    setIsGenerating(true);
    const url = urlRef.current?.value as string;
    const nodeInfo: INode = {
      nodeId: "",
      type: NODETYPE.WEB,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "New text",
              styles: {},
            },
          ],
        },
      ],
      x: props.data.x,
      y: props.data.y,
      width: 200,
      height: 200,
      bgColorIdx: 0,
      url: url,
      scale: 1,
    };
    createNode(userId, nodeInfo, pageId).then((res) => {
      if (res.resCode.responseCode === 200) {
        deleteNode(userId, props.data.nodeId, pageId).then((res) => {
          successToast();
        });
      } else {
        errorToast();
      }
    });
  }, []);

  const handleDelete = useCallback(() => {
    deleteNode(userId, props.data.nodeId, pageId);
  }, []);

  return (
    <motion.div
      className={styles.container}
      style={containerStyle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ opacity: 0.6 }}
    >
      <div className={styles.header}>
        <div
          className={styles.urlInputWrapper}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGenerate();
            }
          }}
        >
          <input
            ref={urlRef}
            type="text"
            readOnly={isGenerating}
            className={styles.urlInput}
            placeholder="Paste URL here "
          />
        </div>
      </div>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
      <div className={styles.webIcon} onClick={handleGenerate}>
        {isGenerating ? (
          <>
            <PuffLoader color={colorTheme.toolbarBackground2} size={120} />
            <p>Reading web page...</p>
          </>
        ) : (
          <>
            <WebIcon size={120} color={colorTheme.toolbarBackground2} />
            <p>Click to generate</p>
          </>
        )}
      </div>
    </motion.div>
  );
}
