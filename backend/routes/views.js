const express = require('express');
const Patient = require('../models/Patient');

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
  try {
    const patients = await Patient.find().populate('personResponsible');
    // res.json(patients);
    console.log(patients);
    totalPatients = patients.length;
    // filter necessary fields
    filteredPatients = patients.map((patient) => {
      const {
        patientId, name, status, _id,
      } = patient;
      return {
        patientId, name, status, _id,
      };
    });
  } catch (err) {
    res.status(500).json({ message: 'Error getting patients' });
  }
  res.render('doctorsDashboard', { patients: filteredPatients, totalPatients });
});
module.exports = router;

router.get('/register', (req, res) => {
  if (req.isAuthenticated()) { res.redirect('/doctorsDashboard'); }
  res.render('register');
});

router.get('/addpatient', (req, res) => {
  res.render('addPatient', { data: {} });
});

<<<<<<< HEAD
router.get('/digi-alert', (req, res) => {
  res.render('digi-alert', { data: {} });
});

=======
// router.get('/addReadings', (req, res) => {
//   res.render('addReadings', { data: {} });
// });
// module.exports = router;

router.get('/measurements', (req, res) => {
  res.render('measurements', { data: {} });
});

router.get('/digialert', (req, res) => {
  res.render('digialert', { data: {} });
});
>>>>>>> b1d55116d3dca410b99ec3c03f1122c66ec3d44f
router.get('/graph', (req, res)=>{
  res.render('graph')
})

module.exports = router;
