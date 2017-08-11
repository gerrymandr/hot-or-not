const mongoose = require('mongoose');

const districtSchema = mongoose.Schema({
  filename: String,
  hot: Number,
  not: Number
});

module.exports = mongoose.model('District', districtSchema);
