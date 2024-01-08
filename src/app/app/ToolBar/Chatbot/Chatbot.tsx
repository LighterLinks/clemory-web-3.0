"use client";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./Chatbot.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import toast, { Toaster } from "react-hot-toast";
import { setLocation, updateChatOpen } from "@/lib/features/canvas/chatSlice";
import ExitIcon from "./Assets/ExitIcon";
import SendIcon from "./Assets/SendIcon";
import { useEffect, useRef, useState } from "react";
import { chatInPage } from "@/app/API/API";
import ChatIcon from "./Assets/ChatIcon";
import CopyIcon from "./Assets/CopyIcon";
import { chatHistoryInPage, clearChatHistoryInPage } from "@/app/API/API";
import { IChat } from "@/lib/interface";
import LocateIcon from "./Assets/LocateIcon";
import { copiedToast } from "../../Assets/Toasts/toasts";
import LocalStorage from "@/lib/localstroage";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import SearchIcon from "./Assets/SearchIcon";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import RobotIcon from "./Assets/RobotIcon";
import { defaultTransition } from "@/Designer/animation";

interface IChatUnit {
  isUser: boolean;
  text: string;
  position: { x: number; y: number } | null;
}

export default function Chatbot() {
  const userId = LocalStorage.getItem("userId") as string;
  const pageId = usePathname().split("/")[3];
  const isChatbotOpen = useAppSelector(
    (state) => state.toolbarSlice.isChatbotOpen
  );
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const colorTheme = isDarkMode ? ColorSchemeDark : ColorScheme;

  const editorOpen = useAppSelector(
    (state) => state.editorSlice.isEditorPanelOpen
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const [chatResponse, setChatResponse] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IChatUnit[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const scrollChatHistoryToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo({
        top: chatHistoryRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const getHistory = () => {
    const _IChatToUnit = (chat: IChat) => {
      if (chat.pos) {
        return {
          isUser: chat.role === "user" ? true : false,
          text: chat.content,
          position: { x: chat.pos[0], y: chat.pos[1] },
        };
      } else {
        return {
          isUser: chat.role === "user" ? true : false,
          text: chat.content,
          position: null,
        };
      }
    };
    chatHistoryInPage(userId, pageId).then((res) => {
      if (!res.chatInfo) return;
      setChatHistory(res.chatInfo.map((chat: IChat) => _IChatToUnit(chat)));
    });

    setTimeout(() => {
      scrollChatHistoryToBottom();
    }, 100);
  };

  const clearHistory = () => {
    clearChatHistoryInPage(userId, pageId).then((res) => {
      setChatHistory([]);
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    copiedToast();
  };

  const handleLocate = (position: { x: number; y: number }) => {
    dispatch(setLocation({ x: position.x + 200, y: position.y }));
  };

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = async (queryText: string) => {
    // if (queryText.trim() === '') return;
    setIsPending(true);
    setChatHistory((prev) => [
      ...prev,
      { isUser: true, text: queryText, position: { x: 0, y: 0 } },
    ]);

    setTimeout(() => {
      scrollChatHistoryToBottom();
    }, 100);

    const res = await chatInPage(userId, pageId, queryText);
    const reader = res.body?.getReader() as ReadableStreamDefaultReader;
    const decoder = new TextDecoder("utf-8");

    let completeResponse = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setChatHistory((prev) => [
          ...prev,
          { isUser: false, text: completeResponse, position: null },
        ]);
        setIsPending(false);
        setChatResponse("");
        break;
      }
      if (value) {
        const text = decoder.decode(value);
        setChatResponse((prev) => prev + text);
        completeResponse += text;
      }
    }

    // setTimeout(() => {
    //     scrollChatHistoryToBottom();
    // }
    // , 500);
    getHistory();
  };

  useEffect(() => {
    if (pageId === "dashboard") {
      setChatHistory([]);
      dispatch(updateChatOpen(false));
    }
    getHistory();
  }, [pageId]);

  return (
    <AnimatePresence>
      {isChatbotOpen && (
        <motion.div
          className={styles.container}
          id="chatModal-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={defaultTransition}
        >
          <motion.div className={styles.header}>
            <motion.div
              className={styles.clearButton}
              onClick={() => clearHistory()}
            >
              Clear history
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.body}
            style={{
              height: `calc(100% - 77px - ${textareaRef.current?.scrollHeight}px)`,
            }}
          >
            <motion.div className={styles.chatHistory} ref={chatHistoryRef}>
              {chatHistory.length === 0 && (
                <motion.div className={styles.BotChat}>
                  <motion.div className={styles.BotIcon}>
                    <RobotIcon size={32} color={colorTheme.toolbarFontColor} />
                  </motion.div>
                  <motion.div className={styles.chatUnitText}>
                    Hi, I&apos;m your assistant. Ask me anything about this
                    cell!
                  </motion.div>
                </motion.div>
              )}
              {chatHistory.map((unit, index) => {
                return unit.isUser ? (
                  <motion.div
                    className={styles.UserChat}
                    key={`user-chat-${index}`}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <motion.div className={styles.chatUnitTextAlt}>
                      {unit.text}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    className={styles.BotChat}
                    key={`bot-chat-${index}`}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <motion.div className={styles.BotIcon}>
                      <RobotIcon
                        size={32}
                        color={colorTheme.toolbarFontColor}
                      />
                    </motion.div>
                    <motion.div className={styles.chatUnitText}>
                      {unit.text}
                    </motion.div>
                    <motion.div className={styles.IconWrapper}>
                      {unit.position && (
                        <motion.div
                          className={styles.ToFlowIcon}
                          animate={{ opacity: 0.6 }}
                          whileHover={{ scale: 1.03, opacity: 1 }}
                          onClick={() =>
                            handleLocate(
                              unit.position as { x: number; y: number }
                            )
                          }
                        >
                          <LocateIcon size={16} color={"#FFFFFF"} />
                        </motion.div>
                      )}
                      <motion.div
                        className={styles.CopyIcon}
                        animate={{ opacity: 0.6 }}
                        whileHover={{ scale: 1.03, opacity: 1 }}
                        onClick={() => handleCopy(unit.text)}
                      >
                        <CopyIcon />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
              {isPending && (
                <motion.div
                  className={styles.BotChat}
                  transition={{
                    duration: 0,
                  }}
                >
                  <motion.div className={styles.BotIcon}>
                    <RobotIcon size={32} color={colorTheme.toolbarFontColor} />
                  </motion.div>
                  <motion.div className={styles.chatUnitText}>
                    {chatResponse}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <motion.div className={styles.footer}>
            <motion.div className={styles.chatInputContainer}>
              <textarea
                className={styles.chatInput}
                ref={textareaRef}
                rows={1}
                placeholder="Ask about this cell..."
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.shiftKey) {
                      return;
                    }
                    e.preventDefault();
                    if (textareaRef.current) {
                      if (isPending) return;
                      if (textareaRef.current.value.trim() === "") return;
                      handleSend(textareaRef.current.value);
                      textareaRef.current.value = "";
                      handleTextareaChange();
                    }
                  }
                }}
              />
              <motion.div
                className={styles.sendButton}
                onClick={() => {
                  if (textareaRef.current) {
                    if (isPending) return;
                    if (textareaRef.current.value.trim() === "") return;
                    handleSend(textareaRef.current.value);
                    textareaRef.current.value = "";
                    handleTextareaChange();
                  }
                }}
              >
                <SearchIcon size={20} color={colorTheme.toolbarFontColor} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
