import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import styles from "./styles/Node.module.css";

export default function TextNode(props: NodeProps<INode>) {
  const calculateTextWidthHeight = (text: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = `${props.data.scale}px Helvetica`;
      const width = ctx.measureText(text).width;
      const height =
        ctx.measureText(text).actualBoundingBoxAscent +
        ctx.measureText(text).actualBoundingBoxDescent;
      return { width: width, height: height + 5 };
    }
    return { width: 0, height: 0 };
  };

  return (
    <motion.div className={styles.container}>
      {props.data.content[0].text}
    </motion.div>
  );
}
