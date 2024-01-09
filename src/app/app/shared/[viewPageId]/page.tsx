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
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { ColorScheme, ColorSchemeDark, FlowLayout } from "@/Designer";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllNodes,
  pageExists,
  updateNodePosition,
  uploadImage,
  viewGetAllNodes,
} from "@/app/API/API";
import { INode, NODETYPE } from "@/lib/interface";
import AudioNode from "../../Assets/Nodes/AudioNode";
import WebNode from "../../Assets/Nodes/WebNode";
import ImageNode from "../../Assets/Nodes/ImageNode";
import NoteNode from "../../Assets/Nodes/NoteNode";
import TextNode from "../../Assets/Nodes/TextNode";
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
import Toolbar from "../../ToolBar/Toolbar";
import Bottombar from "../../BottomBar/BottomBar";
import { onAdding } from "../../Assets/Toasts/toasts";
import { stopLocate } from "@/lib/features/canvas/chatSlice";
import WebNodePH from "../../Assets/Nodes/PlaceHolders/WebNodePH";
import ImageNodePH from "../../Assets/Nodes/PlaceHolders/ImageNodePH";
import TextNodeRO from "../../Assets/Nodes/ReadOnly/TextNodeRO";
import NoteNodeRO from "../../Assets/Nodes/ReadOnly/NoteNodeRO";
import ImageNodeRO from "../../Assets/Nodes/ReadOnly/ImageNodeRO";
import WebNodeRO from "../../Assets/Nodes/ReadOnly/WebNodeRO";
import AudioNodeRO from "../../Assets/Nodes/ReadOnly/AudioNodeRO";

function FlowView() {
  const viewPageId = usePathname().split("/")[3];
  const userId = LocalStorage.getItem("userId") as string;
  const isControlsOpen = useAppSelector(
    (state) => state.toolbarSlice.isControlsOpen
  );
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const currentNodes = useAppSelector((state) => state.nodeSlice.nodes);
  const needLocate = useAppSelector((state) => state.chatSlice.needLocate);
  const locateToPos = useAppSelector((state) => state.chatSlice.postion);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;
  const dispatch = useAppDispatch();
  const queryClient = getQueryClient();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const {
    screenToFlowPosition,
    getZoom,
    flowToScreenPosition,
    fitView,
    setCenter,
    getNodes,
  } = useReactFlow();

  const { isLoading, error, data } = useQuery({
    queryKey: ["nodes"],
    queryFn: () => getAllNodes_async(userId, viewPageId),
    refetchInterval: 500,
  });

  useEffect(() => {
    viewGetAllNodes(viewPageId).then((res) => {
      setNodes(
        res.nodeInfo.map((node: INode) => {
          return {
            id: node.nodeId,
            type: node.type,
            data: node,
            position: { x: node.x, y: node.y },
          };
        })
      );
    });
  }, []);

  const nodeTypes = useMemo(
    () => ({
      text: TextNodeRO,
      note: NoteNodeRO,
      image: ImageNodeRO,
      web: WebNodeRO,
      audio: AudioNodeRO,
      webph: WebNodePH,
      imageph: ImageNodePH,
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleOnNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      fitView({
        padding: 1,
        duration: 0.5,
        nodes: [{ id: node.id }],
      });
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={{
        zoom: 1,
        x: 0,
        y: 0,
      }}
      onInit={setReactFlowInstance}
      onNodeDoubleClick={handleOnNodeDoubleClick}
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
  const viewPageId = usePathname().split("/")[3];
  return (
    <div id="flow-canvas" className={styles.flowView}>
      <ReactFlowProvider>
        <FlowView />
      </ReactFlowProvider>
      <Bottombar />
      <EditorPanel pageId={viewPageId} readOnly={false} />
      <Toaster />
    </div>
  );
}
