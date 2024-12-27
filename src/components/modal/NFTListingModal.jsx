import { useState } from "react";
import Loader from "../Loader";
import PropTypes from "prop-types";
import { listNFTForSale, listNFTForAuction } from "../../utils/aptos";
import Notification from "./Notification";
import { fetchAllMarketplaceNfts, fetchUserNfts } from "../../features/nftMarketplace/nftMarketplaceSlice";
import { useDispatch } from "react-redux";
import { useWallet } from "@aptos-labs/wallet-adapter-react";



const NFTListingModal = ({ nft }) => {

  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listingType, setListingType] = useState("");
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();

  const dispatch = useDispatch();
  const { account } = useWallet();

  const handleListNFT = async (e) => {
    e.preventDefault();

    if(listingType === "sell") {
      if(price < 1) {
        alert("Price must be greater than 0");
        return;
      }
      setLoading(true);

      try {
        const {status} = await listNFTForSale(nft.id, price)
        if(status === "success") {
          setSuccess(true);
          setMessage("Listing Successful!");
          dispatch(fetchAllMarketplaceNfts());
          dispatch(fetchUserNfts(account.address));
          setShowModal(false);
          setLoading(false);
        } else {
          throw Error("Error listing NFT");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setMessage(error);
        setLoading(false);
      }
    } else if(listingType === "auction") {
      if(price < 1) {
        alert("Price must be greater than 0");
        return;
      }
      if(duration < 1) {
        alert("Auction duration must be greater than 0");
        return;
      }

      setLoading(true);
      try {
        const {status} = await listNFTForAuction(nft.id, price, duration)
        if(status === "success") {
          dispatch(fetchAllMarketplaceNfts());
          dispatch(fetchUserNfts(account.address));
          setSuccess(true);
          setMessage("Auctioning Successful!");
          setShowModal(false);
          setLoading(false);
        } else {
          throw Error("Error auctioning NFT");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setMessage(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full z-10">
      {/* Notification */}
      {success && <Notification type="success" message={message} />}
      {error && <Notification type="error" message={message} />}

      <button
        className="w-full capitalize bg-purple-800 px-5 py-3 font-[500] rounded-[32px] text-gray-50 hover:bg-purple-700 transition-all duration-400"
        onClick={() => setShowModal(true)}
      >
        auction or sell
      </button>

      {showModal && (
        <div className="modal fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300/80">
          {/*  Listing Form  */}
          <form
            className="w-full rounded-[32px] border bg-white p-8 md:w-[450px] lg:w-[450px]"
            onSubmit={(e) => handleListNFT(e)}
          >
            <div className="form_header flex items-start justify-between">
              <div className="header_text">
                <h3 className="mb-1 text-[28px] font-[600]">List NFT</h3>
              </div>
              <img
                className="mt-2 w-4 cursor-pointer"
                onClick={() => setShowModal(false)}
                src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                alt="delete-sign"
              />
            </div>

            <div className="form_content mt-4 flex flex-col items-center justify-center gap-6">
              <div className="type_of_listing flex w-full flex-col">
                <label htmlFor="amount" className="font-[500] text-left">
                  Listing type
                </label>
                <select
                  name="listing_type"
                  id="listing_type"
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Listing Type</option>
                  <option value="sell">Sell</option>
                  <option value="auction">Auction</option>
                </select>
              </div>
            </div>
            {/* Listing Type === Sell */}
            {listingType === "sell" && (
              <div className="form_content mt-4 flex flex-col items-center justify-center gap-6">
                <div className="amount flex w-full flex-col">
                  <label htmlFor="amount" className="font-[500]">
                    Amount (in APTOS)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="0.00"
                    className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/* Listing Type === Auction */}
            {listingType === "auction" && (
              <div className="form_content mt-4 flex flex-col items-center justify-center gap-6">
                <div className="amount flex w-full flex-col">
                  <label htmlFor="amount" className="font-[500]">
                    Starting Price (in APTOS)
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    placeholder="0.00"
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-3"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="amount flex w-full flex-col">
                  <label htmlFor="amount" className="font-[500]">
                    Auction Duration (in minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    value={duration}
                    placeholder="0.00"
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-3"
                    onChange={(e) =>
                      setDuration(e.target.value)
                    }
                  />
                </div>
              </div>
            )}
            <div className="form_btn w-full">
              <button
                className={`mt-4 flex w-full cursor-pointer items-center justify-center rounded-full bg-purple-700 py-3 text-center text-white ${listingType === "" ? "opacity-70 cursor-none" : ""}`}
                type="submit"
                disabled={listingType === ""}
              >
                {loading ? <Loader spinnerColor={"border-gray-50"} /> : "List NFT"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NFTListingModal;

NFTListingModal.propTypes = {
  nft: PropTypes.object.isRequired,
};
