/**
 * This file defines a Carrier, which we can use in our Mongoose schemas.
 *
 * A Carrier is simply a String which takes on of the following values:
 *
 * "message.alltel.com", "txt.att.net", "myboostmobile.com", "myblue.com",
 * "einsteinmms.com", "messaging.nextel.com", "pm.sprint.com", "tmomail.com",
 * "mms.uscc.net", "vtext.com", "vmobl.com"
 */

 //Define constants for each of the carriers
 var ALLTEL = "message.alltel.com";
 var ATT = "txt.att.net";
 var BOOST = "myboostmobile.come";
 var CENTENNIAL = "myblue.com";
 var EINSTEIN = "einstenmms.com";
 var NEXTEL = "messaging.nextel.com";
 var SPRINT = "pm.sprint.com";
 var TMOBILE = "tmomail.com";
 var USCELLULAR = "mms.uscc.net";
 var VERIZON = "vtext.com";
 var VIRGIN = "vmobl.com";

 // Export the constant so the rest of the app can use them.
 module.exports.ALLTEL = ALLTEL;
 module.exports.ATT = ATT;
 module.exports.BOOST = BOOST;
 module.exports.CENTENNIAL = CENTENNIAL;
 module.exports.EINSTEIN = EINSTEIN;
 module.exports.NEXTEL = NEXTEL;
 module.exports.SPRINT = SPRINT;
 module.exports.TMOBILE = TMOBILE;
 module.exports.USCELLULAR = USCELLULAR;
 module.exports.VERIZON = VERIZON;
 module.exports.VIRGIN = VIRGIN;

 //Define the carrier to be a String in the given enum
 module.exports.Carrier = {type: String, enum: [ALLTEL, ATT, BOOST, CENTENNIAL,
    EINSTEIN, NEXTEL, SPRINT, TMOBILE, USCELLULAR, VERIZON, VIRGIN]};