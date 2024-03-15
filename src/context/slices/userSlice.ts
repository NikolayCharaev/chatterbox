import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegisterUser = createAsyncThunk('newUser', async (params) => {
  const { data } = await axios.post('http://localhost:4444/auth/register', params);
  return data;
});

export const fetchAuthUser = createAsyncThunk('authUser', async (params) => {
  try {
    const { data } = await axios.post('http://localhost:4444/auth/login', params);
    return data;
  } catch (err) {
    throw new Error(err)
    console.log(err);
  }
});

export interface IUserProps {
  authModal: boolean;
  registerModal: boolean;
  user: [];
  status: string;
}

const initialState: IUserProps = {
  authModal: false,
  registerModal: false,
  user: [],
  status: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthModal: (state: IUserProps, action: { payload: any }) => {
      state.registerModal = false;
      state.authModal = action.payload;
    },

    setRegisterModal: (state: IUserProps, action) => {
      state.authModal = false;
      state.registerModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = 'pending';
        state.user = {};
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.registerModal = false;
        state.user = action.payload;
      })
      .addCase(fetchRegisterUser.rejected, (state) => {
        state.status = 'rejected';
        state.user = {};
      })

      .addCase(fetchAuthUser.pending, (state) => {
        state.status = 'pending';
        state.user = {};
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.authModal = false;
        state.user = action.payload;

        // window.localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(fetchAuthUser.rejected, (state) => {
        state.status = 'rejected';
        // state.user = {};
      });
  },
});

export const { setAuthModal, setRegisterModal } = userSlice.actions;
export const selectIsAuth = (state) => Boolean(state.auth.user);
export default userSlice.reducer;
