"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const event_1 = require("./event");
const user_1 = require("./user");
const notification_1 = require("./notification");
class NotificationService {
    notify(eventData) {
        const { type, auction, bid } = eventData;
        const userId = bid ? bid.userId : "bidder_unavailable";
        const name = auction ? auction.name : "auction_name_unavailable";
        const interestedUsers = (0, user_1.getAllUsers)().filter(user => user.interestedCollections.includes(name));
        interestedUsers.forEach(user => {
            switch (type) {
                case event_1.AuctionEventType.NewAuctionStarted:
                    const auctionStartedMessage = `The auction for ${name} has started.`;
                    this.sendNotification(user, auctionStartedMessage, type);
                    break;
                case event_1.AuctionEventType.AuctionEnded:
                    const auctionEndedMessage = `The auction for ${name} has ended.`;
                    this.sendNotification(user, auctionEndedMessage, type);
                    break;
                case event_1.AuctionEventType.BidPlaced:
                    const bidPlacedMessage = `A new bid of ${bid === null || bid === void 0 ? void 0 : bid.amount} has been placed on ${name} by ${userId}.`;
                    this.sendNotification(user, bidPlacedMessage, type);
                    break;
                default:
                    console.error('Unhandled event type: ', type);
            }
        });
    }
    sendNotification(user, message, type) {
        const notification = (0, notification_1.createNotification)(`${Date.now()}`, type, user.id, message);
        if (user.notificationPreferences.email) {
            (0, notification_1.sendEmailNotification)(user, notification);
        }
        if (user.notificationPreferences.inApp) {
            (0, notification_1.sendPushNotification)(user, notification);
        }
        if (user.notificationPreferences.sms) {
            (0, notification_1.sendTextNotification)(user, notification);
        }
    }
}
exports.NotificationService = NotificationService;
