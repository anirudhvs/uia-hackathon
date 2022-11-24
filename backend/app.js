const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const passport = require('passport');
const redisClient = require('./utils/redis');
// const { sendMessage } = require('./utils/sms');

// Routes
const checkAuth = require('./utils/checkAuth');
const authRouter = require('./routes/auth');
const patientRouter = require('./routes/patient');
const viewsRouter = require('./routes/views');

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

const app = express();

app.use(logger('dev'));

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true,
}));

app.use(session({
  store: new redisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport')(passport);

app.use('/auth', authRouter);
app.use('/patient', checkAuth, patientRouter);

app.get('/status', (req, res) => {
  res.send('OK');
});

// app.get('/sendsms', (req, res) => {
//   const { message, receiver } = req.body;
//   sendMessage(message, receiver);
//   res.send({ message: 'SMS sent' });
// });

app.use('/', viewsRouter);

module.exports = app;
