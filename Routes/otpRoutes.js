const express = require('express');
const { sendOtp } = require('../contollers/otp.controller');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log("hello");
    const { email } = req.body;
    const result = await sendOtp({ email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
