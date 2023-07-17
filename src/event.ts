export enum AuctionEventType {
    NewAuctionStarted = 'new_auction_started',
    AuctionEnded = 'auction_ended',
    BidPlaced = 'bid_placed',
    // OutbidNotification = 'outbid_notification',
    // AuctionWon = 'auction_won',
    // etc. other auction events
}

export interface Auction {
    id: string;
    name: string;
    // other auction properties
}

export interface Bid {
    id: string;
    amount: number;
    userId: string;
    // other bid properties
}

export interface AuctionEvent {
    type: AuctionEventType;
    auction?: Auction;
    bid?: Bid;
    // You can add other event related properties here
}

// This can be used to create a new event
export function createEvent(type: AuctionEventType, auction?: Auction, bid?: Bid): AuctionEvent {
    return { type, auction, bid };
}
