'use strict';

const mongoose = require("mongoose");
const moment = require("moment");
const config = require("../config");
const Twilio = require("twilio");

const SmsreminderSchema = new mongoose.Schema({
   name: String,
   phoneNumber: String,
   notification: Number,
   timeZone: String,
   time: { type: Date, index: true },
});