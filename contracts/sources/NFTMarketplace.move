address 0xe0c2e76c204c24aecc40430e9ece251d8fcb0b5a55aa62fab0aa9ec5441a27b4 {
module NFTMarketplace {
    use 0x1::signer;
    use 0x1::vector;
    use 0x1::coin;
    use 0x1::aptos_coin;
    use 0x1::event;
    use 0x1::timestamp;

    const MARKETPLACE_ADDR: address =
        @0xe0c2e76c204c24aecc40430e9ece251d8fcb0b5a55aa62fab0aa9ec5441a27b4;

    // A resource struct for token distribution after auction
    struct TokenVault has key {
        tokens: u64,
        nfts: vector<Recipient>
    }

    struct Recipient has store, drop, copy, key {
        nft_id: u64,
        recipients: vector<address>
    }

    struct Bids has store, drop, copy, key {
        nft_id: u64,
        bidders: vector<address>,
        bids: vector<u64>
    }

    // Structures
    struct NFT has store, copy, key {
        id: u64,
        owner: address,
        creator: address,
        name: vector<u8>,
        description: vector<u8>,
        uri: vector<u8>,
        price: u64,
        for_sale: bool,
        for_auction: bool,
        rarity: u8,
        royalty_percent: u64, // Royalty percentage for the creator
        // Auction details
        auction_start: u64,
        auction_end: u64,
        highest_bidder: address,
        highest_bid: u64,
        auction_active: bool,
        bid_history: vector<Bids>
    }

    struct Marketplace has key {
        nfts: vector<NFT>,
        fee_collector: u64 // Marketplace fee collected
    }

    struct Blacklist has key {
        blacklisted: vector<u64> // List of blacklisted NFT IDs
    }

    // Events
    #[event]
    struct MarketplaceInitializedEvent has drop, store {
        owner: address,
        fee_collector: u64
    }

    #[event]
    struct NFTMintedEvent has drop, store {
        id: u64,
        owner: address,
        creator: address
    }

    #[event]
    struct NFTVaultCreatedEvent has drop, store {
        id: u64,
        owner: address
    }

    #[event]
    struct NFTListedEvent has drop, store {
        id: u64,
        owner: address,
        price: u64
    }

    #[event]
    struct NFTSoldEvent has drop, store {
        id: u64,
        owner: address,
        buyer: address,
        price: u64
    }

    #[event]
    struct NFTBlacklistedEvent has drop, store {
        id: u64,
        owner: address
    }

    #[event]
    struct AuctionStartedEvent has drop, store {
        id: u64,
        owner: address,
        price: u64,
        auction_start: u64,
        auction_end: u64
    }

    #[event]
    struct AuctionEndedEvent has drop, store {
        id: u64,
        owner: address,
        winner: address,
        price: u64
    }

    // Constants
    const MARKETPLACE_FEE_PERCENT: u64 = 2; // 2% fee

    // Initialization
    public entry fun initialize(account: &signer) {
        let marketplace = Marketplace {
            nfts: vector::empty<NFT>(),
            fee_collector: 0
        };
        let blacklist = Blacklist {
            blacklisted: vector::empty<u64>()
        };
        let token_vault = TokenVault {
            tokens: 0,
            nfts: vector::empty<Recipient>()
        };

        move_to(account, marketplace);
        move_to(account, blacklist);
        move_to(account, token_vault);

        // Emit MarketplaceInitializedEvent event
        event::emit(
            MarketplaceInitializedEvent {
                owner: signer::address_of(account),
                fee_collector: 0
            }
        );
    }

    #[view]
    public fun get_nft_details(nft_id: u64): NFT acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(MARKETPLACE_ADDR);
        let nft = vector::borrow(&marketplace.nfts, nft_id);

        assert!(nft.id == nft_id, 100); // Invalid NFT ID
        return *nft
    }

    #[view]
    public fun get_all_nfts(): vector<NFT> acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(MARKETPLACE_ADDR);
        return marketplace.nfts
    }

    #[view]
    public fun get_marketplace_fee_collector(): u64 acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(MARKETPLACE_ADDR);

        marketplace.fee_collector
    }

    // Minting
    public entry fun mint_nft(
        account: &signer,
        name: vector<u8>,
        description: vector<u8>,
        uri: vector<u8>,
        rarity: u8,
        royalty_percent: u64
    ) acquires Marketplace, TokenVault {
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);
        let nft_id = vector::length(&marketplace.nfts);
        let token_vault = borrow_global_mut<TokenVault>(MARKETPLACE_ADDR);

        assert!(royalty_percent <= 10, 200); // Max royalty 10%
        assert!(vector::length(&name) > 0, 201); // Name is required
        assert!(vector::length(&uri) > 0, 202); // URI is required

        let new_nft = NFT {
            id: nft_id,
            owner: signer::address_of(account),
            creator: signer::address_of(account),
            name,
            description,
            uri,
            price: 0,
            for_sale: false,
            rarity,
            royalty_percent,
            for_auction: false,
            auction_start: 0,
            auction_end: 0,
            highest_bidder: signer::address_of(account),
            highest_bid: 0,
            auction_active: false,
            bid_history: vector::empty<Bids>()
        };

        let vault = Recipient {
            nft_id: nft_id,
            recipients: vector::empty<address>()
        };

        vector::push_back(&mut marketplace.nfts, new_nft);
        vector::push_back(&mut token_vault.nfts, vault);

        // Emit NFTMintedEvent event
        event::emit(
            NFTMintedEvent {
                id: nft_id,
                owner: signer::address_of(account),
                creator: signer::address_of(account)
            }
        );
        event::emit(
            NFTVaultCreatedEvent {
                id: nft_id,
                owner: signer::address_of(account)
            }
        );
    }

    // Listing for Sale
    public entry fun list_for_sale(
        account: &signer, nft_id: u64, price: u64
    ) acquires Marketplace {
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);
        let nft_ref = vector::borrow_mut(&mut marketplace.nfts, nft_id);

        assert!(nft_ref.owner == signer::address_of(account), 300); // Caller is not the owner
        assert!(price > 0, 301); // Invalid price

        nft_ref.for_sale = true;
        nft_ref.price = price;
        nft_ref.for_auction = false;

        // Emit NFTListedEvent event
        event::emit(
            NFTListedEvent { id: nft_id, owner: signer::address_of(account), price }
        );
    }

    // List NFT for Auction
    public entry fun list_for_auction(
        account: &signer,
        nft_id: u64,
        auction_start: u64,
        auction_end: u64,
        price: u64
    ) acquires Marketplace {
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);
        let nft_ref = vector::borrow_mut(&mut marketplace.nfts, nft_id);


        // Create a coin store
        // coin::create_coin_store<aptos_coin::AptosCoin>(account);

        assert!(nft_ref.owner == signer::address_of(account), 400); // Caller is not the owner
        assert!(auction_start < auction_end, 401); // Invalid auction time
        assert!(price > 0, 402); // Invalid reserve price

        nft_ref.for_sale = false;
        nft_ref.for_auction = true;
        nft_ref.auction_start = auction_start;
        nft_ref.auction_end = auction_end;
        nft_ref.price = price;
        nft_ref.auction_active = true;

        // Initialize an empty bid history
        let bid_entry = Bids {
            nft_id,
            bidders: vector::empty<address>(),
            bids: vector::empty<u64>()
        };
        vector::push_back(&mut nft_ref.bid_history, bid_entry);

        // Emit AuctionStartedEvent event
        event::emit(
            AuctionStartedEvent {
                id: nft_id,
                owner: signer::address_of(account),
                price,
                auction_start,
                auction_end
            }
        );
    }

    // Purchase NFT
    public entry fun purchase_nft(
        account: &signer, nft_id: u64, payment: u64
    ) acquires Marketplace {
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);
        let nft_ref = vector::borrow_mut(&mut marketplace.nfts, nft_id);

        assert!(nft_ref.for_sale, 500); // NFT not for sale
        assert!(payment >= nft_ref.price, 501); // Insufficient payment

        // Calculate royalties and fees
        let fee = (nft_ref.price * MARKETPLACE_FEE_PERCENT) / 100;
        let royalty = (nft_ref.price * nft_ref.royalty_percent) / 100;
        let seller_revenue = nft_ref.price - fee - royalty;

        // Update fee collector
        marketplace.fee_collector = marketplace.fee_collector + fee;
        // let marketplace_fee = coin::extract();

        // Transfer payments
        coin::transfer<aptos_coin::AptosCoin>(account, nft_ref.owner, seller_revenue);
        coin::transfer<aptos_coin::AptosCoin>(account, nft_ref.creator, royalty);
        // coin::deposit<aptos_coin::AptosCoin>(MARKETPLACE_ADDR, marketplace_fee);

        // Transfer ownership
        nft_ref.owner = signer::address_of(account);
        nft_ref.for_sale = false;
        nft_ref.price = 0;
    }

    public entry fun place_bid(account: &signer, nft_id: u64, amount: u64) acquires Marketplace, TokenVault {
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);
        let token_vault = borrow_global_mut<TokenVault>(MARKETPLACE_ADDR);

        // Validate NFT ID
        assert!(nft_id < vector::length(&marketplace.nfts), 600); // Invalid NFT ID

        let nft_ref = vector::borrow_mut(&mut marketplace.nfts, nft_id);

        // Validate auction state
        assert!(nft_ref.for_auction, 601); // NFT not for auction
        assert!(amount > nft_ref.highest_bid, 602); // Bid amount too low
        assert!(nft_ref.auction_end > timestamp::now_seconds(), 603); // Auction has ended

        let bid_entry = vector::borrow_mut(&mut nft_ref.bid_history, 0);

        // Update highest bid and bidder
        nft_ref.highest_bidder = signer::address_of(account);
        nft_ref.highest_bid = amount;

        // Record bid
        if (!vector::contains(&bid_entry.bidders, &signer::address_of(account))) {
            vector::push_back(&mut bid_entry.bidders, signer::address_of(account));
            vector::push_back(&mut bid_entry.bids, amount);
        } else {
            let (_, index) = vector::index_of(
                &bid_entry.bidders, &signer::address_of(account)
            );
            vector::replace(&mut bid_entry.bids, index, amount);
        };

        // Deposit token to the smart contract
        let nft_vault = vector::borrow_mut(&mut token_vault.nfts, nft_id);
        // let bid = coin::;
        token_vault.tokens = token_vault.tokens + amount;

        vector::push_back(&mut nft_vault.recipients, signer::address_of(account));

    }

    public fun delist_nft(account: &signer, nft_id: u64) acquires Marketplace {
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);
        let nft_ref = vector::borrow_mut(&mut marketplace.nfts, nft_id);

        assert!(nft_ref.owner == signer::address_of(account), 900); // Caller is not the owner
        if (nft_ref.for_auction) {
            nft_ref.auction_active = false;
            nft_ref.auction_start = 0;
            nft_ref.auction_end = 0;
            nft_ref.highest_bidder = @0x0;
            nft_ref.highest_bid = 0;
            nft_ref.bid_history = vector::empty<Bids>();
            nft_ref.for_auction = false;
        };
        if (nft_ref.for_sale) {
            nft_ref.for_sale = false;
            nft_ref.price = 0;
        };
    }

    // Blacklisting
    public entry fun blacklist_nft(account: &signer, nft_id: u64) acquires Blacklist {
        let blacklist = borrow_global_mut<Blacklist>(signer::address_of(account));
        vector::push_back(&mut blacklist.blacklisted, nft_id);
    }

    public fun is_nft_blacklisted(account: address, nft_id: u64): bool acquires Blacklist {
        if (!exists<Blacklist>(account)) {
            return false
        };
        let blacklist = borrow_global<Blacklist>(account);
        vector::contains(&blacklist.blacklisted, &nft_id)
    }

    // Withdraw Marketplace Fees
    public entry fun withdraw_fees(account: &signer, amount: u64) acquires Marketplace {
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);

        assert!(amount <= marketplace.fee_collector, 700); // Insufficient fees
        assert!(MARKETPLACE_ADDR == signer::address_of(account), 701); // Caller is not the owner

        marketplace.fee_collector = marketplace.fee_collector - amount;
        coin::transfer<aptos_coin::AptosCoin>(
            account, signer::address_of(account), amount
        );
    }

    // Withdraw Auction Bid
    public entry fun withdraw_bid(account: &signer, nft_id: u64) acquires Marketplace {
        // Borrow mutable reference to the the marketplace
        let marketplace = borrow_global_mut<Marketplace>(MARKETPLACE_ADDR);
        // Get mutable reference to the NFT and its bid history
        let nft_ref = vector::borrow_mut(&mut marketplace.nfts, nft_id);
        // let bid_entry = &mut nft_ref.bid_history;

        // Ensure the auction has ended
        assert!(nft_ref.for_auction, 800); // "NFT is not for auction"
        assert!(nft_ref.auction_end < timestamp::now_seconds(), 801); // "Auction is still active"

        // Calculate royalties and fees
        let fee = (nft_ref.price * MARKETPLACE_FEE_PERCENT) / 100;
        let royalty = (nft_ref.price * nft_ref.royalty_percent) / 100;

        // Update fee collector
        marketplace.fee_collector = marketplace.fee_collector + fee;

        // Ensure there's a valid highest bidder and highest bid
        assert!(nft_ref.highest_bidder == signer::address_of(account), 802); // "Caller is not the owner"
        assert!(nft_ref.highest_bid > 0, 803); // "No valid bid"

        let highest_bidder = nft_ref.highest_bidder;
        let highest_bid = nft_ref.highest_bid;

        // Transfer the highest bid amount to the owner and royalty to the creator
        coin::transfer<aptos_coin::AptosCoin>(account, nft_ref.owner, highest_bid);
        coin::transfer<aptos_coin::AptosCoin>(account, nft_ref.creator, royalty);

        // Update the NFT auction details
        nft_ref.owner = highest_bidder;

        // Clear auction related details
        nft_ref.for_auction = false;
        nft_ref.auction_start = 0;
        nft_ref.auction_end = 0;
        nft_ref.highest_bidder = signer::address_of(account);
        nft_ref.highest_bid = 0;
        nft_ref.price = 0;

        // Clear the bid history
        vector::replace(
            &mut nft_ref.bid_history,
            0,
            Bids {
                nft_id,
                bidders: vector::empty<address>(),
                bids: vector::empty<u64>()
            }
        );
    }
}
}
