"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTextNotification = exports.sendPushNotification = exports.sendEmailNotification = exports.createNotification = void 0;
function createNotification(id, type, userId, message) {
    return {
        id,
        type,
        userId,
        message,
        timestamp: new Date(),
    };
}
exports.createNotification = createNotification;
function sendEmailNotification(user, notification) {
    // Implement logic here to send the notification email.
    // This is a placeholder and won't actually send an email.
    console.log(`Sending email to ${user.email} : ${notification.message}`);
}
exports.sendEmailNotification = sendEmailNotification;
function sendPushNotification(user, notification) {
    // Implement logic here to send the push notification.
    // This is a placeholder and won't actually send a push notification.
    console.log(`Sending push notification to ${user.name} : ${notification.message}`);
}
exports.sendPushNotification = sendPushNotification;
function sendTextNotification(user, notification) {
    // Implement logic here to send the text notification.
    // This is a placeholder and won't actually send a text notification.
    console.log(`Sending text notification to ${user.name} : ${notification.message}`);
}
exports.sendTextNotification = sendTextNotification;
