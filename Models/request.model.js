const mongoose = require("mongoose");
const { Schema } = mongoose;

const receiverRequestSchema = new mongoose.Schema(
  {
    receiverName: { type: String, required: true },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    foodItems: [{ type: String, required: true }],
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "taken", "complete"],
      default: "pending",
    },
    message: { type: String, default: "--" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReceiverRequest", receiverRequestSchema);
