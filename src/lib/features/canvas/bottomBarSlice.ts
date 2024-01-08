import { INode } from "@/lib/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBottomBarSlice {
  isOpen: boolean;
}

const initialState: IBottomBarSlice = {
  isOpen: false,
};

export const bottomBarSlice = createSlice({
  name: "bottomBar",
  initialState,
  reducers: {
    updateIsBottomBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { updateIsBottomBarOpen } = bottomBarSlice.actions;

export default bottomBarSlice.reducer;
