const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail'); // Update the path to your sendEmail module

// Define the test route
router.post('/test-email', async (req, res) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: 'muralisudireddy0@gmail.com', // Replace with your email for testing
    subject: 'Test Email',
    text: 'This is a test email from your deployed environment!',
  };

  try {
    await sendEmail(mailOptions);
    res.status(200).send('Test email sent successfully!');
  } catch (error) {
    res.status(500).send(`Error sending test email: ${error.message}`);
  }
});

module.exports = router;
