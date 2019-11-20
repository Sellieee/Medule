// Npm packages
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const path = require('path');
const mongoose = require("mongoose");

app.use(cors());

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/medule-login");
// Sessions
// 1. Generates unique session id
// 2. Savves session id as cookie and passes back to browser
// 3. Creates empty session object
// 4. Saves session object to database
app.use(session({
   secret: "pikachu", // Needed to pick any word to make the hash secure
   store: new MongoStore({ mongooseConnection: dbConnection }),

   // Won't resave to session store unless session has been modified
   resave: false,

   // Unmodified session = false
   saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


const user = require("./routes/user");
app.use("/user", user);

if (process.env.NODE_ENV === "production") {
   console.log("RUNNING IN PRODUCTION MODE")
   app.use(express.static(path.resolve(__dirname, '../client/build')));
   app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
   })
}

// Start the server
app.listen(PORT, () => {
   console.log(`App listening on port: ${PORT}`)
});
