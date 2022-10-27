import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },

  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserData } = userSlice.actions;
