import { useState, useEffect } from "react";
import Nft from "./Nft";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { allNfts, fetchAllMarketplaceNfts } from "../features/nftMarketplace/nftMarketplaceSlice";

const Nfts = () => {
  const [active, setActive] = useState("all");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = [
    { label: "All Category", value: "all" },
    { label: "Art", value: "art" },
    { label: "Music", value: "music" },
    { label: "Photography", value: "photography" },
    { label: "Sports", value: "sports" },
  ];

  const handleFilter = (filter) => {
    if(filter == "auction") {
      const nft = nftsFromStore.filter((nft) => nft.for_auction);
      setNfts(nft);
      return;
    }
    else if(filter == "sale") {
      const nft = nftsFromStore.filter((nft) => nft.for_sale);
      setNfts(nft);
      return;
    }
    else {
      const marketplaceNfts = nftsFromStore.filter(
        (nft) => nft.for_sale || nft.for_auction
      );
      setNfts(marketplaceNfts);
      return;
    }
  };

  const nftsFromStore = useSelector((state) => allNfts(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMarketplaceNFTs = async () => {
      setLoading(true);
      try {
        const marketplaceNfts = nftsFromStore.filter(
          (nft) => nft.for_sale || nft.for_auction
        );

        setNfts(marketplaceNfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaceNFTs();
    dispatch(fetchAllMarketplaceNfts());
  }, [dispatch]);

  return (
    <>
      <div className="nft-filter flex flex-wrap gap-8 items-center justify-between my-8">
        <ul className="flex flex-wrap items-center justify-start gap-4">
          {categories.map((item) => (
            <li
              key={item.value}
              onClick={() => setActive(item.value)}
              className={`montserrat filter-btn px-5 py-2 min-w-[70px] rounded-[32px] text-[14px] text-center cursor-pointer transition-all duration-400 font-[500] ${
                item.value === active
                  ? "bg-purple-800 hover:bg-purple-700 text-gray-50"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className="filter">
          <div className="selectFilterContainer montserrat filter-btn pr-4 min-w-[70px] rounded-[32px] text-[14px] cursor-pointer transition-all duration-400 font-[500] outline-none border-none bg-gray-200">
            <select
              name="filter"
              id="filter"
              onChange={(e) => handleFilter(e.target.value)}
              className="montserrat filter-btn px-4 py-2 min-w-[70px] rounded-[32px] text-[14px] cursor-pointer transition-all duration-400 font-[500] outline-none border-none bg-gray-200"
            >
              <option value="">Select filter</option>
              <option value="auction">Auction</option>
              <option value="sale">Sale</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className={`nft-container flex flex-wrap gap-8 ${
          loading ? "justify-center" : ""
        }`}
      >
        {loading ? (
          <Loader spinnerColor={"border-purple-700 mt-12"} />
        ) : (
          <>
            {nfts.length > 0 ? (
              <>
                {nfts.map((nft) => (
                  <Nft nft={nft} key={nft.id} />
                ))}
              </>
            ) : (
              <div className="text-center w-full min-h-[20vh] text-2xl font-bold mt-12">
                No NFTs available in the marketplace
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Nfts;
