import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  authModal: boolean;
  registerModal: boolean;
}

const initialState: CounterState = {
  value: 0,
  authModal: false,
  registerModal: false,
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuthModal: (state, action) => {
      state.registerModal = false;
      state.authModal = action.payload;
    },

    setRegisterModal: (state, action) => {
      state.authModal = false;
      state.registerModal = action.payload;
    },
  },
});

export const { setAuthModal, setRegisterModal } = userSlice.actions;

export default userSlice.reducer;
