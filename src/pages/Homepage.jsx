import Hero from "../components/Hero";
import Nfts from '../components/Nfts';

const Homepage = () => {
  return (
    <>
      <Hero />
      <div className="features-container flex flex-wrap gap-8 items-center justify-between lg:px-16 md:px-8 px-4 py-16 bg-gray-50">
        <h2 className="font-[900] text-3xl lg:max-w-[400px] md:max-w-[400px] w-full uppercase">
          the amazing nft art of the world here
        </h2>
        <div className="features lg:max-w-[700px] md:max-w-[700px] w-full flex flex-wrap gap-8">
          <div className="feature lg:max-w-[300px] md:max-w-[300px] w-full flex items-start gap-2">
            <img
              className="w-[25px] h-[25px]"
              src="https://img.icons8.com/ios/50/credit-card-transfer.png"
              alt="credit-card-transfer"
            />
            <div className="feature-text">
              <h3 className="font-[700] capitalize text-xl">fast transaction</h3>
              <p className="text-md mt-2">Experience lightning-fast transactions for seamless and efficient trading on our platform.</p>
            </div>
          </div>

          <div className="feature lg:max-w-[300px] md:max-w-[300px] flex items-start gap-2">
            <img
              className="w-[25px] h-[25px]"
              src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-growth-chart-graphs-charts-smashingstocks-hand-drawn-black-smashing-stocks-7.png"
              alt="external-growth-chart-graphs-charts-smashingstocks-hand-drawn-black-smashing-stocks-7"
            />
            <div className="feature-text">
              <h3 className="font-[700] capitalize text-xl">growth transaction</h3>
              <p className="text-md mt-2">Maximize your investment potential and portfolio performance on our platform.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="nft-grid bg-white lg:px-16 md:px-8 px-4 py-12">
        <h2 className="font-[900] uppercase text-3xl">discover more nfts </h2> 
        <Nfts />
      </div>
    </>
  );
};

export default Homepage;
