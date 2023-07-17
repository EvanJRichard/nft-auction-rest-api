"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventEmitter_1 = require("./eventEmitter");
const notificationService_1 = require("./notificationService");
const event_1 = require("./event");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const eventEmitter = new eventEmitter_1.AuctionEventEmitter();
const notificationService = new notificationService_1.NotificationService();
// Register notificationService as a listener
eventEmitter.registerListener(notificationService);
// Endpoint to create a new auction
app.post('/auction', (req, res) => {
    const { name } = req.body;
    const auction = {
        id: `${Date.now()}`,
        name: name,
    };
    eventEmitter.enqueueEvent({
        type: event_1.AuctionEventType.NewAuctionStarted,
        auction
    });
    res.status(201).send({ message: 'Auction Created', auction });
});
// Endpoint to place a new bid
app.post('/bid', (req, res) => {
    const { auctionName, amount, userId } = req.body;
    const bid = {
        id: `${Date.now()}`,
        amount: amount,
        userId: userId,
    };
    eventEmitter.enqueueEvent({
        type: event_1.AuctionEventType.BidPlaced,
        auction: { id: "", name: auctionName },
        bid
    });
    res.status(201).send({ message: 'Bid Placed', bid });
});
// Endpoint to end an auction
app.post('/auction/end', (req, res) => {
    const { name } = req.body;
    eventEmitter.enqueueEvent({
        type: event_1.AuctionEventType.AuctionEnded,
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
