export const SidebarLayout = {
  width: 240,
};

export const ColorScheme = {
  primary: "#8D64FF",
  primaryShade1: "#6C49DF",

  primaryGrey1: "#F6F6F6",
  primaryGrey2: "#757575",
  primaryGrey3: "#4a4453",
  primaryGrey4: "#afa8ba",

  basicWhite: "#FFFFFF",
  basicBlack: "#000000",
  warningRed: "#D55F5A",

  flowBackground: "#F1F0F0",
  dotColor: "#AAAAAA",

  defaultBackground: "#F6F6F6",
  sideBarBackground: "#FFFFFF",
  sideBarBackgroundHighlight: "#F6F6F6",
  sideBarFontColor: "#000000",
  sideBarStrokeColor: "#f6f6f6",

  nodeBgColors: ["#FFFFFF", "#FDFAEF", "#E3E9F6"],
  nodeColor: "#000000",
  nodeIconColor: "#757575",
};

export const ColorSchemeDark = {
  primary: "#8D64FF",
  primaryShade1: "#6C49DF",

  primaryGrey1: "#F6F6F6",
  primaryGrey2: "#757575",
  primaryGrey3: "#4a4453",
  primaryGrey4: "#afa8ba",

  basicWhite: "#FFFFFF",
  basicBlack: "#000000",
  warningRed: "#D55F5A",

  flowBackground: "#F1F0F0",
  dotColor: "#AAAAAA",

  defaultBackground: "#13111C",
  sideBarBackground: "#151238",
  sideBarBackgroundHighlight: "#45495D",
  sideBarFontColor: "#FFFFFF",
  sideBarStrokeColor: "#ffffff3b",

  nodeBgColors: ["#2f2b3a", "#2f2b3a", "#2f2b3a"],
  nodeColor: "#FFFFFF",
  nodeIconColor: "#FFFFFF",
};

export const FlowLayout = {
  dotRadius: 1.25,
  // dotColor: '#D9D9D9',
  dotColor: "#FFFFFF",
  dotInterval: 20,

  lineWidth: 1,
  lineColor: "#FFFFFF",
  lineInterval: 20,
  lineDash: [5, 0],
};

export const NodeWebLayout = {
  width: 300,
  height: 300,

  borderRadius: 6,

  imageWidth: 300,
  imageHeight: 160,
  imageMarginLeft: 0,
  imageMarginTop: 50,

  editorBtnWidth: 30,
  editorBtnHeight: 30,
  editorBtnMarginLeft: 232,
  editorBtnMarginTop: 9,

  deleteBtnWidth: 30,
  deleteBtnHeight: 30,
  deleteBtnMarginLeft: 264,
  deleteBtnMarginTop: 9,

  faviconWidth: 30,
  faviconHeight: 30,
  faviconMarginLeft: 23,
  faviconMarginTop: 9,

  titleWidth: 128,
  titleHeight: 36,
  titleMarginLeft: 40,
  titleMarginTop: 201,

  descWidth: 275,
  descHeight: 60,
  descMarginLeft: 13,
  descMarginTop: 233,

  linkIconWidth: 14,
  linkIconHeight: 14,
  linkIconMarginLeft: 199,
  linkIconMarginTop: 202,

  urlBoxWidth: 208,
  urlBoxHeight: 30,
  urlBoxMarginLeft: 11,
  urlBoxMarginTop: 9,
  urlBoxCornerRadius: 10,

  urlWidth: 150,
  urlHeight: 20,
  urlMarginLeft: 61,
  urlMarginTop: 14,
};

export const NodeDocLayout = {
  width: 300,
  height: 200,

  borderRadius: 6,

  editorBtnWidth: 30,
  editorBtnHeight: 30,
  editorBtnMarginLeft: 232,
  editorBtnMarginTop: 9,

  deleteBtnWidth: 30,
  deleteBtnHeight: 30,
  deleteBtnMarginLeft: 264,
  deleteBtnMarginTop: 9,

  iconWidth: 30,
  iconHeight: 30,
  iconMarginLeft: 23,
  iconMarginTop: 9,

  titleWidth: 150,
  titleHeight: 20,
  titleMarginLeft: 61,
  titleMarginTop: 14,

  descWidth: 250,
  descHeight: 116,
  descMarginLeft: 23,
  descMarginTop: 56,
};

export const NodeTextLayout = {
  maxWidth: 220,
  maxHeight: 280,

  minWidth: 40,

  borderRadius: 5,

  textWidth: 220 - 18 * 2,
  textHeight: 280 - 18 * 2,
  textMarginLeft: 18,
  textMarginTop: 18,
};

export const NodeImageLayout = {
  maxWidth: 400,
  maxHeight: 400,

  minWidth: 50,
  minHeight: 50,

  borderRadius: 5,
};

export const NodeAudioLayout = {
  width: 300,
  height: 150,

  borderRadius: 6,

  editorBtnWidth: 30,
  editorBtnHeight: 30,
  editorBtnMarginLeft: 232,
  editorBtnMarginTop: 9,

  deleteBtnWidth: 30,
  deleteBtnHeight: 30,
  deleteBtnMarginLeft: 264,
  deleteBtnMarginTop: 9,

  iconWidth: 30,
  iconHeight: 30,
  iconMarginLeft: 23,
  iconMarginTop: 9,

  titleBoxWidth: 230,
  titleBoxHeight: 30,
  titleBoxMarginLeft: 11,
  titleBoxMarginTop: 9,

  titleWidth: 150,
  titleHeight: 20,
  titleMarginLeft: 61,
  titleMarginTop: 14,

  descWidth: 279,
  descHeight: 83,
  descMarginLeft: 15,
  descMarginTop: 54,
};

export const NodeTextStyle = {
    title: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Inter",
    },
    desc: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Inter",
    },
    url: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Inter",
    },
};
