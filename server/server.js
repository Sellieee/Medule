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

// Routes
const user = require("./routes/user");
app.use("/user", user);

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Sessions
app.use(session({
   secret: "pikachu", // Needed to pick any word to make the hash secure
   store: new MongoStore({ mongooseConnection: dbConnection }),
   resave: false,
   saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


// Start the server
app.listen(PORT, () => {
   console.log(`App listening on port: ${PORT}`)
});
