const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema(
  {
    measurementName: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },

  },
);

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
