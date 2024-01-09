"use client";

import { Background, NodeProps } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import styles from "../styles/Node.module.css";
import toast from "react-hot-toast";
import {
  ColorScheme,
  ColorSchemeDark,
  NodeWebLayout,
  NodeTextStyle,
} from "@/Designer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import EditIcon from "../Assets/EditIcon";
import CrossIcon from "../Assets/CrossIcon";
import NoteIcon from "../Assets/NoteIcon";
import { useCallback } from "react";
import { getTitleAndText } from "../Assets/utils";
import {
  openEditor,
  updateIsEditorPanelOpen,
} from "@/lib/features/editor/editorSlice";
import { deleteToast, infoToast } from "@/app/app/Assets/Toasts/toasts";
import { deleteNode } from "@/app/API/API";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";
import getQueryClient from "@/lib/getQueryClient";
import { useMutation } from "react-query";
import { deleteNode_async } from "@/app/API/API_async";

export default function WebNodeRO(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();

  const containerStyle = {
    width: NodeWebLayout.width,
    height: NodeWebLayout.height,
    borderRadius: NodeWebLayout.borderRadius,
    backgroundColor: colorTheme.nodeBgColors[props.data.bgColorIdx],
    color: colorTheme.nodeColor,
  };

  const editorBtnStyle = {
    width: NodeWebLayout.editorBtnWidth,
    height: NodeWebLayout.editorBtnHeight,
    marginLeft: NodeWebLayout.editorBtnMarginLeft,
    marginTop: NodeWebLayout.editorBtnMarginTop,
  };

  const deleteBtnStyle = {
    width: NodeWebLayout.deleteBtnWidth,
    height: NodeWebLayout.deleteBtnHeight,
    marginLeft: NodeWebLayout.deleteBtnMarginLeft,
    marginTop: NodeWebLayout.deleteBtnMarginTop,
  };

  const iconStyle = {
    width: NodeWebLayout.faviconWidth,
    height: NodeWebLayout.faviconHeight,
    marginLeft: NodeWebLayout.faviconMarginLeft,
    marginTop: NodeWebLayout.faviconMarginTop,
  };

  const titleStyle = {
    width: NodeWebLayout.titleWidth,
    height: NodeWebLayout.titleHeight,
    marginLeft: NodeWebLayout.titleMarginLeft,
    marginTop: NodeWebLayout.titleMarginTop,
    fontSize: NodeTextStyle.title.fontSize,
    fontWeight: NodeTextStyle.title.fontWeight,
    fontFamily: NodeTextStyle.title.fontFamily,
  };

  const urlStyle = {
    width: NodeWebLayout.urlWidth,
    height: NodeWebLayout.urlHeight,
    marginLeft: NodeWebLayout.urlMarginLeft,
    marginTop: NodeWebLayout.urlMarginTop,
    fontSize: NodeTextStyle.url.fontSize,
    fontWeight: NodeTextStyle.url.fontWeight,
    fontFamily: NodeTextStyle.url.fontFamily,
  };

  const imageStyle = {
    width: NodeWebLayout.imageWidth,
    height: NodeWebLayout.imageHeight,
    marginLeft: NodeWebLayout.imageMarginLeft + 2,
    marginTop: NodeWebLayout.imageMarginTop,
    overflow: "hidden",
  };

  const descStyle = {
    width: NodeWebLayout.descWidth,
    height: NodeWebLayout.descHeight,
    marginLeft: NodeWebLayout.descMarginLeft,
    marginTop: NodeWebLayout.descMarginTop,
    fontSize: NodeTextStyle.desc.fontSize,
    fontWeight: NodeTextStyle.desc.fontWeight,
    fontFamily: NodeTextStyle.desc.fontFamily,
  };

  const urlBoxStyle = {
    width: NodeWebLayout.urlBoxWidth,
    height: NodeWebLayout.urlBoxHeight,
    marginLeft: NodeWebLayout.urlBoxMarginLeft,
    marginTop: NodeWebLayout.urlBoxMarginTop,
    borderRadius: NodeWebLayout.urlBoxCornerRadius,
    backgroundColor: colorTheme.sideBarBackgroundHighlight,
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

  const handleUrlClick = useCallback(() => {
    window.open(props.data.url, "_blank");
  }, []);

  return (
    <motion.div
      className={styles.container}
      style={containerStyle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ opacity: 0.6 }}
    >
      {/* <div
        className={styles.editorBtn}
        style={editorBtnStyle}
        onClick={handleEdit}
      >
        <EditIcon
          size={NodeWebLayout.editorBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div> */}
      {/* <div
        className={styles.deleteBtn}
        style={deleteBtnStyle}
        onClick={handleDelete}
      >
        <CrossIcon
          size={NodeWebLayout.deleteBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div> */}
      <div className={styles.urlBox} style={urlBoxStyle} />
      <div className={styles.icon} style={iconStyle}>
        <img
          src={props.data.faviconUrl}
          width={NodeWebLayout.faviconWidth - 10}
          height={NodeWebLayout.faviconHeight - 10}
        />
      </div>
      <div className={styles.image} style={imageStyle}>
        <img
          src={props.data.imageUrl}
          width={NodeWebLayout.imageWidth - 4}
          // height={NodeWebLayout.imageHeight}
        />
      </div>
      <div className={styles.url} style={urlStyle} onClick={handleUrlClick}>
        {props.data.url}
      </div>
      {/* <div className={styles.title} style={titleStyle}>
        {title}
      </div> */}
      <div className={styles.desc} style={descStyle}>
        {text}
      </div>
    </motion.div>
  );
}
