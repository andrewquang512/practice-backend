const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
