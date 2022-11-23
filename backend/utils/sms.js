const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (message, receiver, sender = fromNumber) => {
  try {
    await client.messages.create({
      body: message,
      from: sender,
      to: receiver,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
