"use client";

import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import styles from "./styles/Node.module.css";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import CheckCircleIcon from "./Assets/CheckCircleIcon";
import EditIcon from "./Assets/EditIcon";
import { useAppSelector } from "@/lib/hooks";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import CrossIcon from "./Assets/CrossIcon";
import DeleteIcon from "./Assets/DeleteIcon";
import CheckIcon from "./Assets/CheckIcon";
import { usePathname } from "next/navigation";
import { deleteNode, updateNode } from "@/app/API/API";
import LocalStorage from "@/lib/localstroage";
import { deleteToast, successToast } from "../Toasts/toasts";

export default function TextNode(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [textSize, setTextSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const textRef = useRef<HTMLInputElement>(null);

  const calculateTextWidthHeight = (text: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // ctx.font = `${props.data.scale}px Helvetica`;
      ctx.font = `14px Helvetica`;
      const width = ctx.measureText(text).width;
      const height =
        ctx.measureText(text).actualBoundingBoxAscent +
        ctx.measureText(text).actualBoundingBoxDescent;
      return { width: width, height: height };
    }
    return { width: 0, height: 0 };
  };

  const handleOnInputChange = useCallback(() => {
    setTextSize(
      calculateTextWidthHeight(
        textRef.current?.value || props.data.content[0].content[0].text
      )
    );
  }, [textRef.current?.value]);

  useEffect(() => {
    setTextSize(
      calculateTextWidthHeight(props.data.content[0].content[0].text)
    );
  }, []);

  const textContainerStyle = {
    borderRadius: 5,
    // padding: "5px 10px",
  };

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleOnHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleOnHoverOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleSave = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(false);
    const formData = new FormData(event.currentTarget);
    const textData = formData.get("text") as string;
    updateNode(userId, props.data.nodeId, pageId, {
      ...props.data,
      content: [
        {
          type: "paragraph",
          content: [
            {
              ...props.data.content[0].content[0],
              text: textData,
            },
          ],
        },
      ],
    }).then((res) => {
      successToast();
    });
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this node?")) {
      deleteNode(userId, props.data.nodeId, pageId).then((res) => {
        deleteToast();
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={styles.container}
      style={{
        ...textContainerStyle,
        border: isEditing
          ? `1px solid ${colorTheme.highlightBorderColor}`
          : "none",
      }}
      onHoverStart={handleOnHover}
      onHoverEnd={handleOnHoverOut}
    >
      {!isEditing ? (
        isHovered && (
          <div className={styles.textButton} onClick={handleEdit}>
            <EditIcon size={8} color={colorTheme.toolbarFontColor} />
          </div>
        )
      ) : (
        <>
          <div className={styles.cancelButton} onClick={handleCancel}>
            <CrossIcon size={8} color={colorTheme.toolbarFontColor} />
          </div>
          <div className={styles.deleteButton} onClick={handleDelete}>
            <DeleteIcon size={8} color={colorTheme.toolbarFontColor} />
          </div>
        </>
      )}
      <form className={styles.textInputWrapper}
        onSubmit={handleSave}
      >{isEditing && (
        <button className={styles.textButton}>
          <CheckIcon size={8} color={colorTheme.toolbarFontColor} />
        </button>)}
        <input
          className={styles.textInput}
          ref={textRef}
          type="text"
          name="text"
          readOnly={!isEditing}
          autoComplete="off"
          onChange={handleOnInputChange}
          style={{
            userSelect: isEditing ? "auto" : "none",
            width: textSize.width + 10,
            height: textSize.height + 5,
          }}
          defaultValue={props.data.content[0].content[0].text}
        />
      </form>
    </motion.div>
  );
}
