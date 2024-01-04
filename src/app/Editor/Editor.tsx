"use client";

import { INode } from "@/lib/interface";
import styles from "./Styles/Editor.module.css";
import { getTitleAndText } from "../app/canvas/[pageId]/Nodes/Assets/utils";
import BlockEditor from "./BlockEditor";

export default function Editor({ nodeInfo }: { nodeInfo: INode }) {
  return (
    <div className={styles.container}>
      <BlockEditor key={nodeInfo.nodeId} nodeInfo={nodeInfo} />
    </div>
  );
}
