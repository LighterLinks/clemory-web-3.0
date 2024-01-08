import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IChatSlice {
    isOpen: boolean;
    postion?: { x: number, y: number };
    needLocate: boolean;
}

const initialState: IChatSlice = {
    isOpen: false,
    needLocate: false,
};

const chatState = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateChatOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setLocation: (state, action: PayloadAction<{ x: number, y: number }>) => {
      state.postion = action.payload;
      state.needLocate = true;
    },
    stopLocate: (state) => {
      state.needLocate = false;
    }
  },
});

export const { updateChatOpen, setLocation, stopLocate } = chatState.actions;

export default chatState.reducer;