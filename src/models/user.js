const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
        type: String,
        required: true,
        lowercase: false,
  },

});

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
