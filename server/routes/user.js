const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

router.post("/user/signup", (req, res) => {
   console.log("User sign-up", req.body);
   const { username, password } = req.body;

   // Validation check
   User.findOne({ username: username }, (error, user) => {
      if (error) {
         console.log("User.js post error: " + error);
      }
      else if (user) {
         res.json({
            error: `Sorry, that username: ${username} already exists`
         });
      }
      else {
         const newUser = new User({
            username: username,
            password: password
         });
         newUser.save((error, savedUser) => {
            if (error)
               return res.json(error)
            res.json(savedUser);
         });
      };
   });
});

router.post("/login", function (req, res, next) {
   console.log("Routes/user/js, login, req.body: " + req.body);
   next();
},
   passport.authenticate("local"), (req, res) => {
      console.log("Logged in: " + req.user);
      var userInfo = {
         username: req.user.username
      };
      res.send(userInfo);
   }
);

router.get("/", (req, res, next) => {
   console.log("user: " + req.user);
   if (req.user) {
      res.json({ user: req.user });
   }
   else {
      res.json({ user: null });
   };
});

router.post("/logout", (req, res) => {
   if (req.user) {
      req.logout();
      res.send({ msg: "Loggin out" });
   }
   else {
      res.send({ msg: "No user to log out" });
   };
});

module.exports = router;