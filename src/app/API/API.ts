import { ITab } from "../../lib/features/sidePanel/menuSlice";
import { IEdge, INode, IPage } from "../../lib/interface";

const baseURL = "https://clemory.io/api";

export async function clearChatHistoryInPage(userId: string, pageId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/clearChatHistoryInPage";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, pageId: pageId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function chatHistoryInPage(userId: string, pageId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/chatHistoryInPage";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, pageId: pageId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function loginGoogle(
  displayName: string,
  accountId: string,
  email: string,
  phoneNumber: string,
  photoURL: string,
  providerId: string
) {
  const apiURL = baseURL + "/loginGoogle";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      displayName: displayName,
      accountId: accountId,
      email: email,
      phoneNumber: phoneNumber,
      photoURL: photoURL,
      providerId: providerId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function loginApple(
  email: string,
  accountId: string,
  federatedId: string,
  providerId: string
) {
  const apiURL = baseURL + "/loginApple";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      accountId: accountId,
      federatedId: federatedId,
      providerId: providerId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function loginStandAlone(displayName: string, password: string) {
  const apiURL = baseURL + "/loginStandAlone";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ displayName: displayName, password: password }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function registerStandAlone(
  accountId: string,
  password: string,
  displayName: string
) {
  const apiURL = baseURL + "/registerStandAlone";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId: accountId,
      password: password,
      displayName: displayName,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function loginStandAloneAccountIdExists(displayName: string) {
  const apiURL = baseURL + "/loginStandAloneAccountIdExists";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ displayName: displayName }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function getUserInfo(userId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/getUserInfo";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function deleteUser(userId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/deleteUser";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function createNewPage(userId: string, pageName: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/createNewPage";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, pageName: pageName }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function getAllPages(userId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/getAllPages";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId }),
  };

  const response = await fetch(apiURL, options);
  if (response.status === 401) {
    alert("Session Expired");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAuth");
    window.location.replace("/");
    return response;
  }
  const data = await response.json();
  return data;
}

export async function readPage(userId: string, pageId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/readPage";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, pageId: pageId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function updatePage(userId: string, pageInfo: IPage) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/updatePage";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, pageInfo: pageInfo }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function deletePage(userId: string, pageId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/deletePage";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, pageId: pageId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function createNode(
  userId: string,
  nodeInfo: INode,
  pageId: string
) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/createNode";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      nodeInfo: nodeInfo,
      pageId: pageId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function readNode(userId: string, nodeId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/readNode";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      nodeId: nodeId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function updateNode(
  userId: string,
  nodeId: string,
  pageId: string,
  nodeInfo: INode
) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/updateNode";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      nodeId: nodeId,
      pageId: pageId,
      nodeInfo: nodeInfo,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function deleteNode(
  userId: string,
  nodeId: string,
  pageId: string
) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/deleteNode";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      nodeId: nodeId,
      pageId: pageId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function createEdge(userId: string, edgeInfo: IEdge) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/createEdge";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      edgeInfo: edgeInfo,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function readEdge(userId: string, edgeId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/readEdge";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      edgeId: edgeId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function updateEdge(
  userId: string,
  edgeId: string,
  edgeInfo: IEdge
) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/updateEdge";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      edgeId: edgeId,
      edgeInfo: edgeInfo,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function deleteEdge(userId: string, edgeId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/deleteEdge";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      edgeId: edgeId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function getAllNodes(userId: string, pageId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/getAllNodes";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      pageId: pageId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function getAllEdges(userId: string, pageId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/getAllEdges";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      pageId: pageId,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function getCurrentTabs(userId: string) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/getCurrentTabs";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();
  if (data.resCode.responseCode === 408) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.setItem("isAuth", "false");
    window.location.replace("/");
    return data;
  }
  return data;
}

export async function updateCurrentTabs(
  userId: string,
  currentTabData: ITab[]
) {
  const token = localStorage.getItem("token");
  const apiURL = baseURL + "/updateCurrentTabs";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, currentTabData: currentTabData }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function landingLogEvent(
  randomUUID: string,
  landingVersion: string,
  category: string,
  logData: string
) {
  const apiURL = baseURL + "/landingLogEvent";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ randomUUID, landingVersion, category, logData }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function pageExists(pageId: string) {
  const apiURL = baseURL + "/pageExists";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageId: pageId }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export const uploadImage = async (file: any) => {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://clemory.io/api/uploadImage", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).imageUrl;
};

export async function updateNodePosition(
  userId: string,
  nodeId: string,
  pageId: string,
  x: number,
  y: number
) {
  const apiURL = baseURL + "/updateNodePosition";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      nodeId: nodeId,
      pageId: pageId,
      x: x,
      y: y,
    }),
  };

  const response = await fetch(apiURL, options);
  const data = await response.json();

  return data;
}

export async function chatInPage(userId: string, pageId: string, queryText: string) {
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId, pageId: pageId, queryText: queryText }),
  };
  const reponse = await fetch('https://clemory.io/apiStream/chatInPage', options);
  return reponse;
}