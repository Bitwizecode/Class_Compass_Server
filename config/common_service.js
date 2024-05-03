const generateOtp = () => {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * 9);
    otp += num;
  }
  return otp;
};

module.exports = { generateOtp };
