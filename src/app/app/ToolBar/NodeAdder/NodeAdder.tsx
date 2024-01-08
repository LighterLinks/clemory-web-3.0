"use client";

import DocIcon from "@/app/Editor/Assets/DocIcon";
import styles from "./NodeAdder.module.css";
import { useAppSelector } from "@/lib/hooks";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import WebIcon from "../../Assets/Nodes/Assets/WebIcon";
import ImageIcon from "../../Assets/Nodes/Assets/ImageIcon";
import AudioIcon from "../../Assets/Nodes/Assets/AudioIcon";
import TextIcon from "../../Assets/Nodes/Assets/TextIcon";
import { NODETYPE } from "@/lib/interface";

export default function NodeAdder() {
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;

  const dndNodes = [
    {
      text: NODETYPE.TEXT,
      type: NODETYPE.TEXT,
      icon: <TextIcon size={24} color={colorTheme.sideBarFontColor} />,
    },
    {
      text: NODETYPE.NOTE,
      type: NODETYPE.NOTE,
      icon: <DocIcon size={24} color={colorTheme.sideBarFontColor} />,
    },
    {
      text: NODETYPE.WEB,
      type: NODETYPE.WEBPH,
      icon: <WebIcon size={24} color={colorTheme.sideBarFontColor} />,
    },
    {
      text: NODETYPE.IMAGE,
      type: NODETYPE.IMAGEPH,
      icon: <ImageIcon size={24} color={colorTheme.sideBarFontColor} />,
    },
    // {
    //   text: NODETYPE.AUDIO,
    //   type: NODETYPE.AUDIOPH,
    //   icon: <AudioIcon size={24} color={colorTheme.sideBarFontColor} />,
    // },
  ];

  const handleOnDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={styles.container}>
      {dndNodes.map((node, index) => (
        <div
          key={index}
          className={styles.dndNode}
          onDragStart={(event) => handleOnDragStart(event, node.type)}
          draggable
        >
          {node.icon}
          {node.text}
        </div>
      ))}
    </div>
  );
}
