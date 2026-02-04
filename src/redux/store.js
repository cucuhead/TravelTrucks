import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./slices/campersSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "campers",
  storage,
  whitelist: ["favorites"], // Sadece favorilerin kalıcı olmasını istiyoruz
};

const persistedReducer = persistReducer(persistConfig, campersReducer);

export const store = configureStore({
  reducer: {
    campers: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist'in içsel action'larını hata vermemesi için yoksayıyoruz
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);