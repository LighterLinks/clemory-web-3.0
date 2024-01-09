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
  updateIsShareModalOpen,
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
import ShareIcon from "./Icons/ShareIcon";
import TreemapIcon from "./Icons/TreemapIcon";
import ShareModal from "./ShareModal/ShareModal";
import { logEvent } from "@/app/API/API";

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
  const isShareModalOpen = useAppSelector(
    (state) => state.toolbarSlice.isShareModalOpen
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

  const toggleShareModal = useCallback(() => {
    dispatch(updateIsShareModalOpen(!isShareModalOpen));
  }, [isShareModalOpen]);

  const handleGetStarted = useCallback(() => {
    window.open("https://clemory.io/clemory_view_login", "_blank");
    logEvent("get_started_from_shared");
  }, []);

  return (
    <motion.div id="toolbar" className={styles.toolbar}>
      <div
        className={styles.wrapper}
        style={{
          display: pathName === "shared" ? "flex" : "none",
        }}
      >
        <p>
          This is readonly version of Clemory app. Make your own information
          storage in Clemory!
        </p>
        <motion.div
          className={styles.textButton}
          style={{
            backgroundColor: isSidebarOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
            fontSize: 16,
            fontWeight: 300,
            marginLeft: 20,
            padding: "10px 10px",
            border: "1px solid #000",
            borderRadius: 5,
          }}
          onClick={handleGetStarted}
          whileHover={{
            scale: 1.04,
            backgroundColor: colorTheme.toolbarBackground2,
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          <p>Start now</p>
        </motion.div>
      </div>
      <div
        className={styles.wrapper}
        style={{
          display: pathName === "shared" ? "none" : "flex",
        }}
      >
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
        <div className={styles.textButtonVoid}></div>
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
          {!isNodeAdderOpen ? (
            <>
              <TriangleDownIcon size={18} color={colorTheme.toolbarFontColor} />
            </>
          ) : (
            <TriangleUpIcon size={18} color={colorTheme.toolbarFontColor} />
          )}
        </div>
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
        <div className={styles.chatModal}>
          <Chatbot />
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
            backgroundColor: isControlsOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
          }}
          onClick={toggleControls}
        >
          <p>Minimap</p>
          <TreemapIcon size={20} color={colorTheme.toolbarFontColor} />
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
        <div
          className={styles.textButton}
          style={{
            backgroundColor: isShareModalOpen
              ? colorTheme.toolbarBackground2
              : colorTheme.toolbarBackground,
          }}
          onClick={toggleShareModal}
        >
          <p>Share</p>
          <ShareIcon size={20} color={colorTheme.toolbarFontColor} />
        </div>
        <div className={styles.shareModal}>
          <ShareModal />
        </div>
      </div>
    </motion.div>
  );
}
