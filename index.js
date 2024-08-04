const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandling.js");
const { adminAuth } = require("./middleware/adminAuth.js");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["https://annadh-seva-f.vercel.app/"]
  })
);

// Middleware for parsing JSON
app.use(express.json());

const port = process.env.PORT || 3001;

// Import routes
const otpRoutes = require("./Routes/otpRoutes");
const validateOTP = require("./Routes/validateRoute");
const homeRoutes = require("./Routes/home.route.js");
const userRoutes = require("./Routes/user.route.js");
const donationRoutes = require("./Routes/donation.route.js");
const requestRoutes = require("./Routes/request.route.js");
const adminRoutes = require("./Routes/admin.route.js");
const volunteerRoutes = require("./Routes/volunteer.route.js");
const contactController = require("./controllers/contact.controller.js");
const { validateToken } = require("./middleware/validateToken");
const testEmailRoute = require("./Routes/testEmail.js"); // Import the test email route

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DataBase successfully..."))
  .catch((err) => console.error("Could not connect to DataBase:", err));

// API endpoints
app.use("/api/", homeRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/otpVerify", validateOTP);
app.post("/api/contact", contactController.postContactForm);
app.get("/api/contact", contactController.getContacts);

// Apply validateToken middleware to the routes that require authentication
app.use("/api/donation", validateToken, donationRoutes);
app.use("/api/request", validateToken, requestRoutes);
app.use("/api/volunteer", validateToken, volunteerRoutes);
app.use("/admin", validateToken, adminRoutes);

// Use the test email route
app.use("/api", testEmailRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
