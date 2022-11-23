const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res)=> {
  res.render('login')
})
module.exports = router;


router.get('/doctorsDashboard', (req, res)=> {
  res.render('doctorsDashboard')
})
module.exports = router;

router.get('/register', (req, res)=> {
  res.render('register')
})
module.exports = router;


router.get('/addPatient', (req, res)=> {
  res.render('addPatient')
})


router.get('/form', (req, res)=> {
  res.render('form')
})

router.get('/language', (req, res)=> {
  res.render('language')
})




module.exports = router;




