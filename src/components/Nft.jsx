import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NFTListingModal from "./modal/NFTListingModal";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { buyNFT } from "../utils/aptos";
import Notification from "./modal/Notification";
import PlaceBidModal from "./modal/PlaceBidModal";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import {
  fetchAccountBalance,
  fetchAllMarketplaceNfts,
  fetchUserNfts,
} from "../features/nftMarketplace/nftMarketplaceSlice";

const Nft = ({ nft }) => {
  const { uri, name, price, for_sale, for_auction, owner, bid_history } = nft;
  const { account, connected } = useWallet();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleBuyNft = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!connected && account.address === nft.owner) {
        setMessage("You can't buy your own NFT");
        setError(true);
        setSuccess(false);
        setLoading(false);
        throw new Error("You can't buy your own NFT");
      }

      const { status } = await buyNFT(nft.id, nft.price);

      if (status === "success") {
        dispatch(fetchAllMarketplaceNfts());
        dispatch(fetchUserNfts(account.address));
        dispatch(fetchAccountBalance(account.address));
        setSuccess(true);
        setMessage("NFT bought successfully!");
        setError(false);
        setLoading(false);
      } else {
        throw new Error("Error buying NFT");
      }
    } catch (error) {
      setMessage("Error buying NFT");
      setError(true);
      setSuccess(false);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {/* Notification */}
      {success && <Notification type="success" message={message} />}
      {error && <Notification type="error" message={message} />}

      <div className="nft-card p-4 rounded-[16px] bg-gray-50 w-[330px] max-h-[440px]">
        <div className="card-image border w-full max-h-[250px] rounded-[16px] overflow-hidden">
          <img className="w-full h-full object-cover" src={uri} alt={name} />
        </div>

        <div className="card-details mt-5">
          <h3 className="font-bold text-left text-lg">{name}</h3>
          <div className="price my-2">
            {for_sale && (
              <p className="text-purple-700 font-[900] text-[16px] text-left">
                {price / 100000000} APT
              </p>
            )}
            {for_auction && (
              <div className="auction flex items-center justify-between">
                <p className="text-purple-700 font-[900] text-[16px]">
                  {price / 100000000} APT
                </p>
                <p className="text-purple-700 font-[900] text-[16px]">
                  Bids: {bid_history.length > 0 ? bid_history[0].bidders.length : "0"}
                </p>
              </div>
            )}
          </div>

          <div className="card-action flex gap-8 items-center justify-between border-t border-gray-200 pt-4 mt-5">
            {for_sale && (
              <>
                <Link
                  className="bg-gray-100 border border-gray-200 py-2 rounded-[32px] hover:bg-gray-200 transition-all duration-400 w-full text-center"
                  to={`/nft/${nft.id}`}
                >
                  View Details
                </Link>
                {account?.address.slice(-14) === owner.slice(-14) ? (
                  // <button className="bg-purple-800 py-2 rounded-[32px] text-gray-50 hover:bg-purple-700 transition-all duration-400 w-full">
                  //   Delist NFT
                  // </button>
                  <></>
                ) : (
                  <button
                    className="bg-purple-800 px-5 py-2 rounded-[32px] text-gray-50 hover:bg-purple-700 transition-all duration-400 w-full flex items-center justify-center"
                    disabled={loading}
                    onClick={(e) => handleBuyNft(e)}
                  >
                    {loading ? (
                      <Loader spinnerColor={"border-gray-50 mx-auto"} />
                    ) : (
                      "Buy NFT"
                    )}
                  </button>
                )}
              </>
            )}
            {for_auction && (
              <>
                <Link
                  className="bg-gray-100 border border-gray-200 py-2 rounded-[32px] hover:bg-gray-200 transition-all duration-400 w-full text-center"
                  to={`/nft/${nft.id}`}
                >
                  View Details
                </Link>
                {account?.address.slice(-14) === owner.slice(-14) ? (
                  // <button className="bg-purple-800 py-2 rounded-[32px] text-gray-50 hover:bg-purple-700 transition-all duration-400 w-full">
                  //   Delist NFT
                  // </button>
                  <></>
                ) : (
                  <PlaceBidModal nft={nft} />
                )}
              </>
            )}
            {!for_sale && !for_auction && <NFTListingModal nft={nft} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nft;

Nft.propTypes = {
  nft: PropTypes.object,
};
