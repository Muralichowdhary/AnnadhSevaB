const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandling.js");
const {adminAuth} = require("./middleware/adminAuth.js")

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

const otpRoutes = require('./Routes/otpRoutes'); // Import the OTP routes
const validateOTP = require('./Routes/validateRoute'); // Import the OTP verification routes

const homeRoutes = require("./Routes/home.route.js");
const userRoutes = require("./Routes/user.route.js");
const donationRoutes = require("./Routes/donation.route.js");
const requestRoutes = require("./Routes/request.route.js");
const adminRoutes = require("./Routes/admin.route.js");
const volunteerRoutes = require("./Routes/volunteer.route.js");
const contactController = require("./controllers/contact.controller.js")
const { validateToken } = require("./middleware/validateToken");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to DataBase successfully..."));

// Connecting API endpoints to routes

app.use("/api/", homeRoutes);
app.use("/api/auth", userRoutes);

app.use('/api/otp', otpRoutes);
app.use('/api/otpVerify', validateOTP);
app.post("/api/contact", contactController.postContactForm);
app.get("/api/contact", contactController.getContacts);

// Apply validateToken middleware to the routes that require authentication
app.use("/api/donation", validateToken, donationRoutes);
app.use("/api/request", validateToken, requestRoutes);
app.use("/api/volunteer", validateToken, volunteerRoutes);
// app.use(adminAuth);
app.use("/admin", validateToken, adminRoutes);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
