/* eslint-disable func-names */
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  })));

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser(async (email, done) => {
    try {
      const user = await User.findOne({ email });
      if (user) {
        done(null, { email: user.email, username: user.username, userType: user.userType });
      }
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  });
};
