"use client";

import { Background, NodeProps } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import styles from "./styles/Node.module.css";
import toast from "react-hot-toast";
import {
  ColorScheme,
  ColorSchemeDark,
  NodeDocLayout,
  NodeTextStyle,
} from "@/Designer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import EditIcon from "./Assets/EditIcon";
import CrossIcon from "./Assets/CrossIcon";
import DocIcon from "./Assets/DocIcon";
import { useCallback } from "react";
import { getTitleAndText } from "./Assets/utils";
import {
  openEditor,
  updateIsEditorPanelOpen,
} from "@/lib/features/editor/editorSlice";
import { deleteToast, infoToast } from "@/app/app/Assets/Toasts/toasts";
import { deleteNode } from "@/app/API/API";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";

export default function DocNode(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();

  const containerStyle = {
    width: NodeDocLayout.width,
    height: NodeDocLayout.height,
    borderRadius: NodeDocLayout.borderRadius,
    backgroundColor: colorTheme.nodeBgColors[props.data.bgColorIdx],
    color: colorTheme.nodeColor,
  };

  const editorBtnStyle = {
    width: NodeDocLayout.editorBtnWidth,
    height: NodeDocLayout.editorBtnHeight,
    marginLeft: NodeDocLayout.editorBtnMarginLeft,
    marginTop: NodeDocLayout.editorBtnMarginTop,
  };

  const deleteBtnStyle = {
    width: NodeDocLayout.deleteBtnWidth,
    height: NodeDocLayout.deleteBtnHeight,
    marginLeft: NodeDocLayout.deleteBtnMarginLeft,
    marginTop: NodeDocLayout.deleteBtnMarginTop,
  };

  const iconStyle = {
    width: NodeDocLayout.iconWidth,
    height: NodeDocLayout.iconHeight,
    marginLeft: NodeDocLayout.iconMarginLeft,
    marginTop: NodeDocLayout.iconMarginTop,
  };

  const titleStyle = {
    width: NodeDocLayout.titleWidth,
    height: NodeDocLayout.titleHeight,
    marginLeft: NodeDocLayout.titleMarginLeft,
    marginTop: NodeDocLayout.titleMarginTop,
    fontSize: NodeTextStyle.title.fontSize,
    fontWeight: NodeTextStyle.title.fontWeight,
    fontFamily: NodeTextStyle.title.fontFamily,
  };

  const descStyle = {
    width: NodeDocLayout.descWidth,
    height: NodeDocLayout.descHeight,
    marginLeft: NodeDocLayout.descMarginLeft,
    marginTop: NodeDocLayout.descMarginTop,
    fontSize: NodeTextStyle.desc.fontSize,
    fontWeight: NodeTextStyle.desc.fontWeight,
    fontFamily: NodeTextStyle.desc.fontFamily,
  };

  const { title, text } = getTitleAndText(props.data.content);

  const handleEdit = useCallback(() => {
    dispatch(openEditor(props.data.nodeId));
    dispatch(updateIsEditorPanelOpen(true));
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
      className={styles.container}
      style={containerStyle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ opacity: 0.6 }}
    >
      <div
        className={styles.editorBtn}
        style={editorBtnStyle}
        onClick={handleEdit}
      >
        <EditIcon
          size={NodeDocLayout.editorBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div>
      <div
        className={styles.deleteBtn}
        style={deleteBtnStyle}
        onClick={handleDelete}
      >
        <CrossIcon
          size={NodeDocLayout.deleteBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div>
      <div className={styles.icon} style={iconStyle}>
        <DocIcon
          size={NodeDocLayout.iconWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div>
      <div className={styles.title} style={titleStyle}>
        {title}
      </div>
      <div className={styles.desc} style={descStyle}>
        {text}
      </div>
    </motion.div>
  );
}
