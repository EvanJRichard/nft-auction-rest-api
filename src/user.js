"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUser = exports.createUser = void 0;
function createUser(id, name, email, notificationPreferences, interestedCollections) {
    return { id, name, email, notificationPreferences, interestedCollections };
}
exports.createUser = createUser;
function getUser(id) {
    // Placeholder for fetching user from database.
    // This is a placeholder and won't actually fetch a user from database.
    // This also assumes that all users are interested in all collections, and want all types of notifications
    return createUser(id, "John Doe", "john@do.e", { email: true, inApp: true, sms: true }, ["all_collections"]);
}
exports.getUser = getUser;
function getAllUsers() {
    const userZero = getUser("0");
    const userOne = createUser("1", "Jane Doe", "jane@do.e", { email: true, inApp: true, sms: false }, ["all_collections"]);
    const userTwo = createUser("2", "Jack Doe", "jack@do.e", { email: true, inApp: false, sms: false }, ["all_collections"]);
    return [userZero, userOne, userTwo];
}
exports.getAllUsers = getAllUsers;
