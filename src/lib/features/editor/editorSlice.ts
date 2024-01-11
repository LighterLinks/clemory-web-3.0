import { updateCurrentTabs } from "@/app/API/API";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEditorSlice {
  isEditorPanelOpen: boolean;
  isEditorPanelFullsized: boolean;
  openedEditors: string[];
  currentEditor?: string;
}

const initialState: IEditorSlice = {
  isEditorPanelOpen: false,
  isEditorPanelFullsized: false,
  openedEditors: [],
  currentEditor: undefined,
};

export const editorSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateIsEditorPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditorPanelOpen = action.payload;
    },
    updateIsEditorPanelFullsized: (state, action: PayloadAction<boolean>) => {
      state.isEditorPanelFullsized = action.payload;
    },
    openEditor: (state, action: PayloadAction<string>) => {
      if (state.openedEditors.includes(action.payload)) {
        state.currentEditor = action.payload;
      } else {
        state.openedEditors.push(action.payload);
        state.currentEditor = action.payload;
      }
    },
    closeEditor: (state, action: PayloadAction<string>) => {
      const newEditors = state.openedEditors.filter(
        (editor) => editor !== action.payload
      );
      state.openedEditors = newEditors;
      if (newEditors.length === 0) {
        state.currentEditor = undefined;
      }
      else {
        state.currentEditor = newEditors[0];
      }
    },
    updateCurrentEditor: (state, action: PayloadAction<string>) => {
      state.currentEditor = action.payload;
    },
  },
});

export const {
  updateIsEditorPanelOpen,
  updateIsEditorPanelFullsized,
  openEditor,
  closeEditor,
  updateCurrentEditor,
} = editorSlice.actions;

export default editorSlice.reducer;
