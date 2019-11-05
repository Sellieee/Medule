var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
   practitioner: {
      id: { type: String, required: true },
      name: String
   },
   patient: {
      id: { type: String, required: true },
      username: String
   },
   dateAndTime: { type: Date, required: true },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
