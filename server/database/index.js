// Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connect to medule-login Mongo database
const url = "mongodb://localhost:27017/medule-login";

mongoose.connect(url).then(
   () => {
      console.log("Connected to Mongo");
   },
   error => {
      console.log("Error connecting to Mongo");
      console.log(error);
   }
);

module.exports = mongoose.connection;