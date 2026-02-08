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
    hasMore: true, // Listenin devamı var mı kontrolü için ekledik
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
    // Filtre değiştiğinde veya yeni arama başladığında listeyi temizlemek için
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
        // Eğer 1. sayfa isteniyorsa (yeni arama), eski listeyi temizle
        // Değilse (Load More), eski liste kalsın ki kullanıcı zıplama yaşamasın
        if (action.meta.arg.page === 1) {
          state.items = [];
        }
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        const newItems = action.payload.items || action.payload;
        
        // 1. Sayfaysa listeyi yenile, değilse eski listeye ekle
        if (action.payload.page === 1) {
          state.items = newItems;
        } else {
          state.items = [...state.items, ...newItems];
        }

        // Eğer gelen veri limitimizden (4) azsa, daha fazla veri yok demektir
        state.hasMore = newItems.length === 4;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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