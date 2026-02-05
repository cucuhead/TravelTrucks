import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../operations';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    favorites: [], 
    currentCamper: null,
    filters: {
      location: "",
      equipment: [],
      type: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Tüm karavanları getirme
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = []; 
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || action.payload; 
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // TEKİL karavan getirme (Hata buradaydı, aradaki ; işaretlerini kaldırdım)
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.currentCamper = null; 
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, toggleFavorite } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;