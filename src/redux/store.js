import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user'

export const store = configureStore({
  reducer: {
    userReducers:userSlice.reducer
  },
})