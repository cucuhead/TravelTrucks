import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, ...filters }, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      // 1. Sayfalandırma Parametreleri (Kritik Kriter)
      params.append("page", page);
      params.append("limit", limit);

      // 2. Konum Filtresi
      if (filters.location) {
        params.append("location", filters.location);
      }

      // 3. Araç Tipi Filtresi (form)
      if (filters.type) {
        params.append("form", filters.type);
      }

      // 4. Ekipman Filtreleri
      if (filters.equipment?.length > 0) {
        filters.equipment.forEach((item) => {
          if (item === "transmission") {
            params.append("transmission", "automatic");
          } else {
            params.append(item, "true");
          }
        });
      }

      // MockAPI için query string oluşturma
      const url = `/campers?${params.toString()}`;
      
      const response = await axios.get(url);
      
      // Önemli: Sayfalandırma yaparken sayfa numarasını da döndürelim ki 
      // slice içinde yeni veriyi mi ekleyeceğiz yoksa listenin üzerine mi yazacağız bilelim.
      return {
        items: response.data.items || response.data, // Bazı API'lar veriyi 'items' içinde döner
        page
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