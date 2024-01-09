"use client";

import { NodeProps, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import { NodeImageLayout } from "@/Designer";
import Image from "next/image";

export default function ImageNodeRO(props: NodeProps<INode>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ opacity: 0.6 }}
    >
      <Image
        src={props.data.imageUrl!}
        alt="image"
        width={props.data.width}
        height={props.data.height}
        style={{
          borderRadius: NodeImageLayout.borderRadius,
          backgroundColor: props.data.bgColor,
          padding: 0,
        }}
      />
    </motion.div>
  );
}
