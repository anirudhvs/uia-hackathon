const express = require('express');

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

router.get('/doctorsDashboard', (req, res) => {
  res.render('doctorsDashboard');
});
module.exports = router;

router.get('/register', (req, res) => {
  if (req.isAuthenticated()) { res.redirect('/doctorsDashboard'); }
  res.render('register');
});

router.get('/addpatient', (req, res) => {
  res.render('addPatient', { data: {} });
});

// router.get('/addReadings', (req, res) => {
//   res.render('addReadings', { data: {} });
// });
// module.exports = router;

router.get('/measurements', (req, res) => {
  res.render('measurements', { data: {} });
});
module.exports = router;
