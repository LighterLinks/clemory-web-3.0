"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  SelectionMode,
  ReactFlowInstance,
  NodeProps,
  EdgeProps,
  useReactFlow,
  ReactFlowProvider,
  useKeyPress,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import "reactflow/dist/style.css";

import { ColorScheme, ColorSchemeDark, FlowLayout } from "@/Designer";
import toast, { Toaster } from "react-hot-toast";
import { getAllNodes, pageExists, updateNodePosition } from "@/app/API/API";
import { INode } from "@/lib/interface";
import AudioNode from "./Nodes/AudioNode";
import WebNode from "./Nodes/WebNode";
import ImageNode from "./Nodes/ImageNode";
import DocNode from "./Nodes/DocNode";
import TextNode from "./Nodes/TextNode";
import LocalStorage from "@/lib/localstroage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import EditorPanel from "@/app/Editor/EditorPanel";
import { setNodeState, updateNodeState } from "@/lib/features/canvas/nodeSlice";
import getQueryClient from "@/lib/getQueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNode_async,
  getAllNodes_async,
  updateNodePosition_async,
  updateNode_async,
} from "@/app/API/API_async";

const onInit = (reactFlowInstance: ReactFlowInstance<NodeProps, EdgeProps>) => {
  reactFlowInstance.fitView();
};

function FlowView() {
  const pageId = usePathname().split("/")[3];
  const userId = LocalStorage.getItem("userId") as string;
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const currentNodes = useAppSelector((state) => state.nodeSlice.nodes);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();
  const queryClient = getQueryClient();

  useEffect(() => {
    pageExists(pageId).then((res) => {
      if (!res.result) {
        toast.error("Page does not exist!");
        window.location.href = "/app";
      }
    });
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["nodes"],
    queryFn: () => getAllNodes_async(userId, pageId),
    refetchInterval: 1000,
  });

  const addNodeInfo = useMutation({
    mutationFn: (nodeInfo: INode) => createNode_async(userId, nodeInfo, pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nodes"],
      });
    },
  });

  const updateNodeInfo = useMutation({
    mutationFn: (nodeInfo: INode) =>
      updateNode_async(userId, nodeInfo.nodeId, pageId, nodeInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nodes"],
      });
    },
  });

  const updateNodePos = useMutation({
    mutationFn: (nodeInfo: INode) =>
      updateNodePosition_async(
        userId,
        nodeInfo.nodeId,
        pageId,
        nodeInfo.x,
        nodeInfo.y
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nodes"],
      });
    },
  });

  const initialNodes = data
    ? data.nodeInfo.map((node: INode) => {
        return {
          id: node.nodeId,
          type: node.type,
          data: node,
          position: { x: node.x, y: node.y },
        };
      })
    : [];

  const updateCurrentNodes = useCallback(() => {
    if (data) {
      dispatch(setNodeState(data.nodeInfo));
      const newNodes = data.nodeInfo.map((n: INode) => {
        return {
          id: n.nodeId,
          type: n.type,
          data: n,
          position: { x: n.x, y: n.y },
        };
      });
      setNodes(newNodes);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      updateCurrentNodes();
    }
  }, [data]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      text: TextNode,
      doc: DocNode,
      image: ImageNode,
      web: WebNode,
      audio: AudioNode,
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleOnSelectionDragStop = useCallback((event: any, nodes: any) => {
    if (nodes) {
      for (let node of nodes) {
        const { id, type, data, position } = node;
        const nodeInfo = {
          ...data,
          nodeId: id,
          nodeType: type,
          x: position.x,
          y: position.y,
        };
        updateNodePos.mutate(nodeInfo);
      }
    }
  }, []);

  const handleOnDragEnd = useCallback((event: any, node: any) => {
    if (node) {
      const { id, type, data, position } = node;
      const nodeInfo = {
        ...data,
        nodeId: id,
        nodeType: type,
        x: position.x,
        y: position.y,
      };
      updateNodePos.mutate(nodeInfo);
    }
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      // edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onSelectionDragStop={handleOnSelectionDragStop}
      onNodeDragStop={handleOnDragEnd}
      defaultViewport={{
        zoom: 1,
        x: 0,
        y: 0,
      }}
      onInit={onInit}
      nodeTypes={nodeTypes}
      snapGrid={[FlowLayout.dotInterval, FlowLayout.dotInterval]}
      panOnScroll
      // selectionOnDrag
      // selectionMode={SelectionMode.Partial}
      panOnDrag={[0, 1, 2]}
      minZoom={0.2}
      maxZoom={2.5}
      zoomOnDoubleClick={false}
      fitView
      proOptions={{ hideAttribution: true }}
    >
      <MiniMap
        zoomable
        pannable
        position="top-right"
        color={colorTheme.defaultBackground}
        nodeColor={colorTheme.defaultBackground}
      />
      <Controls position="bottom-right" showInteractive={false} />
      <Background color={ColorScheme.dotColor} gap={20} />
    </ReactFlow>
  );
}

export default function Page() {
  const pageId = usePathname().split("/")[3];
  return (
    <div id="flow-canvas" className={styles.flowView}>
      <ReactFlowProvider>
        <FlowView />
      </ReactFlowProvider>
      <EditorPanel pageId={pageId} readOnly={false} />
      <Toaster />
    </div>
  );
}
