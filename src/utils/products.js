import nft1 from '../assets/images/nft1.png';
import nft2 from '../assets/images/nft2.png';
import nft3 from '../assets/images/nft3.png';
import nft4 from '../assets/images/nft4.png';

export const collections = [
  {
    name: "Art",
    description: "Artful display of beautiful NFTs"
  }
]

export const nfts = [
  {
    id: 1,
    name: "Cosmic Voyager",
    description: "A journey through the stars",
    uri: nft1,
    price: 2.5,
    owner: "0x1234567890123456789012345678901234567890",
    auctionStart: new Date("2023-06-01T00:00:00Z"),
    auctionEnd: new Date("2023-06-07T23:59:59Z"),
    buyers: [
      { address: "0xabcdef1234567890abcdef1234567890abcdef12", bid: 2.2 },
      { address: "0x9876543210fedcba9876543210fedcba98765432", bid: 2.4 }
    ]
  },
  {
    id: 2,
    name: "Digital Dreamscape",
    description: "A surreal landscape of the mind",
    uri: nft2,
    price: 1.8,
    owner: "0x2345678901234567890123456789012345678901",
    auctionStart: new Date("2023-06-02T00:00:00Z"),
    auctionEnd: new Date("2023-06-08T23:59:59Z"),
    buyers: [
      { address: "0xfedcba9876543210fedcba9876543210fedcba98", bid: 1.6 }
    ]
  },
  {
    id: 3,
    name: "Quantum Quill",
    description: "The pen that writes reality",
    uri: nft3,
    price: 3.2,
    owner: "0x3456789012345678901234567890123456789012",
    auctionStart: new Date("2023-06-03T00:00:00Z"),
    auctionEnd: new Date("2023-06-09T23:59:59Z"),
    buyers: [
      { address: "0x1122334455667788990011223344556677889900", bid: 3.0 },
      { address: "0xaabbccddeeff00112233445566778899aabbccdd", bid: 3.1 }
    ]
  },
  {
    id: 4,
    name: "Neon Nexus",
    description: "Where digital meets analog",
    uri: nft4,
    price: 1.5,
    owner: "0x4567890123456789012345678901234567890123",
    auctionStart: new Date("2023-06-04T00:00:00Z"),
    auctionEnd: new Date("2023-06-10T23:59:59Z"),
    buyers: []
  },
  {
    id: 5,
    name: "Ethereal Echo",
    description: "A whisper from another dimension",
    uri: nft1,
    price: 2.7,
    owner: "0x5678901234567890123456789012345678901234",
    auctionStart: new Date("2023-06-05T00:00:00Z"),
    auctionEnd: new Date("2023-06-11T23:59:59Z"),
    buyers: [
      { address: "0x123456789abcdef123456789abcdef123456789a", bid: 2.6 }
    ]
  },
  {
    id: 6,
    name: "Cybernetic Siren",
    description: "The allure of the digital age",
    uri: nft2,
    price: 4.0,
    owner: "0x6789012345678901234567890123456789012345",
    auctionStart: new Date("2023-06-06T00:00:00Z"),
    auctionEnd: new Date("2023-06-12T23:59:59Z"),
    buyers: [
      { address: "0xfedcba987654321fedcba987654321fedcba9876", bid: 3.8 },
      { address: "0x111222333444555666777888999000aaabbbcccd", bid: 3.9 }
    ]
  },
  {
    id: 7,
    name: "Pixel Phoenix",
    description: "Rising from the ashes of obsolete tech",
    uri: nft3,
    price: 2.2,
    owner: "0x7890123456789012345678901234567890123456",
    auctionStart: new Date("2023-06-07T00:00:00Z"),
    auctionEnd: new Date("2023-06-13T23:59:59Z"),
    buyers: [
      { address: "0xaaabbbcccdddeeefff111222333444555666777", bid: 2.1 }
    ]
  },
  {
    id: 8,
    name: "Holographic Horizon",
    description: "The edge of perception",
    uri: nft4,
    price: 3.5,
    owner: "0x8901234567890123456789012345678901234567",
    auctionStart: new Date("2023-06-08T00:00:00Z"),
    auctionEnd: new Date("2023-06-14T23:59:59Z"),
    buyers: [
      { address: "0x222333444555666777888999aaabbbcccdddeeef", bid: 3.3 },
      { address: "0xdddeeefff111222333444555666777888999aaa", bid: 3.4 }
    ]
  },
  {
    id: 9,
    name: "Quantum Quasar",
    description: "A glimpse into the cosmic computer",
    uri: nft1,
    price: 5.0,
    owner: "0x9012345678901234567890123456789012345678",
    auctionStart: new Date("2023-06-09T00:00:00Z"),
    auctionEnd: new Date("2023-06-15T23:59:59Z"),
    buyers: [
      { address: "0x333444555666777888999aaabbbcccdddeeefff1", bid: 4.8 },
      { address: "0xeeefff111222333444555666777888999aaabbb", bid: 4.9 }
    ]
  },
  {
    id: 10,
    name: "Digital Dryad",
    description: "Nature spirits in the machine",
    uri: nft2,
    price: 2.8,
    owner: "0x0123456789012345678901234567890123456789",
    auctionStart: new Date("2023-06-10T00:00:00Z"),
    auctionEnd: new Date("2023-06-16T23:59:59Z"),
    buyers: [
      { address: "0x444555666777888999aaabbbcccdddeeefff1112", bid: 2.7 }
    ]
  },
  {
    id: 11,
    name: "Synthetic Synapse",
    description: "The bridge between mind and machine",
    uri: nft3,
    price: 3.7,
    owner: "0xa123456789012345678901234567890123456789",
    auctionStart: new Date("2023-06-11T00:00:00Z"),
    auctionEnd: new Date("2023-06-17T23:59:59Z"),
    buyers: [
      { address: "0x555666777888999aaabbbcccdddeeefff1112223", bid: 3.5 },
      { address: "0xfff111222333444555666777888999aaabbbccc", bid: 3.6 }
    ]
  },
  {
    id: 12,
    name: "Blockchain Behemoth",
    description: "The titan of decentralized data",
    uri: nft4,
    price: 6.0,
    owner: "0xb123456789012345678901234567890123456789",
    auctionStart: new Date("2023-06-12T00:00:00Z"),
    auctionEnd: new Date("2023-06-18T23:59:59Z"),
    buyers: [
      { address: "0x666777888999aaabbbcccdddeeefff1112223334", bid: 5.8 },
      { address: "0x111222333444555666777888999aaabbbcccddd", bid: 5.9 }
    ]
  }
]
