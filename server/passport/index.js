const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../database/models/user");

// When user logs in, saves id to session (req.session.passport.user)
passport.serializeUser((user, done) => {
   console.log("Serialize user called! User: " + user);
   done(null, { _id: user._id });
});

// req.user
passport.deserializeUser((id, done) => {
   console.log("Deserialize user called");
   User.findOne({ _id: id }, "username", (error, user) => {
      if (error) {
         return done(error)
      };

      console.log("Deserialize user called! User: " + user);
      return done(null, user);
   });
});

passport.use(LocalStrategy);

module.exports = passport;
