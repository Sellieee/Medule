"use strict";

require("dotenv-safe").load();

const config = {};
config.secret = process.env.APP_SECRET || "keyboard cat";

config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// MongoDB Connection String
// config.mongoUrl = process.env.MONGO_URL;

module.exports = config;