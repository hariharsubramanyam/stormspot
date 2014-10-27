// Lead Author: Harihar
// This file contains constants to use throughout the application.

/**
 * This is the URL of the MongoDB database when the server is run locally. 
 * If it's run on OpenShift, then the URL may be different.
 */
module.exports.MONGO_URL = "mongodb://localhost/stormspot";

/**
 * This is the salt used when hashing passwords.
 */
module.exports.SALT = 10;
/**
 * This is the radius in which subscribers will receive
 * alerts of nearby storms.
 */
module.exports.MAX_RADIUS = 50;
