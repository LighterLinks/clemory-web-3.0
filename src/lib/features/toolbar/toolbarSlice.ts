import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToolbarState {
  isSidebarOpen: boolean;
  isControlsOpen: boolean;
  isNodeAdderOpen: boolean;
  isChatbotOpen: boolean;
  isShareModalOpen?: boolean;
}

const initialState: IToolbarState = {
  isSidebarOpen: true,
  isControlsOpen: false,
  isNodeAdderOpen: false,
  isChatbotOpen: false,
  isShareModalOpen: false,
};

export const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    updateIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    updateIsControlsOpen: (state, action: PayloadAction<boolean>) => {
      state.isControlsOpen = action.payload;
    },
    updateIsNodeAdderOpen: (state, action: PayloadAction<boolean>) => {
      state.isNodeAdderOpen = action.payload;
    },
    updateIsChatbotOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatbotOpen = action.payload;
    },
    updateIsShareModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isShareModalOpen = action.payload;
    },
  },
});

export const {
  updateIsSidebarOpen,
  updateIsControlsOpen,
  updateIsNodeAdderOpen,
  updateIsChatbotOpen,
  updateIsShareModalOpen,
} = toolbarSlice.actions;

export default toolbarSlice.reducer;
