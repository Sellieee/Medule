"use strict";

const express = require("express");
const momentTimeZone = require("moment-timezone");
const moment = require("moment");
const Smsreminder = require("../database/models/smsreminder");
const router = new express.Router();

const getTimeZones = function () {
   return momentTimeZone.tz.names();
};

// GET appointments
router.get("/appointments", function (req, res, next) {
   Smsreminder.find()
      .then(function (appointments) {
         res.render("appointments/index", { appointments: appointments });
      });
});

// GET create appointments
router.get("/create", function (req, res, next) {
   res.render("appointments/create", {
      timeZones: getTimeZones(),
      appointment: new Smsreminder({
         name: "",
         phoneNumber: "",
         notification: "",
         timeZone: "",
         time: ""
      })
   });
});

// POST Appointments
router.post("/appointments", function (req, res, next) {
   const name = req.body.name;
   const phoneNumber = req.body.phoneNumber;
   const notification = req.body.notification;
   const timeZone = req.body.timeZone;
   const time = moment(req.body.time, "MM-DD-YYYY hh:mma");

   const appointment = new Smsreminder({
      name: name,
      phoneNumber: phoneNumber,
      notification: notification,
      timeZone: timeZone,
      time: time
   });

   appointment.save()
      .then(function () {
         res.redirect("/appointments");
      });
});

// GET edit appointments
router.get("/appointments:id/edit", function (req, res, next) {
   const id = req.params.id;
   Smsreminder.findOne({ _id: id })
      .then(function (appointment) {
         res.render("appointments/edit", {
            timeZones: getTimeZones(),
            appointment: appointment
         });
      });
});

// POST edit appointments
router.get("/appointments:id/edit", function (req, res, next) {
   const id = req.params.id;
   const name = req.body.name;
   const phoneNumber = req.body.phoneNumber;
   const notification = req.body.notification;
   const timeZone = req.body.timeZone;
   const time = moment(req.body.time, "MM-DD-YYYY hh:mma");

   Smsreminder.findOne({ _id: id })
      .then(function (appointment) {
         appointment.name = name;
         appointment.phoneNumber = phoneNumber;
         appointment.notification = notification;
         appointment.timeZone = timeZone;
         appointment.time = time;

         appointment.save()
            .then(function () {
               res.redirect("appointments");
            });
      });
});;

// POST delete appointments 
router.post("/appointments:id/delete", function (req, res, next) {
   const id = req.params.id;

   Smsreminder.remove({ _id: id })
      .then(function () {
         res.redirect("/appointments");
      });
});

module.exports = router;