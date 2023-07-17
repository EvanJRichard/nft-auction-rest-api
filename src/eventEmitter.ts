import { EventEmitter } from 'events';
import { AuctionEvent, AuctionEventType } from "./event";
import { EventListener } from "./eventListener";

export class AuctionEventEmitter extends EventEmitter {
    private eventListeners: EventListener[] = [];
    private eventQueue: AuctionEvent[] = []; // Queue of events

    registerListener(listener: EventListener) {
        this.eventListeners.push(listener);
    }

    unregisterListener(listener: EventListener) {
        const index = this.eventListeners.indexOf(listener);
        if (index > -1) {
            this.eventListeners.splice(index, 1);
        }
    }

    // Method to add an event to the queue
    enqueueEvent(event: AuctionEvent) {
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

    emitEvent(event: AuctionEvent) {
        this.eventListeners.forEach(eventListeners => eventListeners.notify(event));
    }
}
