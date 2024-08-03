const bcrypt = require('bcrypt');

const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const verifyHashedData = async (unhashed, hashed) => {
  try {
  const match = await bcrypt.compare (unhashed, hashed);
  return match;
  } catch (error) { I
  throw error;
  }
  };
  module.exports = { hashData, verifyHashedData };