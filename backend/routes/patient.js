/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
// const { Point } = require('@influxdata/influxdb-client');
const Patient = require('../models/Patient');
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
  } = req.body;
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
    });
    await newPatient.save();
    res.status(201).json({
      message: 'Patient created',
      patient: newPatient,
    });
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

module.exports = router;
