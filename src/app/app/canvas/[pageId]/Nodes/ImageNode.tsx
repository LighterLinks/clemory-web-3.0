"use client";

import { NodeProps, useReactFlow } from "reactflow";
import { INode } from "@/lib/interface";
import { motion } from "framer-motion";
import { NodeResizer } from "reactflow";
import { NodeImageLayout } from "@/Designer";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import CloseIcon from "./Assets/CloseIcon";
import { deleteNode, updateNode } from "@/app/API/API";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";
import getQueryClient from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { deleteNode_async } from "@/app/API/API_async";
import { deleteToast } from "@/app/app/Assets/Toasts/toasts";

export default function ImageNode(props: NodeProps<INode>) {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const [isResizable, setIsResizable] = useState<boolean>(false);
  const [isDeletable, setIsDeletable] = useState<boolean>(false);
  const [closeIconSize, setCloseIconSize] = useState<number>(50);
  const [imgWidth, setImgWidth] = useState<number>(props.data.width);
  const [imgHeight, setImgHeight] = useState<number>(props.data.height);

  const { getZoom } = useReactFlow();

  const queryClient = getQueryClient();
  const deleteNodeInfo = useMutation({
    mutationFn: (nodeInfo: INode) => deleteNode_async(userId, nodeInfo.nodeId, pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nodes"],
      });
      deleteToast();
    },
  });

  const handleResizable = (b: boolean) => {
    setIsResizable(b);
  };

  const handleDelete = useCallback(() => {
    deleteNodeInfo.mutate(props.data);
  }, []);

  useEffect(() => {
    setCloseIconSize(50 / Math.sqrt(getZoom()));
  }, [getZoom()]);

  return (
    <>
      <NodeResizer
        isVisible={isResizable}
        minWidth={NodeImageLayout.minWidth}
        minHeight={NodeImageLayout.minHeight}
        handleStyle={{
          background: "blue",
          border: "none",
          width: 10 / getZoom(),
          height: 10 / getZoom(),
          borderRadius: "50%",
          bottom: 0,
          right: 0,
          cursor: "resize",
        }}
        onResizeEnd={(e, dragParams) => {
          // resize the image while maintaining the aspect ratio of the original image
          const ratio = props.data.width / props.data.height;
          if (dragParams.width / dragParams.height > ratio) {
            dragParams.width = dragParams.height * ratio;
          } else {
            dragParams.height = dragParams.width / ratio;
          }
          setImgWidth(dragParams.width);
          setImgHeight(dragParams.height);
          const payloadNodeInfo = {
            ...props.data,
            width: dragParams.width,
            height: dragParams.height,
          };
          updateNode(userId, props.data.nodeId, pageId, payloadNodeInfo);
        }}
        onResize={(e, dragParams) => {
          // resize the image while maintaining the aspect ratio of the original image
          const ratio = props.data.width / props.data.height;
          if (dragParams.width / dragParams.height > ratio) {
            dragParams.width = dragParams.height * ratio;
          } else {
            dragParams.height = dragParams.width / ratio;
          }
          setImgWidth(dragParams.width);
          setImgHeight(dragParams.height);
          setIsDeletable(false);
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ opacity: 0.6 }}
        onClick={() => handleResizable(true)}
        // disable resizing when the node is being dragged
        onBlur={() => handleResizable(false)}
        onHoverStart={() => setIsDeletable(true)}
        onHoverEnd={() => setIsDeletable(false)}
      >
        <img
          src={props.data.imageUrl}
          alt="image"
          width={imgWidth}
          height={imgHeight}
          style={{
            borderRadius: NodeImageLayout.borderRadius,
            backgroundColor: props.data.bgColor,
            padding: 0,
          }}
        />
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: closeIconSize,
          height: closeIconSize,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onHoverStart={() => {}}
        onHoverEnd={() => {}}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: isDeletable ? 0.7 : 0 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleDelete}
      >
        <motion.div
          style={{
            position: "absolute",
            width: closeIconSize * 0.7,
            height: closeIconSize * 0.7,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        />
        <motion.div
          style={{
            zIndex: 2,
          }}
        >
          <CloseIcon size={closeIconSize} />
        </motion.div>
      </motion.div>
    </>
  );
}
