import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Nft from "../components/Nft";
import Loader from "../components/Loader";
import bg from "../assets/images/profile.png";
import profileImage from "../assets/images/profileImage.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserNfts,
  allUserNfts,
  allFeeCollector,
  fetchMarketplaceCollectorsFee,
} from "../features/nftMarketplace/nftMarketplaceSlice";
import { ADDRESS } from "../utils/aptos";

const TABS = [
  { label: "My NFTs", value: 0 },
  { label: "Listed NFTs", value: 1 },
  { label: "Auction NFTs", value: 2 },
];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  // const [userNFTs, setUserNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [auctionNFTs, setAuctionNFTs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const { account, disconnect } = useWallet();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userNFTs = useSelector((state) => allUserNfts(state));
  const marketplaceFee = useSelector((state) => allFeeCollector(state));

  const handleDisconnect = () => {
    disconnect();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserNFTDetails = async () => {
      setLoading(false);
      dispatch(fetchUserNfts(account.address));
      dispatch(fetchMarketplaceCollectorsFee());
      const listedNFTs = userNFTs.filter((nft) => nft.for_sale);
      setListedNFTs(listedNFTs);
      const auctionNFTs = userNFTs.filter((nft) => nft.for_auction);
      setAuctionNFTs(auctionNFTs);
      setLoading(false);
    };
    fetchUserNFTDetails();
  }, [account, dispatch, userNFTs]);

  return (
    <div className="min-h-screen bg-white relative">
      <header className="mb-16">
        <div className="header-image lg:h-[250px] md:h-[250px] h-[200px] w-full overflow-hidden">
          <img
            src={bg}
            alt="Hero image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:px-16 md:px-8 px-4">
          <div className="max-w-[1440px] mx-auto -mt-10 z-10 relative bg-white lg:rounded-[32px] md:rounded-[24px] rounded-[12px] flex flex-wrap lg:justify-start md:justify-start justify-center lg:gap-8 md:gap-6 gap-4 lg:px-16 md:px-8 px-4 py-8 shadow-sm">
            <div className="lg:w-40 lg:h-40 md:w-32 w-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={profileImage}
                alt="User default profile image"
              />
            </div>

            <div className="profile-info flex flex-col lg:items-start md:items-start items-center lg:justify-center md:justify-center justify-start">
              <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold robotoSerif">
                {account
                  ? `${account.address.slice(0, 6)}....${account.address.slice(
                      -6
                    )}`
                  : "Connect Wallet"}
              </h1>

              {ADDRESS == account?.address && (
                <div className="font-[500] flex items-center justify-between flex-wrap gap-4 text-purple-700 text-[18px] mt-1 mb-3 w-full">
                  <p className="text-sm">Fee collected: {marketplaceFee / 100000000}{" "} APT</p>
                  <button className="text-[12px] px-3 bg-purple-700 text-gray-50 rounded-full" onClick={() => alert("This feature coming soon!")}>withdraw</button>
                </div>
              )}

              <button
                onClick={handleDisconnect}
                className="text-gray-200 mt-2 capitalize montserrat rounded-full py-2 bg-purple-800 hover:bg-purple-700 transition-all duration-300 w-[100px] font-[600] text-[14px] text-center"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto lg:px-16 md:px-8 px-4 py-4">
        <div className="flex flex-wrap lg:justify-start md:justify-start justify-center gap-4 p-1 my-8">
          {TABS.map((tab, _i) => (
            <button
              key={_i}
              onClick={() => setActiveTab(tab.value)}
              className={`montserrat filter-btn px-5 py-2 min-w-[70px] rounded-[32px] text-[14px] text-center cursor-pointer transition-all duration-400 font-[500]
                ${
                  activeTab === tab.value
                    ? "bg-purple-800 hover:bg-purple-700 text-gray-50"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === 0 && (
            <>
              {loading ? (
                <Loader spinnerColor={"border-gray-500 mx-auto"} />
              ) : (
                <>
                  {userNFTs?.length > 0 ? (
                    <div className="flex items-center flex-wrap gap-6">
                      {userNFTs.map((nft) => (
                        <Nft key={nft.id} nft={nft} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-2xl font-bold mt-12 min-h-[30vh] flex items-center justify-center">
                      No minted NFTs available
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {activeTab === 1 && (
            <>
              {loading ? (
                <Loader spinnerColor={"border-gray-500 mx-auto"} />
              ) : (
                <>
                  {listedNFTs?.length > 0 ? (
                    <div className="flex items-center flex-wrap gap-6">
                      {listedNFTs.map((nft) => (
                        <Nft key={nft.id} nft={nft} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-2xl font-bold mt-12 min-h-[30vh] flex items-center justify-center">
                      No listed NFTs available
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {activeTab === 2 && (
            <>
              {loading ? (
                <Loader spinnerColor={"border-gray-500 mx-auto"} />
              ) : (
                <>
                  {auctionNFTs?.length > 0 ? (
                    <div className="flex items-center flex-wrap gap-6">
                      {auctionNFTs.map((nft) => (
                        <Nft key={nft.id} nft={nft} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-2xl font-bold mt-12 min-h-[30vh] flex items-center justify-center">
                      No auctioned NFTs available
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
