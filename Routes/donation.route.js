const express = require("express");
const {
  postDonation,
  getDonation,
} = require("../controllers/donation.controller");
const router = express.Router();

router.get("/", getDonation);

router.post("/", postDonation);

module.exports = router;
