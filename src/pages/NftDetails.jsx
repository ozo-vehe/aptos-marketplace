import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nft from "../components/Nft";
import AddressFormatter from "../components/AddressFormatter";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { allNfts, fetchAccountBalance } from "../features/nftMarketplace/nftMarketplaceSlice";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { withdrawBid } from "../utils/aptos";
import Notification from "../components/modal/Notification";
import { timeConverter } from "../utils/timeConverter";
import { useDispatch } from "react-redux";
import { fetchAllMarketplaceNfts, fetchUserNfts } from "../features/nftMarketplace/nftMarketplaceSlice";

const NftDetails = () => {
  const [nftDetails, setNftDetails] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [editedTimeLeft, setEditedTimeLeft] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const params = useParams();
  const dispatch = useDispatch();
  const { account, connected } = useWallet();

  const nftsFromStore = useSelector((state) => allNfts(state));

  // const sampleNftDetails = {
  //   id: "1",
  //   name: "Cosmic Explorer #123",
  //   description: "A rare digital art piece exploring the depths of space and imagination. This unique NFT features a blend of cosmic elements and futuristic design.",
  //   image: "https://example.com/nft-image.jpg",
  //   owner: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  //   bid_history: [
  //     {
  //       bidder: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  //       amount: "250000000"
  //     },
  //     {
  //       bidder: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
  //       amount: "200000000"
  //     },
  //     {
  //       bidder: "0x1111111111aaaaaaaa2222222222bbbbbbbb3333333333cccccccc4444444444",
  //       amount: "150000000"
  //     }
  //   ]
  // };

  const handleWithdrawBid = async () => {
    // Implement the logic to handle the withdrawal of the highest bid
    // You can use the `nftDetails` state to access the necessary information
    // and update the NFT's state accordingly
    if (!connected) {
      setError(true);
      setMessage("Please connect your wallet");
      return;
    }

    try {
      const { status, message } = await withdrawBid(nftDetails.id);
      if (status === "success") {
        dispatch(fetchAllMarketplaceNfts());
        dispatch(fetchUserNfts(account.address));
        dispatch(fetchAccountBalance(account.address));
        setSuccess(true);
        setMessage(message);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };
  useEffect(() => {
    const fetchNftDetails = async () => {
      setNftDetails(null);
      setLoading(true);
      console.log(nftsFromStore)
      const nft = nftsFromStore.find((nft) => nft.id === params.id);
      setNftDetails(nft);
      setLoading(false);

      const auction_end = Number(nft?.auction_end) * 1000;
      const currentDate = Date.now();
      const timeLeft = auction_end - currentDate;
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setSeconds(seconds);
    };
    fetchNftDetails();
    const {seconds, editedTimeLeft} = timeConverter(nftDetails);

    setSeconds(seconds);
    setEditedTimeLeft(editedTimeLeft);

  }, [params.id, nftsFromStore, nftDetails]);

  return (
    <main
      className={`max-w-[1440px] mx-auto lg:px-16 md:px-8 px-4 py-16 flex flex-wrap justify-center gap-8 min-h-[70vh] bg-gray-100 my-8 rounded-[20px] ${
        loading && "items-center"
      }`}
    >
      {/* Notification */}
      {success && <Notification type="success" message={message} />}
      {error && <Notification type="error" message={message} />}

      {loading && <Loader spinnerColor={"border-purple-700"} />}
      {nftDetails && (
        <>
          <Nft nft={nftDetails} />

          <div className="max-w-[500px] pt-2">
            <div className="nftDetailsInfo border-b border-gray-300 pb-5">
              <h3 className="text-3xl font-[700] mb-2 flex items-center gap-2">
                <button
                  aria-label="Go back"
                  onClick={() => window.history.back()}
                >
                  <img
                    className="w-6"
                    src="https://img.icons8.com/ios-glyphs/30/undo.png"
                    alt="undo"
                  />
                </button>
                {nftDetails.name}
              </h3>
              <p className="text-gray-600">{nftDetails.description}</p>

              <div className="my-3 flex flex-wrap gap-4 items-center justify-between">
                <p className="text-gray-900">
                  <span className="font-[500]">Owner: </span>
                  <span className="text-purple-700">
                    <AddressFormatter address={nftDetails.owner} />
                  </span>
                </p>

                <p className="text-gray-900">
                  <span className="font-[500]">Creator: </span>
                  <span className="text-purple-700">
                    <AddressFormatter address={nftDetails.creator} />
                  </span>
                </p>

                {nftDetails.for_auction && seconds > 0 && (
                  <p className="text-purple-700 w-full text-[12px]">
                    Ends in: {editedTimeLeft}
                  </p>
                )}
              </div>
            </div>

            {nftDetails.for_auction &&
              nftDetails.bid_history &&
              nftDetails.bid_history.length > 0 && (
                <>
                  <h3 className="text-lg flex items-center justify-between font-[700] mt-3">
                    <span>Bid History</span>
                    {connected &&
                      nftDetails.highest_bidder == account.address &&
                      seconds < 0 && (
                        <button
                          className="border text-[12px] px-3 rounded-full bg-purple-700 text-gray-50 capitalize"
                          onClick={handleWithdrawBid}
                        >
                          get your NFT
                        </button>
                      )}
                  </h3>
                  <div className="overflow-x-auto mt-5">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">
                            Bidder
                          </th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-600">
                            Bid
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nftDetails.bid_history[0].bidders.map(
                          (bidderAddress, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="px-4 py-2 robotoSerif text-gray-600 text-sm">
                                <AddressFormatter address={bidderAddress} />
                              </td>
                              <td className="px-4 py-2 robotoSerif text-right text-purple-700 text-sm">
                                {(
                                  nftDetails.bid_history[0].bids[index] /
                                  100000000
                                ).toFixed(2)}{" "}
                                APT
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
          </div>
        </>
      )}
    </main>
  );
};

export default NftDetails;
