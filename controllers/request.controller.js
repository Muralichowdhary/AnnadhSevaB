const Donation = require("../Models/donation.model"); // Adjust the path as per your project structure
const ReceiverRequest = require("../Models/request.model");
const Transaction = require("../Models/transaction.model.js");
const User = require("../Models/user.model.js")
const createReceiverRequest = async (req, res) => {
  const { receiverName, receiverId, loc, foodItems, quantity } = req.body;

  try {
    const newRequest = new ReceiverRequest({
      receiverName,
      receiverId,
      location: loc,
      foodItems,
      quantity,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ msg: 'Request added successfully', savedRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error creating request', error });
  }
};
const getAllRequests = async (req, res) => {
  try {
    const requests = await ReceiverRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompletedRequests = async (req, res) => {
  try {
    let requests = await Donation.find({ donorId: req.user._id });

    requests = await Promise.all(
      requests.map(async (request) => {
        const receiver = await User.findById(request.receiverId);
        return {
          ...request.toObject(),
          receiverName: receiver ? receiver.name : 'Unknown',
        };
      })
    );

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFulfilledReceiverRequests = async (req, res) => {
  try {
    let requests = await ReceiverRequest.find({ receiverId: req.user._id });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getvolunteeredRequests = async (req, res) => {
  try {
    let requests = await Transaction.find({volunteerId: req.user._id});

    requests = await Promise.all(
      requests.map(async (request) => {
        const donor = await User.findById(request.donorId);
        const donation = await Donation.findById(request.donationId);
        const receiver = await User.findById(donation.receiverId);
        if(!receiver) {
          return;
        }
        return {
          ...request.toObject(),
          donarEmail: donor.email,
          receiverEmail: receiver.email
        };
      })
    );

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  const requests = await ReceiverRequest.find({status: "pending"});
  res.status(200).json(requests);
}

// @api /api/request/:id
const updateRequestStatus = async (req, res) => {
  const requestId = req.params.id;
  const message = req.body.message;
  const request = await ReceiverRequest.findByIdAndUpdate(requestId, {message, status: "completed"}, {new: true});

  const donation = await Donation.findOneAndUpdate({requestId}, {message, status:"completed"}, {new: true});
  const transaction = await Transaction.findOneAndUpdate({requestId}, {message, status:"completed"}, {new: true});

  
  res.status(200).json({request, donation, transaction});
}

module.exports = {
  getAllRequests,
  getCompletedRequests,
  getFulfilledReceiverRequests,
  getvolunteeredRequests,
  createReceiverRequest,
  getPendingRequests,
  updateRequestStatus
};

// controllers/requestController.js
// const ReceiverRequest = require('../Models/request.model');
// const createReceiverRequest = async (req, res) => {
//     const { receiverName, receiverId, loc, foodItems, quantity } = req.body;

//     try {
//       const existingRequest = await ReceiverRequest.findOne({ receiverId, loc });

//       if (existingRequest) {
//         return res.status(400).json({ message: 'Request already exists for this receiver' });
//       }
//       const newRequest = new ReceiverRequest({
//         receiverName,
//         receiverId,
//         loc,
//         foodItems,
//         quantity,
//       });

//       const savedRequest = await newRequest.save();
//       res.status(201).json({ msg: 'Request added successfully', savedRequest });
//     } catch (error) {
//       res.status(400).json({ message: 'Error creating request', error });
//     }
//   };

// module.exports = {
//   createReceiverRequest
// };
