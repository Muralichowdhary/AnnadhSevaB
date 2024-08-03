const nodemailer = require("nodemailer");
const { AUTH_EMAIL, AUTH_PASS } = process.env;
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  // port:587,
  // secure:false,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
