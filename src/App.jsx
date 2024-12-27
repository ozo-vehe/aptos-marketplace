import {Outlet} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect } from 'react';
// import { fetchAllNFTs } from './utils/aptos';
import { useDispatch } from 'react-redux';
import { fetchAllMarketplaceNfts } from './features/nftMarketplace/nftMarketplaceSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("fetching all nfts");
    dispatch(fetchAllMarketplaceNfts());
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
