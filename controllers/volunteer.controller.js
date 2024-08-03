const Transaction = require("../Models/transaction.model");
const Donation = require("../Models/donation.model");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "pending" });
    const donations = await Donation.find({ status: "pending" });

    res.status(200).json({ transactions: transactions, donations:donations });
  } catch (error) {
    console.error("Error fetching transactions and donations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    // Find the transaction by ID and update it
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        volunteerId: req.user._id,
        status: "accepted",
      },
      { new: true } // This option returns the updated document
    );

    // Check if the transaction exists
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const donation = await Donation.findByIdAndUpdate(transaction.donorId, {
      status: "completed"
    })

    // Return the updated transaction
    res.status(200).json(transaction);
  } catch (error) {
    // Log the error and send a 500 response
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateTransaction;

module.exports = { getAllTransactions, updateTransaction };
