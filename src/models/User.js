const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = model('User', userSchema);
