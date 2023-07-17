"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionEventEmitter = void 0;
const events_1 = require("events");
class AuctionEventEmitter extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.eventListeners = [];
        this.eventQueue = []; // Queue of events
    }
    registerListener(listener) {
        this.eventListeners.push(listener);
    }
    unregisterListener(listener) {
        const index = this.eventListeners.indexOf(listener);
        if (index > -1) {
            this.eventListeners.splice(index, 1);
        }
    }
    // Method to add an event to the queue
    enqueueEvent(event) {
        this.eventQueue.push(event);
    }
    // Method to start processing events from the queue
    processQueue() {
        // Assuming synchronous processing for simplicity, but this could be made asynchronous
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift(); // Get the first event from the queue
            if (event) {
                this.emitEvent(event);
            }
        }
    }
    emitEvent(event) {
        this.eventListeners.forEach(eventListeners => eventListeners.notify(event));
    }
}
exports.AuctionEventEmitter = AuctionEventEmitter;
