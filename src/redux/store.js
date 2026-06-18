import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import { authApi } from "./services/authApi";
import { transactionApi } from "./services/transactionApi";
import { planApi } from "./services/planApi";
import { successStoryApi } from "./services/successStoryApi";
import { legalApi } from "./services/legalApi";
import { knowledgeApi } from "./services/knowledgeApi";
import { newsletterApi } from "./services/newsletterApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [successStoryApi.reducerPath]: successStoryApi.reducer,
    [legalApi.reducerPath]: legalApi.reducer,
    [knowledgeApi.reducerPath]: knowledgeApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transactionApi.middleware,
      planApi.middleware,
      successStoryApi.middleware,
      legalApi.middleware,
      knowledgeApi.middleware,
      newsletterApi.middleware,
    ),
});
