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
    hasMore: true,
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
    resetItems: (state) => {
      state.items = [];
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (action.meta.arg.page === 1) {
          state.items = [];
        }
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        const { items, page, hasMore } = action.payload;
        
        if (page === 1) {
          state.items = items;
        } else {
          // Yeni gelenleri eski listenin sonuna ekle (duplicate engellendi)
          state.items = [...state.items, ...items];
        }

        // operations.js'den gelen hasMore bilgisini kullanıyoruz
        state.hasMore = hasMore;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasMore = false;
      })
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

export const { setFilters, toggleFavorite, resetItems } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;