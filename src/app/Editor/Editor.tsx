"use client";

import { INode, NODETYPE } from "@/lib/interface";
import styles from "./Styles/Editor.module.css";
import { getTitleAndText } from "../app/Assets/Nodes/Assets/utils";
import BlockEditor from "./BlockEditor";
import WebFrame from "./WebFrame";

export default function Editor({ nodeInfo }: { nodeInfo: INode }) {
  return (
    <div className={styles.container}>
      {/* {nodeInfo.type === NODETYPE.WEB ? (
        <WebFrame key={nodeInfo.nodeId} nodeInfo={nodeInfo} />
      ) : (
        <BlockEditor key={nodeInfo.nodeId} nodeInfo={nodeInfo} />
      )} */}
      <BlockEditor key={nodeInfo.nodeId} nodeInfo={nodeInfo} />
    </div>
  );
}
