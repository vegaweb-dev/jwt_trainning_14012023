const mongoose = require('mongoose');

const connection = mongoose
  .connect('mongodb://localhost/sabado14enero')
  .then('connected to database')
  .catch((err) => {
    console.error(err);
  });
mongoose.exports = connection;
