/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const cron = require('node-cron');
const Patient = require('../models/Patient');
const { sendMessage } = require('./sms');

const checkAllPatients = () => {
  Patient.find().then((patients) => {
    // console.log(patients);
    const thirtyReadings = ['foetalHeartRate', 'contraction',
      'pulse', 'systolic', 'diastolic', 'temperature'];
    const oneReadings = ['liquor', 'moulding'];
    const fourReadings = ['cervix', 'descent'];
    // const missedAlerts = [];
    // patients.forEach(async (patient) => {
    //   const populatedPatient = await patient.populate('personResponsible foetalHeartRate liquor moulding cervix descent contraction pulse temperature');
    // console.log(populatedPatient);
    patients.forEach(async (patient) => {
      const populatedPatient = await patient.populate('personResponsible foetalHeartRate liquor moulding cervix descent contraction pulse systolic diastolic temperature');
      // console.log(populatedPatient);
      const missedReadings = [];
      for (let i = 0; i < thirtyReadings.length; i++) {
        if (populatedPatient[thirtyReadings[i]].length === 0) {
        //   console.log('Patient has missed 30 readings');
          missedReadings.push(thirtyReadings[i]);
        }
        // check if one hour has passed
        if (populatedPatient[thirtyReadings[i]].length > 0) {
          const lastReadingTime = populatedPatient[thirtyReadings[i]][populatedPatient[thirtyReadings[i]].length - 1].timestamp;
          //   const lastReadingTime = new Date(lastReading.recordedAt);
          const now = new Date();
          //   console.log('LastREADING ', lastReadingTime, now);
          const diff = now.getTime() - lastReadingTime.getTime();
          const diffMinutes = Math.round(diff / 60000);
          if (diffMinutes > 30) {
            missedReadings.push(thirtyReadings[i]);
          }
        }
      }
      for (let i = 0; i < oneReadings.length; i++) {
        if (populatedPatient[oneReadings[i]].length === 0) {
          missedReadings.push(oneReadings[i]);
        }
        if (populatedPatient[oneReadings[i]].length > 0) {
          const lastReadingTime = populatedPatient[oneReadings[i]][populatedPatient[oneReadings[i]].length - 1].timestamp;
          const now = new Date();
          //   console.log('LastREADING ', lastReadingTime, now);
          const diff = now.getTime() - lastReadingTime.getTime();
          const diffMinutes = Math.round(diff / 60000);
          if (diffMinutes > 60) {
            missedReadings.push(oneReadings[i]);
          }
        }
      }
      for (let i = 0; i < fourReadings.length; i++) {
        if (populatedPatient[fourReadings[i]].length === 0) {
          missedReadings.push(fourReadings[i]);
        }
        if (populatedPatient[fourReadings[i]].length > 0) {
          const lastReadingTime = populatedPatient[fourReadings[i]][populatedPatient[fourReadings[i]].length - 1].timestamp;
          const now = new Date();
          //   console.log('LastREADING ', lastReadingTime, now);
          const diff = now.getTime() - lastReadingTime.getTime();
          const diffMinutes = Math.round(diff / 60000);
          if (diffMinutes > 240) {
            missedReadings.push(fourReadings[i]);
          }
        }
      }
      //   console.log('MISSED READINGS', missedReadings);
      //   Check if last message sent time is more than 30 minutes
      const now = new Date();
      //   console.log(populatedPatient.lastMessageSentTime);
      const diff = now.getTime() - populatedPatient.lastMessageSentTime.getTime();
      const diffMinutes = Math.round(diff / 60000);
      //   console.log('Time Since last message', diffMinutes);
      if (diffMinutes >= 30) {
        // console.log('SEND MESSAGE');
        // Send message
        const message = `Patient ${populatedPatient.name} ${populatedPatient.patientId} has missed the following readings: ${missedReadings.join(', ')}`;
        console.log(message);
        const phoneNo = `+91${populatedPatient.personResponsible.phoneNo}`;
        // console.log(phoneNo);
        await sendMessage(message, phoneNo);
        patient.lastMessageSentTime = new Date();
        await patient.save();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
};

const startCron = () => {
  // Run every minute
  cron.schedule('*/5 * * * * *', () => {
    console.log('Running message task');
    // checkAllPatients();
  });
};
module.exports = { startCron, checkAllPatients };
