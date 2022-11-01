import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './reducers/blog'
import userSlice from './reducers/user'

export const store = configureStore({
  reducer: {
    userReducers:userSlice.reducer,
    blogReducers:blogSlice.reducer,
  },
})