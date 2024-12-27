# APTOS MARKETPLACE
## About the Aptos NFT Marketplace

The **Aptos NFT Marketplace** is a decentralized platform built on the Aptos blockchain that facilitates the creation, buying, selling, and auctioning of Non-Fungible Tokens (NFTs). As the NFT space continues to grow, this marketplace aims to provide a secure, efficient, and user-friendly environment for artists, collectors, and enthusiasts to engage with digital assets.

![NFTERS-12-27-2024_03_29_AM](https://github.com/user-attachments/assets/5e7e07dc-0231-4055-9d05-d9359be3c1f3)



### Purpose

The primary purpose of the Aptos NFT Marketplace is to empower creators and collectors by providing them with a robust platform to showcase and trade their digital art and collectibles. By leveraging the capabilities of the Aptos blockchain, the marketplace ensures that all transactions are transparent, secure, and immutable. This fosters trust among users and enhances the overall experience of trading NFTs.

The marketplace benefits from high throughput, low transaction costs, and enhanced security features by utilizing the Aptos blockchain. This positions it as a competitive player in the rapidly evolving NFT landscape.

### Future Development

The Aptos NFT Marketplace is designed to be extensible and adaptable. Future developments may include:
- Integration with other blockchain networks for cross-chain NFT trading.
- Enhanced analytics tools for users to track market trends and asset performance.
- Community-driven features, such as governance mechanisms that allow users to propose and vote on marketplace changes.

In summary, the Aptos NFT Marketplace is not just a platform for trading digital assets; it is a community-driven initiative aimed at empowering creators and collectors while promoting the growth of the NFT ecosystem.

### Key Features
- **Decentralization**: The marketplace operates on a decentralized network, eliminating the need for intermediaries and allowing users full control over their assets.
- **Enhanced Security**: Robust smart contract audits and real-time monitoring
- **User-Friendly Interface**: Clean design and comprehensive tutorials.
- **Filtering**: NFTs can be filtered based on those for auction or sale.
- **Auction and Bidding System**: Versatile auction options and automatic bidding.
- **Royalties for Creators**: The marketplace allows creators to set royalty percentages, ensuring they receive a share of future sales of their NFTs. This incentivizes artists and supports their ongoing work.
- **Event Logging**: The marketplace emits events for significant actions, such as NFT minting and sales, providing transparency and enabling users to track the history of their assets.


## List of Tech Stack Used
### Blockchain and Smart Contracts:
- **Blockchain Platform**: Aptos
- **Smart Contract Language**: Move
- **Wallet Integration**: Petra Wallet

### Front-End Development:
- **Frameworks/Libraries**: React.js
- **Routing**: React router
- **Styling**: Tailwind CSS
- **State Management**: Redux toolkit

### Development and Deployment Tools:
- **Development Environment**: Visual Studio Code,
- **Version Control**: Git, GitHub

### Testing:
- **Smart Contract Testing**: Move CLI,


## Getting Started

### Prerequisites
- Ensure you have the Aptos CLI installed and configured.
- Familiarity with Move programming language and Aptos blockchain concepts.

### Deployment
1. Clone the repository:
   ```bash
   git clone https://github.com/ozo-vehe/aptos-marketplace/
   cd aptos-marketplace/contracts
   ```
   
2. Compile the Move module:
  ```bash
  aptos move compile
  ```
3. Publish the module to the Aptos blockchain:
  ```bash
  aptos move publish
  ```
## Usage
- Initialize the Marketplace: Call the `initialize` function to set up the marketplace.
- Mint an NFT: Use the `mint_nft` function to create a new NFT.
- List for Sale: Call `list_for_sale` to put your NFT up for sale.
- List for Auction: Use `list_for_auction` to auction your NFT.
- Purchase an NFT: Call `purchase_nft` to buy an NFT directly.
- Place a Bid: Use `place_bid` to bid on an NFT in an auction.
- Get your NFT: Call `withdraw_bid` to get your NFT, if you are the highest bidder.

## Sample NFT Details to Use
```text
Name: Oceanic Whisper 
Description: A serene moment captured in the vast blue depths of the ocean. 
https://fastly.picsum.photos/id/186/200/200.jpg?hmac=bNtKzMZT8HFzZq8mbTSWaQvmkX8T7TE47fspKMfxVl8 
 
Name: Forest Mirage 
Description: An enchanted forest where light and shadow play in harmony. 
https://fastly.picsum.photos/id/255/200/200.jpg?hmac=IYQV36UT5-F1dbK_CQXF7PDfLfwcnwKijqeBCo3yMlc 
 
Name: Galactic Pulse 
Description: The heartbeat of the universe, emanating in waves of color. 
https://fastly.picsum.photos/id/522/200/200.jpg?hmac=-4K81k9CA5C9S2DWiH5kP8rMvaAPk2LByYZHP9ejTjA 
 
Name: Lunar Blossom 
Description: A rare flower blooming under the soft glow of the moon. 
https://fastly.picsum.photos/id/501/200/200.jpg?hmac=tKXe69j4tHhkAA_Qc3XinkTuubEWwkFVhA9TR4TmCG8 
 
Name: Ember Phoenix 
Description: A fiery bird rising from the ashes, symbolizing rebirth and strength. 
https://fastly.picsum.photos/id/68/200/200.jpg?hmac=CPg7ZGK1PBwt6DmjjPRApX_t-mOiYxt0pel50VH4Gwk 
 
Name: Starlit Haven 
Description: A sanctuary under a blanket of shimmering stars. 
https://fastly.picsum.photos/id/891/200/200.jpg?hmac=J19K6yDbzNDUjkInb56-h-n_xM3i40GCfHWor0YKgyU 
 
Name: Mystic Aurora 
Description: The northern lights captured in their most vibrant and magical form. 
https://fastly.picsum.photos/id/999/200/200.jpg?hmac=iwXALEStJtHL4Thxk_YbLNHNmjq9ZrIQYFUvtxndOaU 
 
Name: Crystal Echo 
Description: The sound of crystal chimes resonating in an ethereal realm. 
https://fastly.picsum.photos/id/338/200/200.jpg?hmac=5S5SeR5xW8mbN3Ml7wTTJPePX392JafhcFMGm7IFNy0 
 
Name: Eternal Cascade 
Description: A waterfall that flows endlessly, reflecting the infinite beauty of nature. 
https://fastly.picsum.photos/id/572/200/200.jpg?hmac=YFsNUCQc2Dfz_5O0HY8HmDfquz04XrdcpJ0P4Z7plRY
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.
