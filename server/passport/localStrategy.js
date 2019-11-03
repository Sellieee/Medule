const User = require("../database/models/user");
const LocalStrategy = require("passport-local").Strategy;

const Strategy = new LocalStrategy({
   usernameField: "username"
},
   function (username, password, done) {
      // Searching for the username on the database
      User.findOne({ username: username }, (error, user) => {
         if (error) {
            return done(error)
         };

         // Return an error if the username is not found on the database
         if (!user) {
            return done(null, false, { message: "Incorrect username" });
         }

         // Return an error if the hashed password is not found on the database
         if (!user.checkPassword(password)) {
            return done(null, false, { message: "Incorrect password" });
         }
         return done(null, user);
      });
   }
);

module.exports = Strategy;