import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  getDefaultReactSlashMenuItems,
  ReactSlashMenuItem,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { HiCode } from "react-icons/hi";

const insertCode = (editor) => {
  const currentBlock = editor.getTextCursorPosition().block;

  const codeBlock = {
    type: "codeBlock",
    content: [
      { type: "text", text: "Codes ", styles: {} }
    ],
  };

  editor.insertBlocks([codeBlock], currentBlock, "before");
};
  
export const CodeSlashMenu = {
  name: "Insert Code Block",
  execute: insertCode,
  aliases: ["code", "cd"],
  group: "Advanced",
  icon: <HiCode size={18} />,
  hint: "Used to insert a code block",
};
