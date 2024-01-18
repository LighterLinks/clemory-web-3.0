"use client";

import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import { getTitleAndText } from "./Assets/utils";
import { useCallback } from "react";
import EditIcon from "./Assets/EditIcon";
import { useAppSelector } from "@/lib/hooks";
import {
  ColorScheme,
  ColorSchemeDark,
  NodeAudioLayout,
  NodeTextStyle,
} from "@/Designer";
import styles from "./styles/Node.module.css";
import CrossIcon from "./Assets/CrossIcon";
import AudioIcon from "./Assets/AudioIcon";
import { cannotDeleteToast, deleteToast } from "../Toasts/toasts";
import { deleteNode } from "@/app/API/API";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";
// import AudioPlayer from "../../Widget/AudioPlayer/AudioPlayer";

export default function AudioNode(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const openedEditors = useAppSelector(
    (state) => state.editorSlice.openedEditors
  );

  const containerStyle = {
    width: NodeAudioLayout.width,
    height: NodeAudioLayout.height,
    borderRadius: NodeAudioLayout.borderRadius,
    // backgroundColor: colorTheme.nodeBgColors[props.data.bgColor],
    backgroundColor: colorTheme.nodeBgColors[0],
    color: colorTheme.nodeColor,
  };

  const editorBtnStyle = {
    width: NodeAudioLayout.editorBtnWidth,
    height: NodeAudioLayout.editorBtnHeight,
    marginLeft: NodeAudioLayout.editorBtnMarginLeft,
    marginTop: NodeAudioLayout.editorBtnMarginTop,
  };

  const deleteBtnStyle = {
    width: NodeAudioLayout.deleteBtnWidth,
    height: NodeAudioLayout.deleteBtnHeight,
    marginLeft: NodeAudioLayout.deleteBtnMarginLeft,
    marginTop: NodeAudioLayout.deleteBtnMarginTop,
  };

  const iconStyle = {
    width: NodeAudioLayout.iconWidth,
    height: NodeAudioLayout.iconHeight,
    marginLeft: NodeAudioLayout.iconMarginLeft,
    marginTop: NodeAudioLayout.iconMarginTop,
  };

  const titleStyle = {
    width: NodeAudioLayout.titleWidth,
    height: NodeAudioLayout.titleHeight,
    marginLeft: NodeAudioLayout.titleMarginLeft,
    marginTop: NodeAudioLayout.titleMarginTop,
    fontSize: NodeTextStyle.title.fontSize,
    fontWeight: NodeTextStyle.title.fontWeight,
    fontFamily: NodeTextStyle.title.fontFamily,
  };

  const descStyle = {
    width: NodeAudioLayout.descWidth,
    height: NodeAudioLayout.descHeight,
    marginLeft: NodeAudioLayout.descMarginLeft,
    marginTop: NodeAudioLayout.descMarginTop,
    fontSize: NodeTextStyle.desc.fontSize,
    fontWeight: NodeTextStyle.desc.fontWeight,
    fontFamily: NodeTextStyle.desc.fontFamily,
  };

  const { title, text } = getTitleAndText(props.data.content);

  const handleEdit = useCallback(() => {}, []);
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
          size={NodeAudioLayout.editorBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div>
      <div
        className={styles.deleteBtn}
        style={deleteBtnStyle}
        onClick={handleDelete}
      >
        <CrossIcon
          size={NodeAudioLayout.deleteBtnWidth - 10}
          color={colorTheme.nodeIconColor}
        />
      </div>
      <div className={styles.icon} style={iconStyle}>
        <AudioIcon
          size={NodeAudioLayout.iconWidth - 10}
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
