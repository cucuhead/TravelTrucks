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
        state.error = null;
        // KRİTİK: Yeni arama başladığında eski sonuçları temizle
        state.items = []; 
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // API yapısına göre payload direkt dizi veya obje içindeki items olabilir
        state.items = action.payload.items || action.payload; 
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const campersReducer = campersSlice.reducer;