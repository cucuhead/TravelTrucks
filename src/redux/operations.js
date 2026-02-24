import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, ...filters }, thunkAPI) => {
    try {
      const params = {
        page,
        limit,
        location: filters.location || undefined,
        form: filters.type || undefined,
        AC: filters.equipment?.includes("AC") ? true : undefined,
        kitchen: filters.equipment?.includes("kitchen") ? true : undefined,
        TV: filters.equipment?.includes("TV") ? true : undefined,
        bathroom: filters.equipment?.includes("bathroom") ? true : undefined,
        transmission: filters.equipment?.includes("transmission") ? "automatic" : undefined,
      };

      const response = await axios.get("/campers", { params });
      const data = response.data.items || response.data;

      return {
        items: data,
        page,
        hasMore: data.length === limit,
      };
    } catch (e) {
      if (e.response && e.response.status === 404) {
        return { items: [], page: 1, hasMore: false };
      }
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