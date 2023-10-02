import { configureStore } from "@reduxjs/toolkit";
import { abcApi } from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer:{
    [abcApi.reducerPath]:abcApi.reducer
  },
  middleware: (gDm) => gDm().concat(abcApi.middleware)
})

setupListeners(store.dispatch)