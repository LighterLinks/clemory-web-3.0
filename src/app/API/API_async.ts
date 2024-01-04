import { ITab } from "../../lib/features/sidePanel/menuSlice";
import { IEdge, INode, IPage } from '../../lib/interface';

const baseURL = "https://clemory.io/api";


export async function loginGoogle(displayName: string, accountId: string, email: string, phoneNumber: string, photoURL: string, providerId: string) {
    const apiURL = baseURL + "/loginGoogle";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName: displayName, accountId: accountId, email: email, phoneNumber: phoneNumber, photoURL: photoURL, providerId: providerId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function loginApple(email: string, accountId: string, federatedId: string, providerId: string) {
    const apiURL = baseURL + "/loginApple";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, accountId: accountId, federatedId: federatedId, providerId: providerId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function loginStandAlone(accountId: string, password: string) {
    const apiURL = baseURL + "/loginStandAlone";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId: accountId, password: password }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function registerStandAlone(accountId: string, password: string) {
    const apiURL = baseURL + "/registerStandAlone";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId: accountId, password: password }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function loginStandAloneAccoundIdExists(accountId: string) {
    const apiURL = baseURL + "/loginStandAloneAccoundIdExists";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId: accountId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();
}

export async function getUserInfo(userId: string) {
    const apiURL = baseURL + "/getUserInfo";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function deleteUser(userId: string) {
    const apiURL = baseURL + "/deleteUser";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function createNewPage(userId: string, pageName: string) {
    const apiURL = baseURL + "/createNewPage";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, pageName: pageName }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function getAllPages(userId: string) {
    const apiURL = baseURL + "/getAllPages";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function readPage(userId: string, pageId: string) {
    const apiURL = baseURL + "/readPage";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, pageId: pageId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function updatePage(userId: string, pageInfo: IPage) {
    const apiURL = baseURL + "/updatePage";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, pageInfo: pageInfo }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function deletePage(userId: string, pageId: string) {
    const apiURL = baseURL + "/deletePage";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, pageId: pageId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}


export async function createNode_async(userId: string, nodeInfo: INode, pageId: string) {
    const apiURL = baseURL + "/createNode";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, nodeInfo: nodeInfo, pageId: pageId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function readNode(userId: string, nodeId: string) {
    const apiURL = baseURL + "/readNode";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            nodeId: nodeId,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function updateNode_async(userId: string, nodeId: string, pageId: string, nodeInfo: INode) {
    const apiURL = baseURL + "/updateNode";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            nodeId: nodeId,
            pageId: pageId,
            nodeInfo: nodeInfo,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function updateNodePosition_async(userId: string, nodeId: string, pageId: string, x: number, y: number) {
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
    return response.json();

    
}


export async function deleteNode_async(userId: string, nodeId: string, pageId: string) {
    const apiURL = baseURL + "/deleteNode";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            nodeId: nodeId,
            pageId: pageId,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function createEdge(userId: string, edgeInfo: IEdge) {
    const apiURL = baseURL + "/createEdge";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            edgeInfo: edgeInfo,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function readEdge(userId: string, edgeId: string) {
    const apiURL = baseURL + "/readEdge";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            edgeId: edgeId,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function updateEdge(userId: string, edgeId: string, edgeInfo: IEdge) {
    const apiURL = baseURL + "/updateEdge";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            edgeId: edgeId,
            edgeInfo: edgeInfo,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function deleteEdge(userId: string, edgeId: string) {
    const apiURL = baseURL + "/deleteEdge";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            edgeId: edgeId,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function getAllNodes_async(userId: string, pageId: string) {
    const apiURL = baseURL + "/getAllNodes";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            pageId: pageId,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function getAllEdges(userId: string, pageId: string) {
    const apiURL = baseURL + "/getAllEdges";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            pageId: pageId,
        }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

    
}

export async function getCurrentTabs(userId: string) {
    const apiURL = baseURL + "/getCurrentTabs";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
    };

    const response = await fetch(apiURL, options);
    return response.json();
    
}

export async function updateCurrentTabs(userId: string, currentTabData: ITab[]) {
    const apiURL = baseURL + "/updateCurrentTabs";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, currentTabData: currentTabData }),
    };

    const response = await fetch(apiURL, options);
    return response.json();

}