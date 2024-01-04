import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITab {
    pageName: string;
    pageId: string;
}

export interface IMenuState {
    isOpen: boolean;
    openedMenu: number;
    openedTabs: ITab[];
}

const initialState: IMenuState = {
    isOpen: true,
    openedMenu: 0,
    openedTabs: [],
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        updateIsMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        openMenu: (state, action: PayloadAction<number>) => {
            state.openedMenu = action.payload;
        },
        openTab: (state, action: PayloadAction<ITab>) => {
            state.openedTabs.push(action.payload);
        },
        closeTab: (state, action: PayloadAction<number>) => {
            state.openedTabs.splice(action.payload, 1);
        },
    },
});

export const { updateIsMenuOpen, openMenu, openTab, closeTab } = menuSlice.actions;

export default menuSlice.reducer;