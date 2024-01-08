import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./features/sidePanel/menuSlice";
import settingSlice from "./features/global/settingSlice";
import editorSlice from "./features/editor/editorSlice";
import nodeSlice from "./features/canvas/nodeSlice";
import toolbarSlice from "./features/toolbar/toolbarSlice";
import { createWrapper } from "next-redux-wrapper";
import chatSlice from "./features/canvas/chatSlice";
import bottomBarSlice from "./features/canvas/bottomBarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      menuSlice: menuSlice,
      settingSlice: settingSlice,
      editorSlice: editorSlice,
      nodeSlice: nodeSlice,
      toolbarSlice: toolbarSlice,
      bottomBarSlice: bottomBarSlice,
      chatSlice: chatSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
