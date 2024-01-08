"use client";

import LocalStorage from "@/lib/localstroage";
import styles from "./NodePH.module.css";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ColorScheme,
  ColorSchemeDark,
  NodeImageLayout,
  NodeWebLayout,
} from "@/Designer";
import { NodeProps } from "reactflow";
import { motion } from "framer-motion";
import { INode, NODETYPE } from "@/lib/interface";
import { useCallback, useRef, useState } from "react";
import WebIcon from "../Assets/WebIcon";
import { createNode, deleteNode, uploadImage } from "@/app/API/API";
import { PuffLoader } from "react-spinners";
import { deleteToast, errorToast, successToast } from "../../Toasts/toasts";
import ImageIcon from "../Assets/ImageIcon";

export default function ImageNodePH(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const [isGenerating, setIsGenerating] = useState(false);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();

  const containerStyle = {
    width: NodeWebLayout.width,
    height: NodeWebLayout.height - 80,
    borderRadius: NodeWebLayout.borderRadius,
    backgroundColor: colorTheme.nodeBgColors[props.data.bgColorIdx],
    color: colorTheme.nodeColor,
  };

  const handleUploadImage = useCallback(
    ({
      url,
      width,
      height,
    }: {
      url: string;
      width: number;
      height: number;
    }) => {
      if (isGenerating) return;
      setIsGenerating(true);
      const nodeInfo: INode = {
        nodeId: "",
        type: NODETYPE.IMAGE,
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
        width: width,
        height: height,
        bgColorIdx: 0,
        imageUrl: url,
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
    },
    []
  );

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
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
      <motion.label htmlFor="imageAdderInput" className={styles.imageIcon}>
        <input
          id="imageAdderInput"
          type="file"
          className={styles.imageAdderInput}
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.item(0);
            if (file) {
              let width = 0;
              let height = 0;
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e) => {
                const img = new Image();
                img.src = e.target?.result as string;
                img.onload = () => {
                  width = img.width;
                  height = img.height;

                  if (width > NodeImageLayout.maxWidth) {
                    height = height * (NodeImageLayout.maxWidth / width);
                    width = NodeImageLayout.maxWidth;
                  }
                  if (height > NodeImageLayout.maxHeight) {
                    width = width * (NodeImageLayout.maxHeight / height);
                    height = NodeImageLayout.maxHeight;
                  }

                  const url = uploadImage(file);
                  url.then((res) => {
                    handleUploadImage({
                      url: res,
                      width: width,
                      height: height,
                    });
                  });
                };
              };
            }
          }}
        />
        {isGenerating ? (
          <>
            <PuffLoader color={colorTheme.toolbarBackground2} size={120} />
            <p>Uploading...</p>
          </>
        ) : (
          <>
            <ImageIcon size={120} color={colorTheme.toolbarBackground2} />
            <p>Click to upload image</p>
          </>
        )}
      </motion.label>
    </motion.div>
  );
}
