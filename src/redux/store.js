import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import { authApi } from "./services/authApi";
import { transactionApi } from "./services/transactionApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transactionApi.middleware,
    ),
});
