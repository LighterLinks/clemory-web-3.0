import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISettingState {
    isDarkMode: boolean;
}

const initialState: ISettingState = {
    isDarkMode: false,
};

export const settingSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        updateIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        }
    },
});

export const { updateIsDarkMode } = settingSlice.actions;

export default settingSlice.reducer;