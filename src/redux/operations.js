import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (filters = {}, thunkAPI) => {
    try {
      // 1. Parametreleri temiz bir obje olarak hazırlıyoruz
      const params = {};

      if (filters.location) params.location = filters.location;
      if (filters.form) params.form = filters.form;
      
      // MockAPI'de boolean değerler genelde true olarak gönderilir
      if (filters.AC) params.AC = true;
      if (filters.kitchen) params.kitchen = true;
      if (filters.TV) params.TV = true;
      if (filters.bathroom) params.bathroom = true;
      if (filters.transmission) params.transmission = filters.transmission;

      // 2. Axios ile isteği atıyoruz (params objesini direkt geçebiliriz, axios URL'e çevirir)
      const response = await axios.get("/campers", { params });

      // MockAPI veriyi direkt array olarak mı yoksa { items: [] } olarak mı dönüyor?
      // Ödevdeki yapıya göre genellikle response.data yeterlidir.
      return response.data; 
    } catch (e) {
      // Eğer API 404 dönerse (hiç sonuç bulunamadığında), boş bir dizi dönerek 
      // uygulamanın çökmesini engelliyoruz.
      if (e.response && e.response.status === 404) {
        return []; 
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);