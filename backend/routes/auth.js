const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const {
    username, password, email, userType, hospitalName,
  } = req.body;
  console.log("pass",password)
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: 'User already exists' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      // console.log("passowrd", password)

      const newUser = new User({
        username,
        password: hash,
        email,
        userType,
        hospitalName,
      });
      await newUser.save();
      res.status(201).json({ message: 'User created' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log(user.role);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).json({ message: 'User logged in' });
    });
  })(req, res, next);
});

router.get('/user', async (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'User logged out' });
  });
});

module.exports = router;
