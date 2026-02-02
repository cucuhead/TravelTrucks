import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers } from '../operations';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
      })
    .addCase(fetchCampers.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;
  
  // ÖNEMLİ: API'den gelen obje içindeki 'items' dizisini alıyoruz
  state.items = action.payload.items; 
})
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const campersReducer = campersSlice.reducer;