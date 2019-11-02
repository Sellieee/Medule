const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

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
   };
};
