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

   function sendNotifications(appointments) {
      const client = new Twilio(config.twilioAccountSid, config.twilioAuthToken);
      appointments.forEach(function (appointment) {

         // Create options to send the message
         const options = {
            to: `+ ${appointment.phoneNumber}`,
            from: config.twilioPhoneNumber,
            body: `Hi ${appointment.name}. Just a reminder that you have a doctor's appointment coming up.`,
         };

         // Send the message
         client.messages.create(options, function (error, response) {
            if (error) {
               console.log(error);
            } else {
               // Log the last few digits of a phone number
               let masked = appointment.phoneNumber.substr(0, appointment.phoneNumber.length - 5);
               masked += "*****";
               console.log(`Message sent to ${masked}.`);
            };
         });
      });

      // Indicate all messages queued for delivery
      if (callback) {
         callback.call();
      };
   };
};

const Smsreminder = mongoose.model("smsreminder", SmsreminderSchema);
module.exports = Smsreminder;