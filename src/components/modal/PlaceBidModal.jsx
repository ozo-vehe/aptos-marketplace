import { useEffect, useState } from "react";
import Loader from "../Loader";
import PropTypes from "prop-types";
import Notification from "./Notification";
import { placeBid, getAccountBalance } from "../../utils/aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useDispatch } from "react-redux";
import {
  fetchAllMarketplaceNfts,
  fetchUserNfts,
} from "../../features/nftMarketplace/nftMarketplaceSlice";
import { timeConverter } from "../../utils/timeConverter";

const PlaceBidModal = ({ nft }) => {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bid, setBid] = useState();
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  const { account, connected } = useWallet();
  const dispatch = useDispatch();

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    const accountBal = getAccountBalance(account.address)
    const price_checker =
      nft.price > nft.highest_bid ? nft.price : nft.highest_bid;
    if (bid <= price_checker / 100000000) {
      setError(true);
      setMessage("Bid must be greater than current price");
      return;
    }
    if (!connected) {
      setError(true);
      setMessage("Please connect your wallet");
      return;
    }
    if(accountBal < price_checker) {
      setError(true);
      setMessage("Account balance too small to make a bid");
      return;
    }

    setLoading(true);

    try {
      // Call the placeBid function from your Aptos API
      const { status } = await placeBid(nft.id, bid, account.address);

      if (status === "success") {
        dispatch(fetchAllMarketplaceNfts());
        dispatch(fetchUserNfts(account.address));
        setSuccess(true);
        setMessage("Bid placed successfully!");
        setError(false);
        setLoading(false);
        setShowModal(false);
      } else {
        throw new Error("Error placing bid");
      }
    } catch (error) {
      setError(true);
      setMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const { seconds, editedTimeLeft } = timeConverter(nft);
    setSeconds(seconds);
    setTimeLeft(editedTimeLeft);
  }, []);

  return (
    <div className="w-full z-10">
      {/* Notification */}
      {success && <Notification type="success" message={message} />}
      {error && <Notification type="error" message={message} />}

      <button
        className="bg-purple-800 px-5 py-2 rounded-[32px] text-gray-50 hover:bg-purple-700 transition-all duration-400 w-full flex items-center justify-center"
        onClick={() => {
          const { seconds, editedTimeLeft } = timeConverter(nft);
          setSeconds(seconds);
          setTimeLeft(editedTimeLeft);
          setShowModal(true);
        }}
      >
        Place Bid
      </button>

      {showModal && (
        <div className="modal fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300/80">
          {/*  Listing Form  */}
          <form
            className="w-full rounded-[32px] border bg-white p-8 md:w-[450px] lg:w-[450px]"
            onSubmit={(e) => handlePlaceBid(e)}
          >
            <div className="form_header flex items-start justify-between">
              <div className="header_text">
                <h3 className="mb-1 text-[28px] font-[600] capitalize">
                  Place Your Bid
                </h3>
                {seconds > 0 && (
                  <p className="font-[600] text-gray-600">
                    Current bid price:{" "}
                    {nft.price > nft.highest_bid
                      ? nft.price / 100000000
                      : nft.highest_bid / 100000000}{" "}
                    APT
                  </p>
                )}

                <p className="font-[500] mt-1 text-purple-700 text-sm">
                  {seconds > 0 ? (
                    <span>Ends in: {timeLeft}</span>
                  ) : (
                    "Auction ended"
                  )}
                </p>
              </div>
              <img
                className="mt-2 w-4 cursor-pointer"
                onClick={() => setShowModal(false)}
                src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                alt="delete-sign"
              />
            </div>

            <div className="form_content mt-4 flex flex-col items-center justify-center gap-6">
              <div className="bid flex w-full flex-col">
                <label htmlFor="bid" className="font-[500] mb-2">
                  Amount (in APTOS)
                </label>
                <input
                  type="number"
                  name="bid"
                  id="bid"
                  placeholder="0.00"
                  className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => setBid(e.target.value)}
                />
              </div>
            </div>

            <div className="form_btn w-full">
              <button
                className={`mt-4 flex w-full items-center justify-center rounded-full bg-purple-700 py-3 text-center text-white ${
                  seconds < 1 ? "opacity-50 cursor-none" : "cursor-pointer"
                }`}
                type="submit"
                disabled={seconds < 1}
              >
                {loading ? (
                  <Loader spinnerColor={"border-gray-50"} />
                ) : (
                  "Place Bid"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlaceBidModal;

PlaceBidModal.propTypes = {
  nft: PropTypes.object.isRequired,
};
