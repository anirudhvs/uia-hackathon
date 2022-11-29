/* eslint-disable no-underscore-dangle */
const express = require('express');
const Patient = require('../models/Patient');
const { validatePatient } = require('./validations');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) { res.redirect('/doctorsDashboard'); }
  res.render('index');
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) { res.redirect('/doctorsDashboard'); }
  res.render('login');
});

module.exports = router;

router.get('/doctorsDashboard', async (req, res) => {
  let filteredPatients = [];
  let totalPatients = 0;
  let critical = 0;
  let monitor = 0;
  try {
    const patients = await Patient.find();
    // res.json(patients);
    // console.log(patients);
    totalPatients = patients.length;
    // filter necessary fields
    filteredPatients = await Promise.all(patients.map(async (patient) => {
      const { risks, suggestions } = await validatePatient(patient._id.toString());
      console.log('RISK', risks);
      let status = '';
      if (risks.length > 2 && suggestions.length > 2) {
        status = 'High Risk';
        critical += 1;
      } else if (risks.length > 0) {
        status = 'Keep Monitoring';
        monitor += 1;
      } else {
        status = 'Progessing Normally';
      }
      const {
        patientId, name, _id,
      } = patient;
      const riskLength = risks.length;
      return {
        patientId, name, status, _id, riskLength,
      };
    }));
  } catch (err) {
    res.status(500).json({ message: 'Error getting patients' });
  }
  // console.log('FILTERED PATIENTS', filteredPatients);
  // sort patients by risk level
  filteredPatients.sort((a, b) => {
    if (a.riskLength > b.riskLength) {
      return -1;
    }
    if (a.riskLength < b.riskLength) {
      return 1;
    }
    return 0;
  });
  const normal = totalPatients - critical - monitor;

  res.render('doctorsDashboard', {
    patients: filteredPatients, totalPatients, normal, critical, monitor,
  });
});

router.get('/register', (req, res) => {
  if (req.isAuthenticated()) { res.redirect('/doctorsDashboard'); }
  res.render('register');
});

router.get('/addpatient', (req, res) => {
  res.render('addPatient', { data: {} });
});

router.get('/digi-alert', (req, res) => {
  res.render('digi-alert', { data: {} });
});

router.get('/graph', (req, res) => {
  res.render('graph');
});

router.get('/index2', (req, res) => {
  res.render('index2');
});

router.get('/measurements/:patientid', (req, res) => {
  const { patientid } = req.params;
  res.render('measurements', { data: {}, patientid });
});

router.get('/digialert', (req, res) => {
  res.render('digialert', { data: {} });
});
router.get('/graph/:patientId', async (req, res) => {
  const { patientId } = req.params;
  // console.log(patientId);
  try {
    const patient = await Patient.findById(patientId);
    const populatedPatient = await patient.populate('foetalHeartRate liquor moulding cervix descent contraction pulse temperature systolic diastolic');
    const { risks, suggestions } = await validatePatient(patientId);
    // console.log(populatedPatient.name);
    console.log(risks, suggestions);
    let alertCross = false;
    let actionCross = false;
    if (risks.includes('Low rate of cervical dilation')) {
      alertCross = true;
    }
    if (risks.includes('Very low rate of cervical dilation')) {
      actionCross = true;
    }
    res.render('graph', {
      data: {}, patient: populatedPatient, risks, suggestions, alertCross, actionCross,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting patients' });
  }
});

module.exports = router;
