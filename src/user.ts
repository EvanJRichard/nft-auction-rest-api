export interface NotificationPreferences {
    email: boolean;
    inApp: boolean;
    sms: boolean;
    // other types of notifications
}

export interface User {
    id: string;
    name: string;
    email: string;
    notificationPreferences: NotificationPreferences;
    interestedCollections: string[]; // List of collection IDs
    // add other necessary fields, e.g. accountBalance, etc.
}

export function createUser(id: string, name: string, email: string, notificationPreferences: NotificationPreferences, interestedCollections: string[]): User {
    return { id, name, email, notificationPreferences, interestedCollections };
}

export function getUser(id: string): User {
    // Placeholder for fetching user from database.
    // This is a placeholder and won't actually fetch a user from database.
    // This also assumes that all users are interested in all collections, and want all types of notifications
    return createUser(
        id,
        "John Doe",
        "john@do.e",
        { email: true, inApp: true, sms: true },
        ["all_collections"]
    );
}

export function getAllUsers(): User[] {
    const userZero = getUser("0");
    const userOne = createUser("1", "Jane Doe", "jane@do.e", { email: true, inApp: true, sms: false }, ["all_collections"])
    const userTwo = createUser("2", "Jack Doe", "jack@do.e", { email: true, inApp: false, sms: false }, ["all_collections"])
    return [userZero, userOne, userTwo];
}