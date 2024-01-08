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

function FlowView() {
  const pageId = usePathname().split("/")[3];
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
  const CtrlVPressed = useKeyPress(["Meta+v", "Strg+v", "Ctrl+v"], {
    actInsideInputWithModifier: false,
    target: document.body,
  });

  const {
    screenToFlowPosition,
    getZoom,
    flowToScreenPosition,
    fitView,
    setCenter,
    getNodes,
  } = useReactFlow();

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
    refetchInterval: 500,
  });

  const addNodeInfo = useMutation({
    mutationFn: (nodeInfo: INode) => createNode_async(userId, nodeInfo, pageId),
    onSuccess: () => {
      toast.dismiss(toastId);
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
      note: NoteNode,
      image: ImageNode,
      web: WebNode,
      audio: AudioNode,
      webph: WebNodePH,
      imageph: ImageNodePH,
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

  const handleOnDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleOnDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const nodeInfo: INode = {
        nodeId: "",
        type: type,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "New text",
                styles: {},
              },
            ],
          },
        ],
        x: position?.x!,
        y: position?.y!,
        width: 200,
        height: 200,
        bgColorIdx: 0,
        scale: 1,
      };
      addNodeInfo.mutate(nodeInfo);
    },
    [pageId, reactFlowInstance]
  );

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

  useEffect(() => {
    if (!CtrlVPressed) return;
    handleClipboardPaste();
  }, [CtrlVPressed]);

  const [currentMousePos, setCurrentMousePos] = useState({ x: 0, y: 0 });
  let toastId: string | undefined = "";

  useEffect(() => {
    document.getElementById("mainFlow")?.addEventListener("mousemove", (e) => {
      setCurrentMousePos({ x: e.clientX, y: e.clientY });
    });

    // extractThumbnail();

    return () => {
      document
        .getElementById("mainFlow")
        ?.removeEventListener("mousemove", () => {});
    };
  }, []);

  useEffect(() => {
    if (!locateToPos) return;
    if (!needLocate) return;
    setCenter(locateToPos.x, locateToPos.y, {
      zoom: 1,
      duration: 400,
    });
    dispatch(stopLocate());
  }, [needLocate]);

  const handleClipboardPaste = () => {
    toastId = onAdding();
    const genPos = screenToFlowPosition({
      x: currentMousePos.x,
      y: currentMousePos.y,
    });

    // get text from clipboard and determine if it is a url or text or image
    let nodeGenType = "text";
    let genData = {};
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    const imgRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})" + // domain name
        "(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\.(png|jpe?g|gif|svg))$",
      "i"
    ); // image format

    // read image from clipboard
    navigator.clipboard.read().then((data) => {
      if (data[0].types.includes("image/png")) {
        nodeGenType = "image";
        data[0].getType("image/png").then((imgBlob) => {
          uploadImage(imgBlob).then((imgUrl: string) => {
            const img = new Image();
            img.src = URL.createObjectURL(imgBlob);
            img.onload = () => {
              let imgWidth = img.width;
              let imgHeight = img.height;
              if (imgWidth > 1000) {
                imgWidth = 1000;
                imgHeight = (imgHeight * 1000) / img.width;
              }
              if (imgHeight > 1000) {
                imgHeight = 1000;
                imgWidth = (imgWidth * 1000) / img.height;
              }
              genData = {
                genX: genPos.x,
                genY: genPos.y,
                imgUrl: imgUrl,
                imgWidth: imgWidth,
                imgHeight: imgHeight,
              };
              addNewNode({ nodeType: nodeGenType, data: genData });
            };
          });
        });
      } else {
        // read text from clipboard
        navigator.clipboard.readText().then((text) => {
          if (imgRegex.test(text)) {
            nodeGenType = NODETYPE.IMAGE;
            // get image size
            const img = new Image();
            img.src = text;
            img.onload = () => {
              let imgWidth = img.width;
              let imgHeight = img.height;
              if (imgWidth > 1000) {
                imgWidth = 1000;
                imgHeight = (imgHeight * 1000) / img.width;
              }
              if (imgHeight > 1000) {
                imgHeight = 1000;
                imgWidth = (imgWidth * 1000) / img.height;
              }
              genData = {
                genX: genPos.x,
                genY: genPos.y,
                imgUrl: text,
                imgWidth: imgWidth,
                imgHeight: imgHeight,
              };
              addNewNode({ nodeType: nodeGenType, data: genData });
            };
          } else if (urlRegex.test(text)) {
            nodeGenType = NODETYPE.WEB;
            genData = {
              genX: genPos.x,
              genY: genPos.y,
              url: text,
            };
            addNewNode({ nodeType: nodeGenType, data: genData });
          } else if (text.includes("\n") || text.length > 30) {
            nodeGenType = NODETYPE.NOTE;
            genData = {
              genX: genPos.x,
              genY: genPos.y,
              text: text.split("\n"),
            };
            addNewNode({ nodeType: nodeGenType, data: genData });
          } else {
            nodeGenType = NODETYPE.TEXT;
            genData = {
              genX: genPos.x,
              genY: genPos.y,
              text: [text],
            };
            addNewNode({ nodeType: nodeGenType, data: genData });
          }
        });
      }
    });
  };

  const addNewNode = useCallback(
    ({ nodeType, data }: { nodeType: string; data: any }) => {
      const payload = {
        nodeId: "",
        type: nodeType,
        pageId: pageId,
        x: data.genX,
        y: data.genY,
        width: nodeType === NODETYPE.IMAGE ? data.imgWidth ?? 100 : 220,
        height: nodeType === NODETYPE.IMAGE ? data.imgHeight ?? 100 : 280,
        scale: 24,
        bgColor: ColorScheme.defaultBackground,
        bgColorIdx: 0,
        content: [NODETYPE.NOTE, NODETYPE.TEXT].includes(nodeType)
          ? data.text.map((t: string, index: number) => {
              return {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: t,
                    styles: {},
                  },
                ],
              };
            })
          : [],
        url: nodeType === NODETYPE.WEB ? data.url : "",
        imageUrl: nodeType === NODETYPE.IMAGE ? data.imgUrl : "",

        faviconUrl: "",
        tags: [],
      } as INode;

      addNodeInfo.mutate(payload);
    },
    []
  );

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
      onInit={setReactFlowInstance}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
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
      {isControlsOpen && (
        <>
          <MiniMap
            zoomable
            pannable
            position="top-right"
            color={colorTheme.defaultBackground}
            nodeColor={colorTheme.defaultBackground}
          />
          <Controls position="bottom-right" showInteractive={false} />
        </>
      )}
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
      <Bottombar />
      <EditorPanel pageId={pageId} readOnly={false} />
      <Toaster />
    </div>
  );
}
