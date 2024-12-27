import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllNFTs, fetchUserNFTs, fetchFeeCollector } from "../../utils/aptos";
import { getAccountBalance } from "../../utils/aptos";


export const fetchAllMarketplaceNfts = createAsyncThunk(
  "nftMarketplace/all",
  async () => {
    const nfts = await fetchAllNFTs();
    return nfts;
  }
);

export const fetchUserNfts = createAsyncThunk(
  "nftMarketplace/user",
  async (address) => {
    const nfts = await fetchUserNFTs(address);
    return nfts;
  }
);

export const  fetchMarketplaceCollectorsFee = createAsyncThunk("nftMarketplace/fee", async() => {
  const fee = await fetchFeeCollector();
  return fee;
})

export const fetchAccountBalance = createAsyncThunk("nftMarketplace/user/balance", async (address) => {
  const balance = await getAccountBalance(address);
  return balance / 100000000;
})



const nftMarketplaceSlice = createSlice({
  name: "nftMarketplace",
  initialState: {
    nfts: [],
    fee: 0,
    balance: 0,
    userNfts: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMarketplaceNfts.fulfilled, (state, action) => {
        state.nfts = action.payload;
      })
      .addCase(fetchAllMarketplaceNfts.rejected, (state, action) => {
        state.nfts = [];
        console.log(action.payload);
      })
      .addCase(fetchUserNfts.fulfilled, (state, action) => {
        state.userNfts = action.payload;
      })
      .addCase(fetchUserNfts.rejected, (state, action) => {
        state.nfts = [];
        console.log(action.payload);
      })
      .addCase(fetchMarketplaceCollectorsFee.fulfilled, (state, action) => {
        state.fee = action.payload;
      })
      .addCase(fetchMarketplaceCollectorsFee.rejected, (action) => {
        console.log(action.payload);
      })
      .addCase(fetchAccountBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(fetchAccountBalance.rejected, (action) => {
        console.log(action.payload);
      });
  }
});


export const allNfts = (state) => state.nftMarketplace.nfts;
export const allUserNfts = (state) => state.nftMarketplace.userNfts;
export const allFeeCollector = (state) => state.nftMarketplace.fee;
export const accountBalance = (state) => state.nftMarketplace.balance;

export default nftMarketplaceSlice.reducer;