import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./base-api";
import { globalInvalidationMiddleware } from "./middlewares/global-invalidation";
import { rootReducer } from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      baseApi.middleware as any,
      globalInvalidationMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type storeType = typeof store;
