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
    height: {
      type: Number,
    },
    personResponsible: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    foetalHeartRate: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    liquor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    moulding: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    cervix: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    descent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    contraction: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    pulse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    bp: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement',
      },
    ],
    temperature: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Measurement',
    },
    ],
    urine: [{
      volume: {
        type: Number,
      },
      albumin: {
        type: Number,
      },
      glucose: {
        type: Number,
      },
      actetone: {
        type: Number,
      },
      vomitus: {
        type: Boolean,
      },
      recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
      },
    }],
  },
);
patientSchema.plugin(AutoIncrement, { inc_field: 'patientId' });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
