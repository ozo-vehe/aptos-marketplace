import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/Marketplace";
import AddNft from "./pages/AddNft";
// import router from './router';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import Profile from "./pages/Profile";
import NftDetails from "./pages/NftDetails";
import store from "./features/store";
import { Provider } from "react-redux";

const wallets = [new PetraWallet()];


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/marketplace",
        element: <Marketplace />
      },
      {
        path: "/add-nft",
        element: <AddNft />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/nft/:id",
        element: <NftDetails />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AptosWalletAdapterProvider>
);
