import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice.js";
import bookApi from "./features/book/bookApi.js";
import orderApi from "./features/order/orderApi.js";
import userApi from "./features/userCustomer/userApi.js";
import orderApiAdmin from "./features/order/orderApiAdmin.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApiAdmin.reducerPath]: orderApiAdmin.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      orderApiAdmin.middleware,
    ),
});
