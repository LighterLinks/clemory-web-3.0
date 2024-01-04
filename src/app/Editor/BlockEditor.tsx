import {
  BlockNoteView,
  darkDefaultTheme,
  getDefaultReactSlashMenuItems,
  lightDefaultTheme,
  useBlockNote,
} from "@blocknote/react";
import { updateNode, uploadImage } from "../API/API";
import { defaultBlockSchema, defaultBlockSpecs } from "@blocknote/core";
import { CodeSlashMenu } from "./CustomMenus/Code/CodeSlashMenu";
import { CodeBlockSpec } from "./CustomMenus/Code/CodeBlockSpec";
import { useCallback } from "react";
import { INode } from "@/lib/interface";
import "@blocknote/core/style.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";
import { updateNodeState } from "@/lib/features/canvas/nodeSlice";
import getQueryClient from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { updateNode_async } from "../API/API_async";

export default function BlockEditor({ nodeInfo }: { nodeInfo: INode }) { 
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const customTheme = isDarkMode ? darkDefaultTheme : lightDefaultTheme;
  customTheme.colors.editor.background = "transparent";
  //  {
  //   ...lightDefaultTheme,
  //   colors: {
  //     ...lightDefaultTheme.colors,
  //     editor: {
  //       text: "#000",
  //       background: "transparent",
  //     },
  //     sideMenu: "#9A9A97",
  //     // sideMenu: "#FFF",
  //   },
  // };

  const blockSchema = {
    ...defaultBlockSchema,
    codeBlock: CodeBlockSpec.config,
  };

  const blockSpecs = {
    ...defaultBlockSpecs,
    codeBlock: CodeBlockSpec,
  };

  const slashMenuItems = [
    ...getDefaultReactSlashMenuItems(blockSchema),
    CodeSlashMenu,
  ];

  const queryClient = getQueryClient();
  const updateNodeInfo = useMutation({
    mutationFn: (nodeInfo: INode) =>
      updateNode_async(userId, nodeInfo.nodeId, pageId, nodeInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nodes"],
      });
    },
  });

  const handleSave = useCallback((blocks: any) => {
    const payload: INode = {
      ...nodeInfo,
      content: blocks,
    }
    updateNodeInfo.mutate(payload);
    dispatch(updateNodeState(payload));
  }, []);

  const editor = useBlockNote({
    initialContent: nodeInfo.content,
    onEditorContentChange: (editor) => {
      handleSave(editor.topLevelBlocks);
    },
    uploadFile: uploadImage,
    slashMenuItems: slashMenuItems,
    blockSpecs: blockSpecs,
  });

  return (
    <>
      <BlockNoteView
        editor={editor}
        theme={customTheme}
        style={{
          // maxWidth: '850px',
          width: "100%",
          height: "100%",
          paddingBottom: "100px",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      />
      {/* <pre>{JSON.stringify(blocks, null, 2)}</pre> */}
    </>
  );
}
