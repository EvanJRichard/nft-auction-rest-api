"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.AuctionEventType = void 0;
var AuctionEventType;
(function (AuctionEventType) {
    AuctionEventType["NewAuctionStarted"] = "new_auction_started";
    AuctionEventType["AuctionEnded"] = "auction_ended";
    AuctionEventType["BidPlaced"] = "bid_placed";
    // OutbidNotification = 'outbid_notification',
    // AuctionWon = 'auction_won',
    // etc. other auction events
})(AuctionEventType || (exports.AuctionEventType = AuctionEventType = {}));
// This can be used to create a new event
function createEvent(type, auction, bid) {
    return { type, auction, bid };
}
exports.createEvent = createEvent;
