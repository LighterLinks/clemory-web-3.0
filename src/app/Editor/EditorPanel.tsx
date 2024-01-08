"use client";

import styles from "./Styles/EditorPanel.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect, useState } from "react";
import { getAllNodes, readNode, readPage } from "../API/API";
import LocalStorage from "@/lib/localstroage";
import { INode } from "@/lib/interface";
import { openTab } from "@/lib/features/sidePanel/menuSlice";
import {
  closeEditor,
  openEditor,
  updateCurrentEditor,
  updateIsEditorPanelOpen,
} from "@/lib/features/editor/editorSlice";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import CrossIcon from "./Assets/CrossIcon";
import { getTitleAndText } from "../app/Assets/Nodes/Assets/utils";
import Editor from "./Editor";
import DoubleChevron from "./Assets/DoubleChevron";
import EmptyDocIcon from "./Assets/EmptyDocIcon";
import { defaultTransition } from "@/Designer/animation";

export default function EditorPanel({
  pageId,
  readOnly,
}: {
  pageId: string;
  readOnly: boolean;
}) {
  const userId = LocalStorage.getItem("userId") as string;
  const openedEditors = useAppSelector(
    (state) => state.editorSlice.openedEditors
  );
  const currentEditor = useAppSelector(
    (state) => state.editorSlice.currentEditor
  );
  const isEditorPanelOpen = useAppSelector(
    (state) => state.editorSlice.isEditorPanelOpen
  );
  const currentNodes = useAppSelector((state) => state.nodeSlice.nodes);
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const [editorIndex, setEditorIndex] = useState<number>(-1);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (openedEditors.length === 0) return;
    const index = currentNodes.findIndex(
      (nodeInfo: INode) => nodeInfo.nodeId === currentEditor
    );
    setEditorIndex(index);
  }, [currentEditor]);

  const gotoFirstTab = useCallback(() => {
    if (openedEditors.length === 0) {
      setEditorIndex(-1);
      dispatch(updateCurrentEditor(""));
    } else {
      const firstTab = openedEditors[0];
      currentNodes.forEach((node: INode, index: number) => {
        if (node.nodeId === firstTab) setEditorIndex(index);
      });
      dispatch(updateCurrentEditor(firstTab));
    }
  }, [openedEditors]);

  const getNodeTitle = useCallback(
    (nodeId: string) => {
      const node = currentNodes.find((node: INode) => node.nodeId === nodeId);
      if (!node) return "Untitled";
      const { title } = getTitleAndText(node.content);
      return title;
    },
    [currentNodes]
  );

  const handleCloseTab = useCallback((nodeId: string) => {
    dispatch(closeEditor(nodeId));
    setEditorIndex(-1);
  }, []);

  const handleClickTab = useCallback((nodeId: string) => {
    dispatch(updateCurrentEditor(nodeId));
  }, []);

  const handleClosePanel = useCallback(() => {
    dispatch(updateIsEditorPanelOpen(false));
  }, []);

  return (
    <AnimatePresence>
      {isEditorPanelOpen && (
        <motion.div
          className={styles.container}
          key="editor-panel"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={defaultTransition}
        >
          <button className={styles.closeBtn} onClick={handleClosePanel}>
            <DoubleChevron size={20} color={colorTheme.primaryGrey4} />
          </button>
          <motion.div className={styles.tabs}>
            {openedEditors.map((nodeId: string) => (
              <motion.div
                key={nodeId}
                className={styles.tab}
                onClick={() => handleClickTab(nodeId)}
                style={{
                  borderBottom: `1px solid ${colorTheme.sideBarStrokeColor}`,
                }}
                animate={{
                  borderBottom:
                    currentEditor === nodeId
                      ? "none"
                      : `1px solid ${colorTheme.sideBarStrokeColor}`,
                }}
              >
                <motion.div className={styles.tabTitle}>
                  {getNodeTitle(nodeId)}
                </motion.div>
                <motion.div
                  className={styles.tabClose}
                  onClick={() => handleCloseTab(nodeId)}
                >
                  <CrossIcon size={12} color={colorTheme.primaryGrey4} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className={styles.editor}>
            {/* {editorIndex === -1 ? (
              <div className={styles.emptyEditor}>
                <EmptyDocIcon size={200} color={colorTheme.primaryGrey4} />
              </div>
            ) : (
              <Editor nodeInfo={currentNodes[editorIndex]} />
            )} */}
            {openedEditors.map((nodeId: string) => (
              <div
                key={nodeId}
                className={styles.editorContent}
                style={{ display: currentEditor === nodeId ? "flex" : "none" }}
              >
                <Editor
                  nodeInfo={
                    currentNodes.find((node) => node.nodeId === nodeId)!
                  }
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
