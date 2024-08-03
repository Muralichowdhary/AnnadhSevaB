const express = require('express');
const { verifyOTP } = require('../contollers/otp.controller');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const validOTP = await verifyOTP({ email, otp });
    res.status(200).json({ valid: validOTP });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
