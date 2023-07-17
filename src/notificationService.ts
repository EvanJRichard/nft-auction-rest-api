import { EventListener } from "./eventListener";
import { AuctionEvent, AuctionEventType } from "./event";
import { User, getAllUsers } from "./user";
import { createNotification, sendEmailNotification, sendPushNotification, sendTextNotification } from "./notification";

export class NotificationService implements EventListener {
    notify(eventData: AuctionEvent) {
        const { type, auction, bid } = eventData;
        const userId = bid ? bid.userId : "bidder_unavailable";
        const name = auction ? auction.name : "auction_name_unavailable";
        const interestedUsers = getAllUsers().filter(user =>
            user.interestedCollections.includes(name)
        );

        interestedUsers.forEach(user => {
            switch (type) {
                case AuctionEventType.NewAuctionStarted:
                    const auctionStartedMessage = `The auction for ${name} has started.`;
                    this.sendNotification(user, auctionStartedMessage, type);
                    break;
                case AuctionEventType.AuctionEnded:
                    const auctionEndedMessage = `The auction for ${name} has ended.`;
                    this.sendNotification(user, auctionEndedMessage, type);
                    break;
                case AuctionEventType.BidPlaced:
                    const bidPlacedMessage = `A new bid of ${bid?.amount} has been placed on ${name} by ${userId}.`;
                    this.sendNotification(user, bidPlacedMessage, type);
                    break;
                default:
                    console.error('Unhandled event type: ', type);
            }
        });
    }

    private sendNotification(user: User, message: string, type: string) {
        const notification = createNotification(`${Date.now()}`, type, user.id, message);
        if (user.notificationPreferences.email) {
            sendEmailNotification(user, notification);
        }
        if (user.notificationPreferences.inApp) {
            sendPushNotification(user, notification);
        }
        if (user.notificationPreferences.sms) {
            sendTextNotification(user, notification);
        }
    }
}
