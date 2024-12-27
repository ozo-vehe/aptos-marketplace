import { configureStore } from "@reduxjs/toolkit";
import nftMarketplaceReducer from "./nftMarketplace/nftMarketplaceSlice";

const store = configureStore({
  reducer: {
    nftMarketplace: nftMarketplaceReducer,
  }
})

export default store;