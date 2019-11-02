const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.Promise = Promise;

// Define userSchema
const userSchema = new Schema({
   username: { type: String, unique: false, required: false },
   password: { type: String, unique: false, required: false }
});

// Schema methods
userSchema.methods = {
   checkPassword: function (inputPassword) {
      return bcrypt.compareSync(inputPassword, this.password)
   },
   hashPassword: plainTextPassword => {
      return bcrypt.hashSync(plainTextPassword, 10)
   }
};

// Hooks to hash the password before it is saved in the database
userSchema.pre("save", function (next) {
   if (!this.password) {
      console.log("models/user.js ---------- No Password Provided ----------");
      next()
   }
   else {
      console.log("models/user.js hashPassword in pre save");
      this.password = this.hashPassword(this.password);
      next();
   };
});

const User = mongoose.model("User", userSchema);
module.exports = User;