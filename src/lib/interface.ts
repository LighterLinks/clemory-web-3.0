export interface IPage {
  pageId: string;
  viewPageId: string;
  pageOrder: number;
  pageName: string;
  createTime: string;
  isFav: boolean;
  nodeCount: {
    text: number;
    web: number;
    doc: number;
  };
  thumbnailUrl?: string;
  pageColor?: string;
  pageDesc?: string;
  pageType?: string;
}

export const NODETYPE = {
  TEXT: "text",
  WEB: "web",
  DOC: "doc",
  IMAGE: "image",
  AUDIO: "audio",
  NOTE: "note",
  WEBPH: "webph",
  IMAGEPH: "imageph",
  AUDIOPH: "audioph",
};

export interface INode {
  nodeId: string;
  type: string;

  content: any;

  scale?: string | number;
  width: number;
  height: number;
  x: number;
  y: number;
  bgColorIdx: number;

  bgColor?: string;
  url?: string;
  imageUrl?: string;
  faviconUrl?: string;
  avatarUrl?: string;

  tags?: string[];
}

export interface IEdge {
  edgeId: string;
  sourceNodeId: string;
  targetNodeId: string;

  pageId: string;

  scale?: string;
  strokeWidth?: number;
  dash?: number[];

  color?: string;
}

export interface IUser {
  userId: string;
  type: string;
  displayName?: string;
  email?: string;
  avatarUrl: string;
}

export interface ITag {
  tagId: string;
  content: string;
}

export interface IResponseCode {
  reponseCode: number;
  message: string;
}

export interface IChat {
  role: "user" | "assistant";
  content: string;
  createTime: string;
  chatId: string;
  pos: Array<number>;
}
