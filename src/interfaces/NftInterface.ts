export interface NFTInterface {
  owner: string;
  creator: string;
  name: string;
  description: string;
  uri: string;
  price: number;
  for_sale: boolean;
  for_auction: boolean;
  rarity: number;
  royalty_percent: number;
  auction_start: number;
  auction_end: number;
  reserve_price: number;
  highest_bidder: string;
  highest_bid: number;
  auction_active: boolean;
  bid_history: Array<[]>;
}