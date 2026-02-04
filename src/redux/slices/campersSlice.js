import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers } from '../operations';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    favorites: [], // Favori ID listesi
    filters: {    // GLOBAL FİLTRE STATE'İ
      location: "",
      equipment: [],
      type: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    // Filtreleri güncelleyen action
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Favori ekleme/çıkarma action'ı
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
      });
  },
});

export const { setFilters, toggleFavorite } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;