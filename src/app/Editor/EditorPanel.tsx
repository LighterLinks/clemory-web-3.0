"use client";

import styles from "./Styles/EditorPanel.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  getAllNodes,
  readNode,
  readPage,
  setNeedToCalculate,
} from "../API/API";
import LocalStorage from "@/lib/localstroage";
import { INode } from "@/lib/interface";
import { openTab } from "@/lib/features/sidePanel/menuSlice";
import {
  closeEditor,
  openEditor,
  updateCurrentEditor,
  updateIsEditorPanelFullsized,
  updateIsEditorPanelOpen,
} from "@/lib/features/editor/editorSlice";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import CrossIcon from "./Assets/CrossIcon";
import { getTitleAndText } from "../app/Assets/Nodes/Assets/utils";
import Editor from "./Editor";
import DoubleChevron from "./Assets/DoubleChevron";
import EmptyDocIcon from "./Assets/EmptyDocIcon";
import { defaultTransition } from "@/Designer/animation";
import CollapseIcon from "./Assets/CollapseIcon";
import ExpandIcon from "./Assets/ExpandIcon";

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
  const isEditorPanelFullsized = useAppSelector(
    (state) => state.editorSlice.isEditorPanelFullsized
  );
  const isSidebarOpen = useAppSelector(
    (state) => state.toolbarSlice.isSidebarOpen
  );
  const isSidebarExpanded = useAppSelector((state) => state.menuSlice.isOpen);
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
  }, [openedEditors, currentNodes]);

  const invokeNodeCalculation = useCallback((nodeId: string) => {
    setNeedToCalculate(userId, nodeId, true);
  }, []);

  const getNodeTitle = useCallback(
    (nodeId: string) => {
      const node = currentNodes.find((node: INode) => node.nodeId === nodeId);
      if (!node) return "Untitled";
      const { title } = getTitleAndText(node.content);
      return title;
    },
    [currentNodes]
  );

  const handleClickTab = useCallback((nodeId: string) => {
    dispatch(updateCurrentEditor(nodeId));
  }, []);

  const handleCloseTab = useCallback((nodeId: string) => {
    invokeNodeCalculation(nodeId);
    dispatch(closeEditor(nodeId));
    gotoFirstTab();
  }, []);

  const handleClosePanel = useCallback(() => {
    openedEditors.forEach((nodeId: string) => {
      invokeNodeCalculation(nodeId);
    });
    dispatch(updateIsEditorPanelOpen(false));
  }, []);

  const handleOnKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Escape") {
        handleClosePanel();
      }
      // if (e.key === "ArrowLeft") {
      //   const index = openedEditors.findIndex(
      //     (nodeId: string) => nodeId === currentEditor
      //   );
      //   if (index === 0) {
      //     const lastTab = openedEditors[openedEditors.length - 1];
      //     dispatch(updateCurrentEditor(lastTab));
      //   } else {
      //     const prevTab = openedEditors[index - 1];
      //     dispatch(updateCurrentEditor(prevTab));
      //   }
      // }
      // if (e.key === "ArrowRight") {
      //   const index = openedEditors.findIndex(
      //     (nodeId: string) => nodeId === currentEditor
      //   );
      //   if (index === openedEditors.length - 1) {
      //     const firstTab = openedEditors[0];
      //     dispatch(updateCurrentEditor(firstTab));
      //   } else {
      //     const nextTab = openedEditors[index + 1];
      //     dispatch(updateCurrentEditor(nextTab));
      //   }
      // }
    },
    [openedEditors, currentEditor]
  );

  const handleExpandPanel = useCallback(() => {
    dispatch(updateIsEditorPanelFullsized(!isEditorPanelFullsized));
  }, [isEditorPanelFullsized]);

  return (
    <AnimatePresence>
      {isEditorPanelOpen && (
        <motion.div
          className={styles.container}
          key="editor-panel"
          onKeyDown={handleOnKeyDown}
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: 0,
            width: isEditorPanelFullsized
              ? `calc(100% - ${isSidebarExpanded ? "240px" : "80px"})`
              : "50%",
            maxWidth: isEditorPanelFullsized ? "none" : "800px",
            minWidth: isEditorPanelFullsized ? "none" : "400px",
          }}
          exit={{ opacity: 0, x: 100 }}
          transition={defaultTransition}
        >
          <button
            className={styles.closeBtn}
            onClick={handleClosePanel}
            title="Close"
          >
            <DoubleChevron size={20} color={colorTheme.primaryGrey4} />
          </button>
          <button
            className={styles.expandBtn}
            onClick={handleExpandPanel}
            title={`${isEditorPanelFullsized ? "Reduce" : "Expand"}`}
          >
            {isEditorPanelFullsized ? (
              <CollapseIcon size={20} color={colorTheme.primaryGrey4} />
            ) : (
              <ExpandIcon size={20} color={colorTheme.primaryGrey4} />
            )}
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
                  opacity: currentEditor === nodeId ? 1 : 0.5,
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
            {openedEditors.length === 0 && (
              <div className={styles.emptyEditor}>
                <EmptyDocIcon size={200} color={colorTheme.primaryGrey4} />
              </div>
            )}
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
