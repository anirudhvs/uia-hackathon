/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const Patient = require('../models/Patient');

const ageCheck = (age) => {
  if (age < 0) {
    return false;
  }
  if (age > 65) {
    return false;
  }
  return true;
};

const validateNewPatient = (req) => {
  const errors = [];
  let {
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
    height,
  } = req.body;
  age = parseInt(age, 10);
  parity = parseInt(parity, 10);
  alive = parseInt(alive, 10);
  sb = parseInt(sb, 10);
  nnd = parseInt(nnd, 10);
  height = parseInt(height, 10);
  if (age > 65 || age < 15) {
    errors.push('Age must be between 15 and 65');
  }
  if (parity > 10 || parity < 0) {
    errors.push('Parity must be between 0 and 10');
  }
  if (alive < 0) {
    errors.push('Alive must be greater than 0');
  }
  if (sb < 0) {
    errors.push('SB must be greater than 0');
  }
  if (nnd < 0) {
    errors.push('NND must be greater than 0');
  }
  if (height < 150 || height > 220) {
    errors.push('Height must be greater than 150 and less than 220');
  }
  membraneRuptureTime = new Date(membraneRuptureTime);
  contractionStartTime = new Date(contractionStartTime);
  if (membraneRuptureTime > Date.now()) {
    errors.push('Membrane rupture time must be in the past');
  }
  if (contractionStartTime > Date.now()) {
    errors.push('Contraction start time must be in the past');
  }

  return errors;
};

const validatePatient = async (patientId) => {
  console.log('PID', patientId);
  let risks = [];
  let suggestions = [];
  try {
    const patient = await Patient.findById(patientId).populate('foetalHeartRate liquor moulding cervix descent contraction pulse bp temperature');
    // console.log('PATIENT', patient);
    if (!patient) {
      return { risks, suggestions, patient };
    }
    if (patient.foetalHeartRate.length > 0) {
      if (parseInt(patient.foetalHeartRate.slice(-1)[0]) > 160) {
        risks.push('Foetal heart rate is high');
      } else if (parseInt(patient.foetalHeartRate.slice(-1)[0]) < 120) {
        risks.push('Foetal heart rate is low');
      }
    }
    if (patient.liquor.length > 0) {
      if (patient.liquor.slice(-1)[0] === 'M') {
        risks.push('Miconium detected');
      }
      if (patient.liquor.length >= 3) {
        if (patient.liquor.slice(-3)[0] === 'I' && patient.liquor.slice(-2)[0] === 'I' && patient.liquor.slice(-1)[0] === 'I') {
          risks.push('Intact detected 3 times in a row');
        }
      }
    }
    if (patient.moulding.length > 0) {
      if (patient.moulding.slice(-1)[0] === '3') {
        risks.push('High moulding detected. Refer to facility.');
      }
      if (patient.moulding.slice(-1)[0] === '2') {
        risks.push('Medium moulding detected. Keep monitoring.');
      }
    }
    if (patient.cervix.length > 0) {
      // calculate rate of cervical dilation
      // if rate is > 1cm/hour, suggest to call doctor
      // if rate is > 2cm/hour, suggest to call doctor immediately
      let recent = patient.cervix.slice(-1)[0];
      let prev = patient.cervix.slice(-2)[0];
      let recentDilation = parseInt(recent.value, 10);
      let prevDilation = parseInt(prev.value, 10);
      //   console.log(recent.timestamp - prev.timestamp);
      let rate = (recentDilation - prevDilation) / ((recent.timestamp - prev.timestamp) / 3600000);
      if (rate < 1) {
        suggestions.push('Call doctor immediately');
        risks.push('High rate of cervical dilation');
      }
    }
    // if (patient.descent.length > 0) {

    // }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  ageCheck,
  validateNewPatient,
  validatePatient,
};
