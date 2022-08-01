const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let destinations = new Schema({
  term: {
    type: String,
  },
  uid: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  type: {
    type: String,
  },
  state: {
    type: String,
  },
});

module.exports = mongoose.model("destination", destinations);
