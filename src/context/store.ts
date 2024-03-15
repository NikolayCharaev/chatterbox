import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './queries/userQuery';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
