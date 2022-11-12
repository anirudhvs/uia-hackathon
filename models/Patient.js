const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    parity: {
      type: Number,
    },
    alive: {
      type: Number,
    },
    edd: {
      type: Date,
    },
    sb: {
      type: Number,
    },
    nnd: {
      type: Number,
    },
    riskFactors: {
      type: String,
    },
    contractionStartTime: {
      type: Date,
    },
    membraneRuptureTime: {
      type: Date,
    },
    personResponsible: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
);
patientSchema.plugin(AutoIncrement, { inc_field: 'patientId' });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
