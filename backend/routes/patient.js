/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
// const { Point } = require('@influxdata/influxdb-client');
const Patient = require('../models/Patient');
const Measurement = require('../models/Measurement');
const { validateNewPatient, validatePatient } = require('./validations');
// const influxDB = require('../utils/influxdb');

router.post('/add', async (req, res) => {
  const {
    name,
    age,
    parity,
    alive,
    edd,
    sb,
    nnd,
    riskFactors,
    contractionStartTime,
    membraneRuptureTime,
    height,
  } = req.body;
  console.log(req.body);
  const data = req.body;
  // Validate the entered values
  if (!name || !age || !parity || !alive || !edd || !sb || !nnd || !riskFactors
    || !contractionStartTime || !membraneRuptureTime || !height) {
    res.status(400).json({ message: 'Please enter all fields' });
    // res.render('addPatient', { data,  });
    return;
  }

  const errors = validateNewPatient(req);
  if (errors.length > 0) {
    // res.status(400).json({ message: errors });
    res.render('addPatient', { data, errors });
    return;
  }
  //   Create new patient
  try {
    const newPatient = new Patient({
      name,
      age,
      parity,
      alive,
      edd,
      sb,
      nnd,
      riskFactors,
      contractionStartTime,
      membraneRuptureTime,
      height,
      personResponsible: req.user._id,
    });
    await newPatient.save();
    // res.status(201).json({
    //   message: 'Patient created',
    //   patient: newPatient.populate('foetalHeartRate'),
    // });
    res.redirect('/doctorDashboard');
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error creating patient' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const patients = await Patient.find().populate('personResponsible');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error getting patients' });
  }
});

router.post('/addmeasurement', async (req, res) => {
  const { measurementName, value, patientId } = req.body;
  if (!measurementName || (!value && measurementName !== 'urine')) {
    res.status(400).json({ message: 'Please enter all fields' });
    return;
  }

  const allowedMeasurements = [
    'foetalHeartRate',
    'liquor',
    'moulding',
    'cervix',
    'descent',
    'contraction',
    'pulse',
    'bp',
    'urine',
  ];

  if (!allowedMeasurements.includes(measurementName)) {
    res.status(400).json({ message: 'Invalid measurement name' });
    return;
  }
  try {
    const patient = await Patient.findById(patientId);
    if (measurementName === 'urine') {
      const {
        volume, albumin, glucose, acetone, voimitus,
      } = req.body;
      patient.urine.push({
        volume, albumin, glucose, acetone, voimitus, recordedBy: req.user._id,
      });
    } else {
      console.log(measurementName, value, req.user._id);
      const measurement = new Measurement({
        measurementName,
        value,
        recordedBy: req.user._id,
      });
      await measurement.save();
      patient[measurementName].push(measurement._id);
    }

    await patient.save();
    res.status(201).json({
      message: 'Measurement added',
      patient,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error adding measurement' });
  }
});

// router.post('/insert', async (req, res) => {
//   const { patientId, data } = req.body;
//   const writeApi = influxDB.getWriteApi(
//     process.env.DOCKER_INFLUXDB_INIT_ORG,
//     process.env.DOCKER_INFLUXDB_INIT_BUCKET,
//   );
//   writeApi.useDefaultTags({ patientId });
//   data.forEach((d) => {
//     const point = new Point(d.measurement);
//     // point.timestamp(d.timestamp);
//     point.floatField(d.field, d.value);
//     writeApi.writePoint(point);
//   });
//   writeApi.close().then(() => {
//     console.log('Success');
//   }).catch((err) => {
//     console.log(err);
//   });
//   res.status(201).json({ message: 'Data inserted' });
// });

// router.get('/query', async (req, res) => {
//   // const { patientId, query } = req.body;
//   const query = `from(bucket: "partogram") |> range(start: 0)
//   |> filter(fn: (r) => r._measurement == "reading")`;
//   const queryApi = influxDB.getQueryApi(process.env.DOCKER_INFLUXDB_INIT_ORG);
//   const rows = [];
//   queryApi.queryRows(query, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       console.log(o);
//       o.time = o._time;
//       delete o._time;
//       rows.push(o);
//       console.log(rows);
//     },
//     error(error) {
//       console.log(error);
//       console.log('\\nFinished ERROR');
//       res.status(500).json({ message: 'Error getting data' });
//     },
//     complete() {
//       console.log('\\nFinished SUCCESS');
//       return res.status(200).json(rows);
//     },
//   });
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id).populate('personResponsible');
//     res.json(patient);
//   } catch (err) {
//     res.status(500).json({ message: 'Error getting patient' });
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    // const patient = await Patient.findById(req.params.id).populate('personResponsible liquor');
    validatePatient(req.params.id);
    // res.json(patient);
    res.send('ok');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting patient' });
  }
});

module.exports = router;
