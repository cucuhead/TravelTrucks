import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      // 1. Konum Filtresi
      if (filters.location) {
        params.append("location", filters.location);
      }

      // 2. Araç Tipi Filtresi (form)
      if (filters.type) {
        params.append("form", filters.type);
      }

      // 3. Ekipman Filtreleri
      // Önemli: SADECE seçili olanları ekle, diğerlerini parametre olarak bile gönderme.
      if (filters.equipment?.length > 0) {
        filters.equipment.forEach((item) => {
          if (item === "transmission") {
            params.append("transmission", "automatic");
          } else {
            params.append(item, "true");
          }
        });
      }

      // Query string oluştur ve boşsa sadece ana endpoint'e git
      const queryString = params.toString();
      const url = queryString ? `/campers?${queryString}` : "/campers";
      
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);