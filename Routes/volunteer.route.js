const express = require("express");
const {
  getAllTransactions,
  updateTransaction
} = require("../controllers/volunteer.controller");
const router = express.Router();

router.route("/").get(getAllTransactions);
router.put("/:id", updateTransaction);

module.exports = router;
