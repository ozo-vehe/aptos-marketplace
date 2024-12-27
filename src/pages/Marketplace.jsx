import Nfts from '../components/Nfts';

const Marketplace = () => {
  return (
    <div className="nft-marketplace bg-white lg:px-16 md:px-8 px-4 py-12">
      <h2 className="font-[900] uppercase text-5xl mb-2">nfts marketplace </h2>
      <p className="lg:text-lg md:text-lg text-[16px] capitalize">discover more nfts </p> 
      <Nfts />
    </div>
  )
}

export default Marketplace;
