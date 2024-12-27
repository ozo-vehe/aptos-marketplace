import { useState } from "react";
import { mintNFT } from "../utils/aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Loader from "../components/Loader";
import Notification from "../components/modal/Notification";
import { useDispatch } from "react-redux";
import {fetchAllMarketplaceNfts, fetchUserNfts } from "../features/nftMarketplace/nftMarketplaceSlice";

const AddNft = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    uri: "",
    rarity: "",
    royalty_percent: "",
  });
  const { connected } = useWallet();
  const dispatch = useDispatch();

  const handleMintNFT = async (e) => {
    e.preventDefault();
    if (nftData.royalty_percent < 1 || nftData.royalty_percent > 10) {
      alert("Royalty percentage must be between 1 and 10");
      return;
    }
    if (!connected) {
      alert("Please connect your wallet");
      return;
    }
    if (
      nftData.name === "" ||
      nftData.description === "" ||
      nftData.uri === "" ||
      nftData.rarity === "" ||
      nftData.royalty_percent === ""
    ) {
      alert("Please fill out all fields");
      return;
    }
    setLoading(true);

    try {
      const { status, message } = await mintNFT({...nftData})
      if (status === "success") {
        nftData.name = "";
        nftData.description = "";
        nftData.uri = "";
        nftData.rarity = "";
        nftData.royalty_percent = "";
        setLoading(false);
        setSuccess(true);
        setMessage("Successfully! transaction hash: " + message);
      } else {
        throw Error("Error minting NFT");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setMessage("Error minting NFT!");
    } finally {
      dispatch(fetchAllMarketplaceNfts);
      dispatch(fetchUserNfts);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftData({ ...nftData, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
      {/* Notifications */}
      {success && <Notification type="success" message={message} />}
      {error && <Notification type="error" message={message} />}


      <h2 className="text-2xl font-bold mb-6 text-center">Mint a new NFT</h2>
      <form onSubmit={(e) => handleMintNFT(e)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            NFT Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={nftData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={nftData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="uri"
            value={nftData.uri}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rarity"
            className="block text-gray-700 font-bold mb-2"
          >
            Rarity
          </label>
          <select
            type="number"
            id="rarity"
            name="rarity"
            value={nftData.rarity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select rarity</option>
            <option value="0">Common</option>
            <option value="1">Rare</option>
            <option value="2">Epic</option>
            <option value="3">Legendary</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="royalty"
            className="block text-gray-700 font-bold mb-2"
          >
            Royalty Percentage (1 - 10%)
          </label>
          <input
            type="number"
            id="royalty"
            name="royalty_percent"
            value={nftData.royalty_percent}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-800 text-white font-bold py-3 px-4 rounded-[30px] hover:bg-purple-700 transition-all duration-400 flex items-center justify-center"
        >
          {loading ? <Loader spinnerColor={"border-gray-50"} /> : "Add NFT"}
        </button>
      </form>
    </div>
  );
};

export default AddNft;
