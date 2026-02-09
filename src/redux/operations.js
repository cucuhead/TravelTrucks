import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, ...filters }, thunkAPI) => {
    try {
      // MockAPI'nin 12 sınırını aşmak için limit=50 ekledik
      const response = await axios.get("/campers?limit=50");
      let allCampers = response.data.items || response.data;

      const filteredCampers = allCampers.filter((camper) => {
        if (filters.location && !camper.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        if (filters.type && camper.form !== filters.type) {
          return false;
        }
        if (filters.equipment?.length > 0) {
          return filters.equipment.every((item) => {
            if (item === "transmission") return camper.transmission === "automatic";
            return camper[item] === true || camper[item] === "true";
          });
        }
        return true;
      });

      // SADECE o sayfaya ait yeni verileri gönderiyoruz (0'dan değil, kaldığı yerden)
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedItems = filteredCampers.slice(startIndex, endIndex);

      return {
        items: paginatedItems,
        page,
        // Toplamda hala gösterilmemiş veri var mı?
        hasMore: filteredCampers.length > endIndex 
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (camperId, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${camperId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);