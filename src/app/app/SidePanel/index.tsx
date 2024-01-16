"use client";

import styles from "./index.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, color, motion } from "framer-motion";
import { ColorScheme, ColorSchemeDark, SidebarLayout } from "@/Designer";
import ClemoryLogoAlt from "../Assets/Icons/ClemoryLogoAlt";
import BoardIcon from "../Assets/Icons/BoardIcon";
import ClemoryLogo from "../Assets/Icons/ClemoryLogo";
import UserLogo from "../Assets/Icons/UserLogo";
import SettingLogo from "../Assets/Icons/SettingLogo";
import LeftExpandIcon from "../Assets/Icons/LeftExpandIcon";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { openMenu, updateIsMenuOpen } from "@/lib/features/sidePanel/menuSlice";
import Link from "next/link";
import HomeIcon from "../Assets/Icons/HomeIcon";
import NotePadIcon from "../Assets/Icons/NotePadIcon";
import HelpIcon from "../Assets/Icons/HelpIcon";
import LogoutIcon from "../Assets/Icons/LogoutIcon";
import CalendarIcon from "../Assets/Icons/Calendar";
import CommunityIcon from "../Assets/Icons/CommunityIcon";
import { updateIsDarkMode } from "@/lib/features/global/settingSlice";
import ListViewIcon from "../Assets/Icons/ListViewIcon";
import { defaultTransition } from "@/Designer/animation";
import LocalStorage from "@/lib/localstroage";
import { getUserInfo } from "@/app/API/API";
import { IUser } from "@/lib/interface";
import Image from "next/image";

export default function SidePanel() {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
  }
  const userId = LocalStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState<IUser>();
  const isMenuOpen = useAppSelector((state) => state.menuSlice.isOpen);
  const openedMenu = useAppSelector((state) => state.menuSlice.openedMenu);
  const isSidebarOpen = useAppSelector(
    (state) => state.toolbarSlice.isSidebarOpen
  );
  const isDarkMode = useAppSelector((state) => state.settingSlice.isDarkMode);
  const dispatch = useAppDispatch();

  const [colorTheme, setColorTheme] = useState<typeof ColorScheme>(ColorScheme);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      dispatch(updateIsDarkMode(true));
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      dispatch(updateIsDarkMode(false));
      document.documentElement.setAttribute("data-theme", "light");
    }
    setColorTheme(isDarkMode ? ColorSchemeDark : ColorScheme);
  }, [isDarkMode]);

  const mainItems = [
    {
      name: "Dashboard",
      icon: (flag: boolean) => {
        return (
          <HomeIcon
            size={SidebarLayout.logoSize}
            color={
              flag
                ? colorTheme.sideBarFontColor
                : colorTheme.sideBarFontColorUnselected
            }
          />
        );
      },
      link: "/app",
    },
    {
      name: "Community",
      icon: (flag: boolean) => {
        return (
          <CommunityIcon
            size={SidebarLayout.logoSize}
            color={
              flag
                ? colorTheme.sideBarFontColor
                : colorTheme.sideBarFontColorUnselected
            }
          />
        );
      },
      link: "/app/community",
    },
    // {
    //   name: "List View",
    //   icon: (flag: boolean) => {
    //     return (
    //       <ListViewIcon
    //         size={30}
    //         color={flag ? colorTheme.sideBarFontColor : colorTheme.primaryGrey2}
    //       />
    //     );
    //   },
    //   link: "/app/lists",
    // },
    // {
    //   name: "Canvas View",
    //   icon: (flag: boolean) => {
    //     return (
    //       <CalendarIcon
    //         size={30}
    //         color={flag ? colorTheme.sideBarFontColor : colorTheme.primaryGrey2}
    //       />
    //     );
    //   },
    //   link: "/app/canvas",
    // },
  ];

  const subItems = [
    {
      name: "Profile",
      icon: (flag: boolean) => {
        return (
          <UserLogo
            size={SidebarLayout.logoSize}
            color={
              flag
                ? colorTheme.sideBarFontColor
                : colorTheme.sideBarFontColorUnselected
            }
          />
        );
      },
      link: "/app/profile",
    },
    {
      name: "Settings",
      icon: (flag: boolean) => {
        return (
          <SettingLogo
            size={SidebarLayout.logoSize}
            color={
              flag
                ? colorTheme.sideBarFontColor
                : colorTheme.sideBarFontColorUnselected
            }
          />
        );
      },
      link: "/app/settings",
    },
  ];

  const footerItems = [
    {
      name: "Help",
      icon: (flag: boolean) => {
        return (
          <HelpIcon
            size={SidebarLayout.logoSize}
            color={flag ? colorTheme.sideBarFontColor : colorTheme.basicWhite}
          />
        );
      },
      color: colorTheme.sideBarFontColor,
      link: "/app/about",
    },
    {
      name: "Logout Account",
      icon: (flag: boolean) => {
        return (
          <LogoutIcon
            size={SidebarLayout.logoSize}
            color={flag ? colorTheme.warningRed : colorTheme.primaryGrey2}
          />
        );
      },
      color: colorTheme.warningRed,
      link: "/",
      action: () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("isAuth");
        localStorage.removeItem("theme");
        localStorage.removeItem("token");
      },
    },
  ];

  const getUserData = useCallback(() => {
    getUserInfo(userId as string).then((res) => {
      console.log(res);
      setUserInfo(res.userInfo);
    });
  }, []);

  const toggleMenu = useCallback(() => {
    dispatch(updateIsMenuOpen(!isMenuOpen));
  }, [isMenuOpen]);

  const handleClickLink = useCallback((index: number) => {
    dispatch(openMenu(index));
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.nav
          key="side-panel"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, width: isMenuOpen ? 240 : 80 }}
          exit={{ opacity: 0, x: -100 }}
          transition={defaultTransition}
          className={styles.container}
        >
          <motion.div
            className={styles.expandIcon}
            onClick={toggleMenu}
            animate={{
              left: isMenuOpen ? 225 : 65,
              rotate: isMenuOpen ? 0 : 180,
            }}
            transition={defaultTransition}
          >
            <LeftExpandIcon size={24} color={colorTheme.sideBarFontColor} />
          </motion.div>
          <div
            className={styles.header}
            style={{ width: isMenuOpen ? "80%" : "fit-content" }}
          >
            <div
              className={styles.logo}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              {/* <ClemoryLogoAlt size={45} /> */}
              <Image
                src={userInfo?.avatarUrl!}
                alt="user-avatar"
                width={45}
                height={45}
              />
            </div>
            {isMenuOpen && (
              <div className={styles.title}>
                {/* <h1>Clemory</h1>
                <h2>for everyone</h2> */}
                <h1>{userInfo?.displayName}</h1>
                <h2>{userInfo?.email}</h2>
              </div>
            )}
          </div>
          <hr className={styles.divider} />
          <p
            className={styles.dividerText}
            style={{ width: isMenuOpen ? "80%" : "fit-content" }}
          >
            MAIN
          </p>
          <div className={styles.body}>
            {mainItems.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  className={styles.link}
                  onClick={() => {
                    handleClickLink(index);
                  }}
                  key={index}
                >
                  <motion.div
                    className={styles.menu}
                    animate={{
                      backgroundColor:
                        openedMenu === index
                          ? colorTheme.sideBarBackgroundHighlight
                          : colorTheme.sideBarBackground,
                    }}
                    style={{
                      paddingLeft: isMenuOpen ? 0 : 0,
                      minWidth: isMenuOpen ? 190 : 70,
                      color:
                        openedMenu === index
                          ? colorTheme.sideBarFontColor
                          : colorTheme.sideBarFontColorUnselected,
                    }}
                  >
                    <div
                      className={styles.icon}
                      style={{ width: isMenuOpen ? 22 : 50 }}
                    >
                      {item.icon(openedMenu === index)}
                    </div>
                    {isMenuOpen && <p>{item.name}</p>}
                  </motion.div>
                </Link>
              );
            })}
            <hr className={styles.divider} />
            <p
              className={styles.dividerText}
              style={{ width: isMenuOpen ? "80%" : "fit-content" }}
            >
              SETTINGS
            </p>
            {subItems.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  className={styles.link}
                  onClick={() => {
                    handleClickLink(index + mainItems.length);
                  }}
                  key={index + mainItems.length}
                >
                  <motion.div
                    className={styles.menu}
                    animate={{
                      backgroundColor:
                        openedMenu === index + mainItems.length
                          ? colorTheme.sideBarBackgroundHighlight
                          : colorTheme.sideBarBackground,
                    }}
                    style={{
                      paddingLeft: isMenuOpen ? 0 : 0,
                      minWidth: isMenuOpen ? 190 : 70,
                      color:
                        openedMenu === index + mainItems.length
                          ? colorTheme.sideBarFontColor
                          : colorTheme.sideBarFontColorUnselected,
                    }}
                  >
                    <div
                      className={styles.icon}
                      style={{ width: isMenuOpen ? 22 : 50 }}
                    >
                      {item.icon(openedMenu === index + mainItems.length)}
                    </div>
                    {isMenuOpen && <p>{item.name}</p>}
                  </motion.div>
                </Link>
              );
            })}
          </div>
          <div className={styles.footer}>
            <hr className={styles.divider} />
            {footerItems.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  className={styles.link}
                  onClick={() => {
                    handleClickLink(index + mainItems.length + subItems.length);
                    if (item.action) {
                      item.action();
                    }
                  }}
                  key={index + mainItems.length + subItems.length}
                >
                  <motion.div
                    className={styles.menu}
                    style={{
                      paddingLeft: isMenuOpen ? 0 : 0,
                      minWidth: isMenuOpen ? 190 : 70,
                      color: item.color,
                    }}
                  >
                    <div
                      className={styles.icon}
                      style={{ width: isMenuOpen ? 22 : 50 }}
                    >
                      {item.icon(true)}
                    </div>
                    {isMenuOpen && <p>{item.name}</p>}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
