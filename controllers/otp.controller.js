const nodemailer = require('nodemailer');

// In-memory storage for OTPs. In production, use a database.
const otpStorage = {};

// Function to generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kovurivaishnavi30@gmail.com',
    pass: 'Sai123$$$'
  }
});

// Function to send OTP
async function sendOTP(req, res) {
  const email = req.body.email;
  const otp = generateOTP();

  let mailOptions = {
    from: 'kovurivaishnavi30@gmail.com',
    to: email,
    subject: 'Thankyou for your registration',
    text: `Your OTP code is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    otpStorage[email] = otp; // Store OTP
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    res.status(500).send('Error sending OTP');
  }
}

// Function to verify OTP
function verifyOTP(req, res) {
  const email = req.body.email;
  const otp = req.body.otp;

  if (otpStorage[email] && otpStorage[email] === otp) {
    delete otpStorage[email]; // OTP verified, remove it from storage
    res.status(200).send('OTP verified successfully');
  } else {
    res.status(400).send('Invalid OTP');
  }
}

module.exports = {
  sendOTP,
  verifyOTP
};
