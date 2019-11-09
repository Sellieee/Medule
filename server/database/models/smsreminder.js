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

SmsreminderSchema.methods.requiresNotification = function (date) {
   return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
      .diff(moment(date).utc()))
      .asMinutes()) === this.notification;
};

SmsreminderSchema.statics.sendNotifications = function (callback) {
   const searchDate = new Date();
   Smsreminder.find().then(function (appointments) {
      appointments = appointments.filter(function (appointment) {
         return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
         sendNotifications(appointments);
      };
   });

   @param { array } appointments;
}