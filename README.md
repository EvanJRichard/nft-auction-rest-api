# Upshot NFT Auction Notification Service

This repository provides a simple NFT auction notification system built with Node.js and TypeScript. The system follows an event-based architecture, where events are produced when an auction is created, a bid is placed, or an auction ends. The notification service, which acts as an event listener, processes these events and sends out appropriate notifications to users interested in the specific NFT collection. It uses a queue system to distribute events, ensuring scalability and fault tolerance.

## Design Decisions

1. **Event-based Architecture**: The decision to use an event-based architecture was driven by the need for decoupling and to ensure asynchronous communication between the auction system and the notification service. The system can easily support additional listeners in the future.

2. **Queue System**: A queue system is implemented to ensure that all events are processed, even during peak load times. This also allows for reprocessing in case of a failure, providing fault tolerance.

3. **In-memory Users**: As a simplification for the task, all users are currently kept in-memory. In a real-world scenario, they should be fetched from a persistent data store.

## Assumptions

1. **User Preferences**: Each user is assumed to have a list of collections they are interested in. They also specify their notification preferences i.e. whether they want to receive email notifications or push notifications.

2. **Notification Content**: The content of the notification is kept simple for this task. It contains basic information about the event that has occurred (auction started/ended, bid placed).

## Trade-offs

1. **Queue System**: The queue system is currently in-memory, so if the application crashes, the events in the queue are lost. For production systems, a resilient and persistent queuing system like RabbitMQ or Kafka would be a better choice.

2. **Persistence**: As mentioned above, the users are stored in-memory. In a production environment, this would not be suitable as it doesn't persist when the application stops and can't be shared across instances.

## Potential Improvements

1. **OOD and DDD**: The solution would be improved by implementing more classes: NFT Collections, Interest Marks, and so on.

2. **Database Integration**: Integrate with a database system to manage users and their preferences.

3. **Persistent Queue**: Implement a persistent queue system to ensure that no event is lost in case of application failure.

4. **Scaling**: Further improvements can be made to allow the application to be more scalable, like implementing a load balancer to distribute traffic and ensuring the service can be horizontally scaled.

5. **Testing**: Add unit tests and integration tests to ensure code quality and correct behavior.

## Running the Application

Before you run the application, ensure you have Node.js installed on your machine.

1. Install dependencies:

```sh
npm install
```

2. Compile the TypeScript code:

```sh
npm run build
```

3. Start the server:

```sh
node src/index.js
```

The server will run on port 3000. You can use a tool like Postman or cURL to interact with the API.

## Endpoints

1. Create a new auction: `POST /auction`

2. Place a bid: `POST /bid`

3. End an auction: `POST /auction/end`

Each endpoint accepts JSON input. Please refer to `src/index.ts` for details on request body parameters.

## Sample output

```
curl -X POST http://localhost:3000/auction -H 'Content-Type: application/json' -d '{
    "name": "all_collections"
}'
```

```
evan@DESKTOP-R2Q750U:~/typescript-experiments/upshot$ npm run build && node src/index.js

> upshot@1.0.0 build
> tsc

Server is running at http://localhost:3000
Sending email to john@do.e : The auction for all_collections has started.
Sending push notification to John Doe : The auction for all_collections has started.
Sending text notification to John Doe : The auction for all_collections has started.
Sending email to jane@do.e : The auction for all_collections has started.
Sending push notification to Jane Doe : The auction for all_collections has started.
Sending email to jack@do.e : The auction for all_collections has started.
```