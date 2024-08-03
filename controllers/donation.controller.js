const errorHandler = require("express-async-handler");
const Donation = require("../Models/donation.model");
const ReceiverRequest = require("../Models/request.model");
const Transaction = require("../Models/transaction.model");

// Post a donation to a specific receiver request
const postDonation = errorHandler(async (req, res) => {
  const { foodItems, quantity, requestId, shelfLife } = req.body;
  const user = req.user;
  const donorId = req.user._id;
  const donarName = user.name;
  const location = user.location;
  let newDonation;
  
  
  if (requestId === 0) {
    newDonation = new Donation({
      donorId,
      location,
      donarName,
      foodItems,
      quantity,
      shelfLife,
      misc: true,
    });
    await newDonation.save();
  } else {
    const request = await ReceiverRequest.findById(requestId);
  const receiverId = request.receiverId;
    newDonation = new Donation({
      donorId,
      location,
      donarName,
      foodItems,
      quantity,
      shelfLife,
      requestId,
      receiverId,
      status: "taken"
    });
    const updatedRequest = await ReceiverRequest.findByIdAndUpdate(requestId, {
      status: "taken",
    });
    const donation = await newDonation.save();
    
    
    const transaction = new Transaction({
      dloc: location,
      rloc: request.location,
      donationId: newDonation._id,
      donarName,
      requestId,
      receiverName: request.receiverName,
      donorId: donorId,
    });
    await transaction.save();
  }

  res.status(201).json(newDonation);
});

const getDonation = errorHandler(async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

module.exports = {
  postDonation,
  getDonation,
};
