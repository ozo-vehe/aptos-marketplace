import hero from '../assets/images/hero.png';
import dot from '../assets/images/dot.png';

const Hero = () => {
  return (
    <header className="bg-white flex lg:flex-nowrap md:flex-nowrap flex-wrap gap-4 lg:px-16 md:px-8 px-4 py-8 items-center lg:justify-between md:justify-between justify-center">
      <div className="lg:text-left md:text-left text-center relative py-16 sm:py-24 lg:py-32 lg:max-w-[700px] md:max-w-[500px]">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[900] mb-4 uppercase">
          discover, and collect digital art nfts
        </h1>
        <p className="lg:text-[18px] md:text-[18px] text-[16px] mb-8 max-w-[550px]">
          Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital assets
        </p>
        <button className="relative bg-purple-800 hover:bg-purple-700 text-gray-50 min-w-[150px] py-3 px-4 rounded-full transition-all duration-400 z-10">
          Explore Now
        </button>
        
        <img src={dot} alt="Dots" className="-z-[0] absolute bottom-0 left-0" />
      </div>

      <div className="header-image lg:max-w-[500px] md:max-w-[400px] w-full overflow-hidden">
        <img src={hero} alt="Hero image" className="w-full h-full object-cover" />
      </div>
    </header>
  )
}

export default Hero
