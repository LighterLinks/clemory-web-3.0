"use client";

import SettingLogo from "./Assets/Icons/SettingLogo";
import UserLogo from "./Assets/Icons/UserLogo";
import styles from "./page.module.css";
import {
  createNewPage,
  deletePage,
  getAllPages,
  getUserInfo,
  updatePage,
  uploadThumbnailImage,
} from "../API/API";
import {
  createRef,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IPage } from "@/lib/interface";
import PlusIcon from "./Assets/Icons/PlusIcon";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openMenu } from "@/lib/features/sidePanel/menuSlice";
import SettingLogoAlt from "./Assets/Icons/SettingLogoAlt";
import { ColorScheme, ColorSchemeDark } from "@/Designer";
import { updateIsDarkMode } from "@/lib/features/global/settingSlice";
import ChevronDown from "./Assets/Icons/ChevronDown";
import LocalStorage from "@/lib/localstroage";
import { generateMixpanelEvent, mixpanelEventName } from "@/lib/mixpanelAction";
import defaultThumbnail from "./Assets/Images/defaultThumbnail.png";
import Image from "next/image";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import ContextMenu from "./Assets/ContextMenu/ContextMenu";
import DeleteIcon from "./Assets/Nodes/Assets/DeleteIcon";
import MinusCircleIcon from "./Assets/Icons/MinusCircleIcon";
import CheckCircleIcon from "./Assets/Icons/CheckCircleIcon";
import EllipsisIcon from "./Assets/Icons/EllipsisIcon";

const MENU_ID = "menu-id";

export default function Page() {
  const userId = LocalStorage.getItem("userId");
  const isAuth = LocalStorage.getItem("isAuth");
  const [displayName, setDisplayName] = useState<string>("");
  const [pages, setPages] = useState<IPage[]>([]);
  const [isEditingLayout, setIsEditingLayout] = useState<boolean>(false);
  const pageNameRefs = useRef<HTMLInputElement[]>([]);

  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const dispatch = useAppDispatch();

  const [colorTheme, setColorTheme] = useState<typeof ColorScheme>(ColorScheme);

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function displayMenu(e: any) {
    show({
      event: e,
    });
  }

  useEffect(() => {
    if (LocalStorage.getItem("theme") === "dark") {
      dispatch(updateIsDarkMode(true));
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      dispatch(updateIsDarkMode(false));
      document.documentElement.setAttribute("data-theme", "light");
    }
    setColorTheme(isDarkMode ? ColorSchemeDark : ColorScheme);
  }, [isDarkMode]);

  useEffect(() => {
    if (!isAuth) {
      window.location.href = "/signin";
    }
  }, []);

  const getUserDisplayName = useCallback(() => {
    if (!userId) {
      return;
    }
    getUserInfo(userId).then((res) => {
      setDisplayName(res.userInfo.displayName);
    });
  }, []);

  const updateAllPages = useCallback(() => {
    if (!userId) {
      return;
    }
    getAllPages(userId).then((res) => {
      setPages(res.pageInfo.toReversed());
      pageNameRefs.current = pages.map(
        (_, i) => pageNameRefs.current[i] || createRef()
      );
    });
  }, []);

  const handleAddPage = useCallback(() => {
    if (!userId) {
      return;
    }
    const pageName = "New Cell";
    createNewPage(userId, pageName).then((res) => {
      updateAllPages();
    });
  }, []);

  const handleDeletePage = useCallback((pageId: string) => {
    if (!userId) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this page?")) {
      deletePage(userId, pageId).then((res) => {
        updateAllPages();
      });
    }
  }, []);

  const handleRenamePage = useCallback((pageInfo: IPage, index: number) => {
    if (!userId) {
      return;
    }
    const pageName = pageNameRefs.current[index].value;
    if (!pageName) {
      return;
    }
    pageNameRefs.current[index].readOnly = true;
    pageNameRefs.current[index].blur();
    const payload: IPage = {
      ...pageInfo,
      pageName: pageName,
    };
    updatePage(userId, payload).then((res) => {
      updateAllPages();
    });
  }, []);

  const handlePageClick = useCallback(
    (pageId: string) => {
      if (!userId || isEditingLayout) {
        return;
      }
      window.location.href = "/app/canvas/" + pageId;
      generateMixpanelEvent(userId, mixpanelEventName.VIEW_PAGE, {
        "Page ID": pageId,
        "Page Name":
          pageNameRefs.current[
            pages.findIndex((page) => page.pageId === pageId)
          ].value,
      });
    },
    [isEditingLayout]
  );

  const parseCreateTime = useCallback((createTime: string) => {
    // 2021-09-07T15:00:00.000Z -> 2021-09-07 15:00:00
    const date = createTime.split("T")[0];
    const time = createTime.split("T")[1].split(".")[0];
    return date + " " + time;
  }, []);

  useEffect(() => {
    getUserDisplayName();
    updateAllPages();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.title}>
          Dashboard
          <div
            className={styles.titleSetting}
            onClick={() => setIsEditingLayout(!isEditingLayout)}
          >
            {isEditingLayout ? (
              <CheckCircleIcon size={20} color={colorTheme.sideBarFontColor} />
            ) : (
              <EllipsisIcon size={20} color={colorTheme.sideBarFontColor} />
            )}
          </div>
        </div>
        <div className={styles.cellGrid}>
          {pages.map((page: IPage, index) => {
            return (
              <motion.div
                className={styles.cellCard}
                key={page.pageId}
                onClick={() => handlePageClick(page.pageId)}
                onContextMenu={displayMenu}
                // vibration loop animation when editing layout
                animate={
                  isEditingLayout
                    ? {
                        rotate: [0, 1, -1, 1, -1, 0],
                        transition: {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "mirror",
                        },
                      }
                    : {
                        rotate: 0,
                      }
                }
              >
                <div className={styles.cardImage}>
                  <Image
                    className={styles.cardImg}
                    width={400}
                    height={300}
                    src={page.thumbnailUrl!}
                    alt="thumbnail"
                    style={{ flexShrink: 0 }}
                  />
                </div>
                <input
                  className={styles.cardTitle}
                  type="text"
                  defaultValue={page.pageName}
                  ref={(el) => (pageNameRefs.current[index] = el!)}
                  readOnly={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    pageNameRefs.current[index].readOnly = false;
                  }}
                  onBlur={() => handleRenamePage(page, pages.indexOf(page))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRenamePage(page, pages.indexOf(page));
                    }
                  }}
                />
                <div className={styles.cardSubtitle}>
                  <span>Last edited: </span>
                  {parseCreateTime(page.createTime)}
                </div>
                {isEditingLayout && (
                  <div className={styles.deleteBtn}>
                    <div
                      className={styles.deleteBtnIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePage(page.pageId);
                      }}
                    >
                      <MinusCircleIcon
                        size={20}
                        color={colorTheme.warningRed}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
          <motion.div
            className={styles.cellAdderCard}
            onClick={handleAddPage}
            whileHover={{ opacity: 0.8 }}
            animate={{ opacity: 0.5 }}
          >
            <span>Create a new page</span>
            <PlusIcon size={30} color="#4A4453" />
          </motion.div>
          <ContextMenu />
        </div>
      </div>
    </div>
  );
}
