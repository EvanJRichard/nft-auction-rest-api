import { User } from "./user";

export interface Notification {
    id: string;
    type: string;
    userId: string;
    message: string;
    timestamp: Date;
}

export function createNotification(id: string, type: string, userId: string, message: string): Notification {
    return {
        id,
        type,
        userId,
        message,
        timestamp: new Date(),
    };
}

export function sendEmailNotification(user: User, notification: Notification) {
    // Implement logic here to send the notification email.
    // This is a placeholder and won't actually send an email.
    console.log(`Sending email to ${user.email} : ${notification.message}`);
}

export function sendPushNotification(user: User, notification: Notification) {
    // Implement logic here to send the push notification.
    // This is a placeholder and won't actually send a push notification.
    console.log(`Sending push notification to ${user.name} : ${notification.message}`);
}

export function sendTextNotification(user: User, notification: Notification) {
    // Implement logic here to send the text notification.
    // This is a placeholder and won't actually send a text notification.
    console.log(`Sending text notification to ${user.name} : ${notification.message}`);
}