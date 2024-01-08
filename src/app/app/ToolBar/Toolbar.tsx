"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./Toolbar.module.css";
import MenuIcon from "./Icons/MenuIcon";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback } from "react";
import {
  updateIsChatbotOpen,
  updateIsControlsOpen,
  updateIsNodeAdderOpen,
  updateIsSidebarOpen,
} from "@/lib/features/toolbar/toolbarSlice";
import MinimapIcon from "./Icons/MinimapIcon";
import ChatIcon from "./Icons/ChatIcon";
import TriangleUpIcon from "./Icons/TriangleUpIcon";
import TriangleDownIcon from "./Icons/TriangleDownIcon";
import { usePathname } from "next/navigation";
import NodeAdder from "./NodeAdder/NodeAdder";
import EditIcon from "../Assets/Nodes/Assets/EditIcon";
import { updateIsEditorPanelOpen } from "@/lib/features/editor/editorSlice";
import Chatbot from "./Chatbot/Chatbot";
import ControlIcon from "./Icons/Controllcon";

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const pathName = usePathname().split("/")[2];
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const isNodeAdderOpen = useAppSelector(
    (state) => state.toolbarSlice.isNodeAdderOpen
  );
  const isChatbotOpen = useAppSelector(
    (state) => state.toolbarSlice.isChatbotOpen
  );
  const isControlsOpen = useAppSelector(
    (state) => state.toolbarSlice.isControlsOpen
  );
  const isSidebarOpen = useAppSelector(
    (state) => state.toolbarSlice.isSidebarOpen
  );
  const isEditorPanelOpen = useAppSelector(
    (state) => state.editorSlice.isEditorPanelOpen
  );
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;

  const toggleSidebar = useCallback(() => {
    dispatch(updateIsSidebarOpen(!isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleNodeAdder = useCallback(() => {
    dispatch(updateIsNodeAdderOpen(!isNodeAdderOpen));
  }, [isNodeAdderOpen]);

  const toggleControls = useCallback(() => {
    dispatch(updateIsControlsOpen(!isControlsOpen));
  }, [isControlsOpen]);

  const toggleChatbot = useCallback(() => {
    dispatch(updateIsChatbotOpen(!isChatbotOpen));
  }, [isChatbotOpen]);

  const toggleEditorPanel = useCallback(() => {
    dispatch(updateIsEditorPanelOpen(!isEditorPanelOpen));
  }, [isEditorPanelOpen]);

  return (
    <motion.div id="toolbar" className={styles.toolbar}>
      <div className={styles.wrapper}>
        <div
          className={styles.textButton}
          style={{
            backgroundColor: isSidebarOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
          }}
          onClick={toggleSidebar}
        >
          <p>Menu</p>
          <MenuIcon size={20} color={colorTheme.toolbarFontColor} />
        </div>
      </div>
      <div
        className={styles.wrapper}
        style={{
          display: pathName === "canvas" ? "flex" : "none",
        }}
      >
        <div
          className={styles.textButton}
          style={{
            backgroundColor: isNodeAdderOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
          }}
          onClick={toggleNodeAdder}
        >
          <p>Create node</p>
          {isNodeAdderOpen ? (
            <>
              <TriangleDownIcon size={18} color={colorTheme.toolbarFontColor} />
            </>
          ) : (
            <TriangleUpIcon size={18} color={colorTheme.toolbarFontColor} />
          )}
        </div>
        {isNodeAdderOpen && (
          <div className={styles.nodeAdder}>
            <NodeAdder />
          </div>
        )}
      </div>
      <div
        className={styles.wrapper}
        style={{
          display: pathName === "canvas" ? "flex" : "none",
        }}
      >
        <div
          className={styles.textButton}
          style={{
            backgroundColor: isChatbotOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
          }}
          onClick={toggleChatbot}
        >
          <p>Chatbot</p>
          <ChatIcon size={20} color={colorTheme.toolbarFontColor} />
        </div>
        <div
          className={styles.textButton}
          style={{
            backgroundColor: isControlsOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
          }}
          onClick={toggleControls}
        >
          <p>Controls</p>
          <ControlIcon size={20} color={colorTheme.toolbarFontColor} />
        </div>
        <div
          className={styles.textButton}
          style={{
            backgroundColor: isEditorPanelOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
          }}
          onClick={toggleEditorPanel}
        >
          <p>Editor</p>
          <EditIcon size={20} color={colorTheme.toolbarFontColor} />
        </div>
        <div className={styles.chatModal}>
          <Chatbot />
        </div>
      </div>
    </motion.div>
  );
}
