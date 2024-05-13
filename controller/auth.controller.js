const Teacher = require("../model/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  generateOtp,
  otpHTML,
  isOtpExpired,
} = require("../config/common_service");
const fs = require("fs");
const OTP = require("../model/otp.model");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bitwizecode@gmail.com",
    pass: "byxr ruqb apol vzan",
  },
});

async function sendEmail(inputData, otp, res) {
  try {
    const info = await transporter.sendMail({
      from: '"OTP Verification" <bitwizecode@gmail.com>',
      to: inputData,
      subject: "Reset Password OTP : " + otp,
      text: "Here is your otp : " + otp,
      html: otpHTML(otp),
    });
    return;
  } catch (error) {
    console.log("Error while sending email:", error);
    return;
  }
}
const register = async (req, res) => {
  const body = req.body;
  const isTeacher = await Teacher.findOne({
    $or: [{ email: body?.email }, { phone: body?.phone }],
  });
  if (isTeacher) {
    return res.status(409).send({
      message: "Teacher already exists with given email or number.",
      status: false,
    });
  }
  const encryptedPassword = await bcrypt.hash(body?.password, 10);
  const teacher = await Teacher.create({
    ...body,
    classes: [],
    password: encryptedPassword,
  });
  res.status(200).send({ message: "Teacher added successfully", status: true });
};

const login = async (req, res) => {
  const { loginInput, password } = req.body;

  // Check if the user exists by email or number
  const isTeacher = await Teacher.findOne({
    $or: [{ email: loginInput }, { phone: loginInput }],
  });

  if (!isTeacher) {
    return res.status(404).send({
      message: "User does not exist with the given email or number.",
      status: false,
    });
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, isTeacher.password);
  if (!isPasswordValid) {
    return res.status(404).send({
      message: "Invalid username or password",
      status: false,
    });
  }
  delete isTeacher.password;
  const token = jwt.sign(
    {
      first_name: isTeacher.first_name,
      last_name: isTeacher.last_name,
      email: isTeacher.email,
    },
    "compassclass"
  );
  res.status(200).send({ message: "Login successful", token });
};

const forgotPasswordSendOtp = async (req, res) => {
  const { inputData } = req.body;
  try {
    const otp = generateOtp();
    const OTP_DETAILS = {
      otp: otp,
      email: inputData,
    };

    try {
      await sendEmail(inputData, otp);
    } catch (error) {
      console.log("Error while sending email:", error);
      return res.status(500).send({ message: "Something went wrong!" });
    }

    const existOTP = await OTP.findOne({ email: inputData });

    if (existOTP) {
      const updatedOTP = await OTP.findOneAndUpdate(
        { email: inputData },
        OTP_DETAILS
      );
      return res.status(200).send({ message: "OTP sent successfully" });
    }

    const newOtp = await OTP.create(OTP_DETAILS);

    return res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const existOTP = await OTP.findOne({ email });

    if (!existOTP) {
      res.status(500).send({ message: "Please request the OTP first" });
      return; 
    }
    if (existOTP.otp !== otp) {
      res.status(500).send({ message: "Wrong OTP !" }); 
      return;
    }
    if (isOtpExpired(new Date(existOTP?.updatedAt))) {
      res.status(500).send({ message: "Your OTP got expired" });
      return;
    }

    res.status(200).send({ message: "OTP verified successfully!" });
    return;
  } catch (error) {
    console.log(err);
    res.status(200).send({ message: "OTP verified successfully!" });
    return;
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await Teacher.findOneAndUpdate(
      { email },
      { $set: { password: encryptedPassword } }
    );
    res.status(200).send({ message: "Password changed successfully!" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "Password changed successfully!" });
  }
};

module.exports = {
  register,
  login,
  forgotPasswordSendOtp,
  verifyOtp,
  changePassword,
};
