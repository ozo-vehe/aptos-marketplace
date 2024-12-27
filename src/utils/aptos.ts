// Import required dependencies and types
import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from "@aptos-labs/ts-sdk";
import { AptosClient } from "aptos";
import { hexToUint8Array } from "./textDecoder";
import { NFTInterface } from "../interfaces/NftInterface";
import { ReturnStatusInterface } from "../interfaces/NftStatusInterface";

// Contract address and configuration constants
export const ADDRESS = "0xe0c2e76c204c24aecc40430e9ece251d8fcb0b5a55aa62fab0aa9ec5441a27b4";
export const APTOS_CONTRACT = `${ADDRESS}::NFTMarketplace`;

// Initialize Aptos client configuration
const config = new AptosConfig({ network: Network.TESTNET });
export const client = new AptosClient("https://fullnode.testnet.aptoslabs.com/v1");
export const aptos = new Aptos(config);
const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_TYPE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

// Get account balance for a given address
export const getAccountBalance = async (address: string) => {
  const bal = await aptos.getAccountResource({
    accountAddress: address,
    resourceType: COIN_TYPE,
  });

  console.log(bal);

  return Number(bal.coin.value);
};

// Fetch all NFTs from the marketplace
export const fetchAllNFTs = async () => {
  try {
    const payload: InputViewFunctionData = {
      function: `${APTOS_CONTRACT}::get_all_nfts`,
      typeArguments: [],
    };
    const req = await aptos.view({ payload });
    const nfts = (req[0] as any)?.map((nft: any) => ({
      ...nft,
      name: new TextDecoder().decode(hexToUint8Array(nft.name.slice(2))),
      description: new TextDecoder().decode(
        hexToUint8Array(nft.description.slice(2))
      ),
      uri: new TextDecoder().decode(hexToUint8Array(nft.uri.slice(2))),
    }));

    return nfts;
  } catch (error) {
    console.log(error);
  }
};

// Fetch NFTs owned by a specific user address
export const fetchUserNFTs = async (address: string) => {
  try {
    const nfts = await fetchAllNFTs();
    const userNfts = nfts.filter(
      (nft: NFTInterface) => nft.owner.slice(-8) === address.slice(-8)
    );
    return userNfts;
  } catch (error) {
    console.log(error);
  }
};

// Mint a new NFT with provided metadata
export const mintNFT = async (values: {
  name: string;
  description: string;
  uri: string;
  rarity: number;
  royalty_percent: number;
}) => {
  try {
    // Convert string values to byte arrays
    const nameVector = Array.from(new TextEncoder().encode(values.name));
    const descriptionVector = Array.from(
      new TextEncoder().encode(values.description)
    );
    const uriVector = Array.from(new TextEncoder().encode(values.uri));

    const entryFunctionPayload = {
      type: "entry_function_payload",
      function: `${APTOS_CONTRACT}::mint_nft`,
      type_arguments: [],
      arguments: [
        nameVector,
        descriptionVector,
        uriVector,
        values.rarity,
        values.royalty_percent,
      ],
    };

    const tx = await (window as any).aptos.signAndSubmitTransaction(
      entryFunctionPayload
    );

    await client.waitForTransaction(tx.hash);

    const status: ReturnStatusInterface = {
      status: "success",
      message: tx.hash,
    };
    return status;
  } catch (error) {
    console.error("Error minting NFT:", error);
    const status: ReturnStatusInterface = {
      status: "error",
      message: error,
    };

    return status;
  }
};

// List an NFT for direct sale
export const listNFTForSale = async (nftId: string, price: string) => {
  try {
    const priceInOctas = parseFloat(price) * 100000000;

    const entryFunctionPayload = {
      type: "entry_function_payload",
      function: `${APTOS_CONTRACT}::list_for_sale`,
      type_arguments: [],
      arguments: [nftId, priceInOctas.toString()],
    };

    const response = await (window as any).aptos.signAndSubmitTransaction(
      entryFunctionPayload
    );
    await client.waitForTransaction(response.hash);

    const status: ReturnStatusInterface = {
      status: "success",
      message: response.hash,
    };
    return status;
  } catch (error) {
    console.error("Error listing NFT for sale:", error);
    const status: ReturnStatusInterface = {
      status: "error",
      message: error,
    };
    return status;
  }
};

// List an NFT for auction with duration
export const listNFTForAuction = async (
  nftId: string,
  price: string,
  duration: number
) => {
  try {
    // Convert price to octas and calculate timestamps
    const priceInOctas = parseFloat(price) * 100000000;
    const durationInSeconds = duration * 60;
    const startTimestamp = Math.floor(Date.now() / 1000);
    const endTimestamp = startTimestamp + durationInSeconds;

    const entryFunctionPayload = {
      type: "entry_function_payload",
      function: `${APTOS_CONTRACT}::list_for_auction`,
      type_arguments: [],
      arguments: [nftId, startTimestamp, endTimestamp, priceInOctas.toString()],
    };

    const response = await (window as any).aptos.signAndSubmitTransaction(
      entryFunctionPayload
    );
    await client.waitForTransaction(response.hash);

    const status: ReturnStatusInterface = {
      status: "success",
      message: response.hash,
    };
    return status;
  } catch (error) {
    console.error("Error listing NFT for sale:", error);
    const status: ReturnStatusInterface = {
      status: "error",
      message: error,
    };
    return status;
  }
};

// Purchase an NFT listed for direct sale
export const buyNFT = async (nftId: string, price: string) => {
  try {
    const priceInOctas = parseFloat(price) * 100000000;

    const entryFunctionPayload = {
      type: "entry_function_payload",
      function: `${APTOS_CONTRACT}::purchase_nft`,
      type_arguments: [],
      arguments: [nftId.toString(), priceInOctas.toString()],
    };

    const response = await (window as any).aptos.signAndSubmitTransaction(
      entryFunctionPayload
    );

    await client.waitForTransaction(response.hash);
    console.log(response);

    const status: ReturnStatusInterface = {
      status: "success",
      message: response.hash,
    };
    console.log(status);
    return status
  } catch (e) {
    console.log(e);
    const status: ReturnStatusInterface = {
      status: "error",
      message: "Error buying NFT",
    };
    console.log(status);
    return status;
  }
};

// Place a bid on an NFT listed for auction
export const placeBid = async (nftId: string, price: string) => {
  try {
    const priceInOctas = parseFloat(price) * 100000000;

    const entryFunctionPayload = {
      type: "entry_function_payload",
      function: `${APTOS_CONTRACT}::place_bid`,
      type_arguments: [],
      arguments: [nftId.toString(), priceInOctas.toString()],
    };
    const response = await (window as any).aptos.signAndSubmitTransaction(
      entryFunctionPayload
    );

    await client.waitForTransaction(response.hash);

    const status: ReturnStatusInterface = {
      status: "success",
      message: response.hash,
    };
    return status;
  } catch (e) {
    console.log(e);
    const status: ReturnStatusInterface = {
      status: "error",
      message: "Error placing bid",
    };
    return status;
  }
};

// Withdraw a bid from an auction
export const withdrawBid = async (nftId: string) => {
  try {
    const entryFunctionPayload = {
      type: "entry_function_payload",
      type_arguments: [],
      function: `${APTOS_CONTRACT}::withdraw_bid`,
      arguments: [nftId.toString()],
    }

    const txhash = await (window as any).aptos.signAndSubmitTransaction(entryFunctionPayload);
    await client.waitForTransaction(txhash.hash);

    const status: ReturnStatusInterface = {
      status: "success",
      message: txhash.hash,
    };
    return status;
  } catch (error) {
    console.error("Error withdrawing bid:", error);
    const status: ReturnStatusInterface = {
      status: "error",
      message: "Error withdrawing bid",
    };
    return status;
  }
}

// Fetch the marketplace fee collector address
export const fetchFeeCollector = async () => {
  const payload: InputViewFunctionData = {
    typeArguments: [],
    function: `${APTOS_CONTRACT}::get_marketplace_fee_collector`
  }

  const req = await aptos.view({payload});
  return req[0]
}
