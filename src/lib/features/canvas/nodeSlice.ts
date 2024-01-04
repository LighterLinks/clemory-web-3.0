import { INode } from "@/lib/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INodeSlice {
    nodes: INode[];
}

const initialState: INodeSlice = {
    nodes: [],
};

export const nodeSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setNodeState: (state, action: PayloadAction<INode[]>) => {
            state.nodes = action.payload;
        },
        updateNodeState: (state, action: PayloadAction<INode>) => {
            const { nodeId } = action.payload;
            const index = state.nodes.findIndex((node) => node.nodeId === nodeId);
            if(index !== -1) {
                state.nodes[index] = action.payload;
            }
        },
        deleteNodeState: (state, action: PayloadAction<INode>) => {
            const { nodeId } = action.payload;
            const index = state.nodes.findIndex((node) => node.nodeId === nodeId);
            if(index !== -1) {
                state.nodes.splice(index, 1);
            }
        },
        addNodeState: (state, action: PayloadAction<INode>) => {
            state.nodes.push(action.payload);
        }
    },
});

export const { setNodeState, addNodeState, deleteNodeState, updateNodeState } = nodeSlice.actions;

export default nodeSlice.reducer;