const Queue = require('bull');
const sendEmail = require('./sendEmail');

const emailQueue = new Queue('emailQueue', {
  limiter: {
    max: 5, // Max 5 jobs (emails) concurrently
    duration: 1000, // Per second
  },
});

emailQueue.process(async (job, done) => {
  const mailOptions = job.data;
  try {
    await sendEmail(mailOptions);
    done();
  } catch (error) {
    done(error);
  }
});

module.exports = emailQueue;
