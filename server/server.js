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

app.use(cors());

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
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



// Start the server
app.listen(PORT, () => {
   console.log(`App listening on port: ${PORT}`)
});
