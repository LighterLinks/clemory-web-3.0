"use client";

import { Background, NodeProps, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import styles from "./styles/Node.module.css";
import toast from "react-hot-toast";
import {
  ColorScheme,
  ColorSchemeDark,
  NodeNoteLayout,
  NodeTextStyle,
} from "@/Designer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import EditIcon from "./Assets/EditIcon";
import CrossIcon from "./Assets/CrossIcon";
import NoteIcon from "./Assets/NoteIcon";
import { useCallback } from "react";
import { getTitleAndText } from "./Assets/utils";
import {
  openEditor,
  updateIsEditorPanelOpen,
} from "@/lib/features/editor/editorSlice";
import {
  cannotDeleteToast,
  deleteToast,
  infoToast,
} from "@/app/app/Assets/Toasts/toasts";
import { deleteNode } from "@/app/API/API";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";
import getQueryClient from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { deleteNode_async } from "@/app/API/API_async";

export default function NoteNode(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();
  const openedEditors = useAppSelector(
    (state) => state.editorSlice.openedEditors
  );

  const containerStyle = {
    width: NodeNoteLayout.width,
    height: NodeNoteLayout.height,
    borderRadius: NodeNoteLayout.borderRadius,
    backgroundColor: colorTheme.nodeBgColors[props.data.bgColorIdx],
    color: colorTheme.nodeColor,
  };

  const editorBtnStyle = {
    width: NodeNoteLayout.editorBtnWidth,
    height: NodeNoteLayout.editorBtnHeight,
    marginLeft: NodeNoteLayout.editorBtnMarginLeft,
    marginTop: NodeNoteLayout.editorBtnMarginTop,
  };

  const deleteBtnStyle = {
    width: NodeNoteLayout.deleteBtnWidth,
    height: NodeNoteLayout.deleteBtnHeight,
    marginLeft: NodeNoteLayout.deleteBtnMarginLeft,
    marginTop: NodeNoteLayout.deleteBtnMarginTop,
  };

  const iconStyle = {
    width: NodeNoteLayout.iconWidth,
    height: NodeNoteLayout.iconHeight,
    marginLeft: NodeNoteLayout.iconMarginLeft,
    marginTop: NodeNoteLayout.iconMarginTop,
  };

  const titleStyle = {
    width: NodeNoteLayout.titleWidth,
    height: NodeNoteLayout.titleHeight,
    marginLeft: NodeNoteLayout.titleMarginLeft,
    marginTop: NodeNoteLayout.titleMarginTop,
    fontSize: NodeTextStyle.title.fontSize,
    fontWeight: NodeTextStyle.title.fontWeight,
    fontFamily: NodeTextStyle.title.fontFamily,
  };

  const descStyle = {
    width: NodeNoteLayout.descWidth,
    height: NodeNoteLayout.descHeight,
    marginLeft: NodeNoteLayout.descMarginLeft,
    marginTop: NodeNoteLayout.descMarginTop,
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
    if (openedEditors.includes(props.data.nodeId)) {
      cannotDeleteToast();
      return;
    }
    if (window.confirm("Are you sure you want to delete this node?")) {
      deleteNode(userId, props.data.nodeId, pageId).then((res) => {
        deleteToast();
      });
    }
  }, [openedEditors]);

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
          size={NodeNoteLayout.editorBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div>
      <div
        className={styles.deleteBtn}
        style={deleteBtnStyle}
        onClick={handleDelete}
      >
        <CrossIcon
          size={NodeNoteLayout.deleteBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div>
      <div className={styles.icon} style={iconStyle}>
        <NoteIcon
          size={NodeNoteLayout.iconWidth - 10}
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
