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
      default: Date.now,
    },
    value: {
      type: String,
      required: true,
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
);

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
