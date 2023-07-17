import express from 'express';
import { AuctionEventEmitter } from './eventEmitter';
import { NotificationService } from './notificationService';
import { Auction, AuctionEventType, Bid } from './event';
import { createUser } from './user';

const app = express();
app.use(express.json());

const eventEmitter = new AuctionEventEmitter();
const notificationService = new NotificationService();

// Register notificationService as a listener
eventEmitter.registerListener(notificationService);

// Endpoint to create a new auction
app.post('/auction', (req, res) => {
    const { name } = req.body;
    const auction: Auction = {
        id: `${Date.now()}`, // Using timestamp as a simple id generator
        name: name,
    };

    eventEmitter.enqueueEvent({
        type: AuctionEventType.NewAuctionStarted,
        auction
    });

    res.status(201).send({ message: 'Auction Created', auction });
});

// Endpoint to place a new bid
app.post('/bid', (req, res) => {
    const { auctionName, amount, userId } = req.body;
    const bid: Bid = {
        id: `${Date.now()}`, // Using timestamp as a simple id generator
        amount: amount,
        userId: userId,
    };

    eventEmitter.enqueueEvent({
        type: AuctionEventType.BidPlaced,
        auction: { id: "", name: auctionName },
        bid
    });

    res.status(201).send({ message: 'Bid Placed', bid });
});

// Endpoint to end an auction
app.post('/auction/end', (req, res) => {
    const { name } = req.body;
    eventEmitter.enqueueEvent({
        type: AuctionEventType.AuctionEnded,
        auction: { id: "", name: name },
    });

    res.status(200).send({ message: 'Auction Ended', name });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    setInterval(() => eventEmitter.processQueue(), 1000); // processQueue is called every 1000 milliseconds (or 1 second)
});