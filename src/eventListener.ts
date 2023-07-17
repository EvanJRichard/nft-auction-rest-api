import { AuctionEvent } from "./event";

export interface EventListener {
    notify(eventData: AuctionEvent): void;
}
