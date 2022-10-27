import { createSlice } from '@reduxjs/toolkit';

export const userProfilSlice = createSlice({
  name: 'profil',
  initialState: {
    profil: null,
  },

  reducers: {
    setUserProfilData: (state, action) => {
      state.profil = action.payload;
    },
  },
});

export default userProfilSlice.reducer;
export const { setUserProfilData } = userProfilSlice.actions;
