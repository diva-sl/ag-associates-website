import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import { authApi } from "./services/authApi";
import { transactionApi } from "./services/transactionApi";
import { planApi } from "./services/planApi";
import { successStoryApi } from "./services/successStoryApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [successStoryApi.reducerPath]: successStoryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transactionApi.middleware,
      planApi.middleware,
      successStoryApi.middleware,
    ),
});
