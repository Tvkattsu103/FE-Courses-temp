import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    valueFilter: "",
  },
  reducers: {
    setValueFilter: (state, action) => {
      state.valueFilter = action.payload;
    },
  },
});

export const { setValueFilter } = userSlice.actions;
export default userSlice;
