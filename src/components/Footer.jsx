import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex flex-wrap  gap-16 items-start justify-between lg:px-16 md:px-8 px-4 py-8 bg-white">
      <div className="footer-logo max-w-[400px]">
        <Logo textStyle={"text-xl text-gray-800"} />
        <p className="my-5 text-[14px]">
          The world&apos;s first and largest digital marketplace for crypto
          collectibles and non-fungible tokens (NFTs). Buy, sell and discover
          exclusive digital items.
        </p>
        <div className="footer-socials flex items-center gap-2">
          <img
            className="w-[30px] h=[30px] cursor-pointer"
            src="https://img.icons8.com/color/48/facebook.png"
            alt="facebook"
          />
          <img
            className="w-[28px] h=[28px] cursor-pointer"
            src="https://img.icons8.com/ios-filled/50/twitterx--v1.png"
            alt="twitterx--v1"
          />
          <img
            className="w-[30px] h=[30px] cursor-pointer"
            src="https://img.icons8.com/fluency/48/linkedin.png"
            alt="linkedin"
          />
        </div>
      </div>

      <div className="footer-text max-w-[500px]">
        <h3 className="font-bold text-[18px]">Stay In The Loop</h3>
        <p className="text-sm my-4">
          Join out mailing list to stay in the loop with our newest faeture releases, NFT drops, and tips and trik=cks for navigating NFTs.
        </p>
        <form className="subscribe w-full h-[50px] flex items-center justify-between p-1 rounded-[30px] border border-gray-400">
          <input className="w-full border-none px-4 h-full placeholder:text-[14px] rounded-[30px] text-gray-700 outline-none" type="email" placeholder="Enter you email address" required />
          <button type="submit" className="subscribe-btn bg-purple-800 text-gray-50 rounded-[30px] px-4 py-[10px] min-w-[150px] text-[14px] hover:bg-purple-700 transition-all duration-400">Subscribe Now</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
