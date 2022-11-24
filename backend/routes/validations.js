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
  // console.log('PID', patientId);
  let risks = [];
  let suggestions = [];
  try {
    const patient = await Patient.findById(patientId).populate('foetalHeartRate liquor moulding cervix descent contraction pulse temperature systolic diastolic');
    // console.log('PATIENT', patient);
    if (!patient) {
      return { risks, suggestions, patient };
    }
    if (patient.foetalHeartRate.length > 0) {
      // console.log('FHR', parseInt(patient.foetalHeartRate.slice(-1)[0].value));
      if (parseInt(patient.foetalHeartRate.slice(-1)[0].value) > 160) {
        risks.push('Foetal heart rate is high');
        suggestions.push('Transfuse fluid');
        suggestions.push('Oxygen Supplementation');
        suggestions.push('If no positive response observed refer urgently to referral unit');
      } else if (parseInt(patient.foetalHeartRate.slice(-1)[0].value) < 120) {
        risks.push('Foetal heart rate is low');
        suggestions.push('Transfuse fluid');
        suggestions.push('Oxygen Supplementation');
        suggestions.push('If no positive response observed refer urgently to referral unit');
      }
    }
    if (patient.liquor.length > 0) {
      if (patient.liquor.slice(-1)[0].value === 'M') {
        risks.push('Miconium detected');
        suggestions.push('Take care of infection in baby after birth');
      }
      if (patient.liquor.slice(-1)[0].value === 'M1'
      || patient.liquor.slice(-1)[0].value === 'M2'
      || patient.liquor.slice(-1)[0].value === 'M3') {
        risks.push('Dangerous Levels of Miconium detected');
        suggestions.push('Move the patient to referral unit');
      }
      if (patient.liquor.length >= 3) {
        if (patient.liquor.slice(-3)[0].value === 'I' && patient.liquor.slice(-2)[0].value === 'I' && patient.liquor.slice(-1)[0].value === 'I') {
          risks.push('Intact detected 3 times in a row');
        }
      }
    }
    if (patient.moulding.length > 0) {
      if (patient.moulding.slice(-1)[0].value === '3') {
        risks.push('High moulding detected. Refer to facility.');
        suggestions('Refer to facility as very high moulding detected. Possible vaginal obstruction.');
      }
      if (patient.moulding.slice(-1)[0].value === '2') {
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

      if (rate < 0.2) {
        suggestions.push('Call doctor immediately');
        risks.push('Very low rate of cervical dilation');
      } else if (rate < 1) {
        suggestions.push('Monitor patient closely');
        risks.push('Low rate of cervical dilation');
      }
    }
    if (patient.systolic.length > 0) {
      if (parseInt(patient.systolic.slice(-1)[0].value) > 140) {
        risks.push('High systolic blood pressure');
      }
      if (parseInt(patient.systolic.slice(-1)[0].value) < 110) {
        risks.push('Low systolic blood pressure');
      }
    }
    if (patient.diastolic.length > 0) {
      if (parseInt(patient.diastolic.slice(-1)[0].value) > 80) {
        risks.push('High diastolic blood pressure');
      }
      if (parseInt(patient.diastolic.slice(-1)[0].value) < 60) {
        risks.push('Low diastolic blood pressure');
      }
    }
    if (patient.temperature.length > 0) {
      if (parseInt(patient.temperature.slice(-1)[0].value) > 37) {
        risks.push('High temperature');
      }
      if (parseInt(patient.temperature.slice(-1)[0].value) < 36) {
        risks.push('Low temperature');
      }
    }
    if (patient.pulse.length > 0) {
      if (parseInt(patient.pulse.slice(-1)[0].value) > 100) {
        risks.push('High pulse');
      }
      if (parseInt(patient.pulse.slice(-1)[0].value) < 60) {
        risks.push('Low pulse');
      }
    }
    return { risks, suggestions, patient };
  } catch (err) {
    console.log(err);
    return { risks, suggestions, patient: null };
  }
};

module.exports = {
  ageCheck,
  validateNewPatient,
  validatePatient,
};
