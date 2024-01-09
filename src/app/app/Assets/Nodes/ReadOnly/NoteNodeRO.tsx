"use client";

import { Background, NodeProps, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import styles from "../styles/Node.module.css";
import {
  ColorScheme,
  ColorSchemeDark,
  NodeNoteLayout,
  NodeTextStyle,
} from "@/Designer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import NoteIcon from "../Assets/NoteIcon";
import { getTitleAndText } from "../Assets/utils";

export default function NoteNodeRO(props: NodeProps<INode>) {
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;

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

  return (
    <motion.div
      className={styles.container}
      style={containerStyle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ opacity: 0.6 }}
    >
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
