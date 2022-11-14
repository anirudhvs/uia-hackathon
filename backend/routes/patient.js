const express = require('express');

const router = express.Router();
const Patient = require('../models/Patient');

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

router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('personResponsible');
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error getting patient' });
  }
});

module.exports = router;
