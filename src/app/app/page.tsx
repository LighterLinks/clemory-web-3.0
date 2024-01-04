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

export default function Page() {
  const userId = LocalStorage.getItem("userId");
  const isAuth = LocalStorage.getItem("isAuth");

  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const dispatch = useAppDispatch();

  const [colorTheme, setColorTheme] = useState<typeof ColorScheme>(ColorScheme);

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

  const [displayName, setDisplayName] = useState<string>("");
  const [pages, setPages] = useState<IPage[]>([]);
  const pageNameRefs = useRef<HTMLInputElement[]>([]);

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
    deletePage(userId, pageId).then((res) => {
      updateAllPages();
    });
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

  const handlePageClick = useCallback((pageId: string) => {
    if (!userId) {
      return;
    }
    window.location.href = "/app/canvas/" + pageId;
  }, []);

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
      <div className={styles.header}>
        <div className={styles.title}>
          <p>Welcome {displayName}!</p>
        </div>
        <div className={styles.subtitle}>
          <span>First to Clemory? </span>
          <span className={styles.inlineLink}>Take a tour!</span>
        </div>
        <div className={styles.subtitle}>
          <span>Check out new features in </span>
          <span className={styles.inlineLink}>v1.0.1</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          Cell Organizer
          <div className={styles.titleSetting}>
            <ChevronDown size={20} color={colorTheme.sideBarFontColor} />
          </div>
        </div>
        <div className={styles.cellGrid}>
          {pages.map((page: IPage, index) => {
            return (
              <div
                className={styles.cellCard}
                key={page.pageId}
                onClick={() => handlePageClick(page.pageId)}
              >
                <div className={styles.cardImage}>
                  <img
                    className={styles.cardImg}
                    src={
                      "https://clemory.io/IMAGES/pageThumbnail/" +
                      page.pageId +
                      ".png"
                    }
                    alt=""
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
                  {parseCreateTime(page.createTime)}
                </div>
              </div>
            );
          })}
          <motion.div
            className={styles.cellAdderCard}
            onClick={handleAddPage}
            whileHover={{ opacity: 0.5 }}
          >
            <PlusIcon size={40} color="#4A4453" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
