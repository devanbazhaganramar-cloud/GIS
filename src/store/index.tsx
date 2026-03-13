import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./services/map.service";
export const store = configureStore({
  reducer: {
   
    mapService: mapReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions: ["threejs/setPrimScene", "threejs/setPrimCamera"],
        // ignoredPaths: ["threejs.primScene", "threejs.primCamera"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
