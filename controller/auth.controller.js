const Teacher = require("../model/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { generateOtp } = require("../config/common_service");
const store = { otp: "" };

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bitwizecode@gmail.com",
    pass: "byxr ruqb apol vzan",
  },
});

const register = async (req, res) => {
  const body = req.body;

  const isTeacher = await Teacher.findOne({
    $or: [{ email: body?.email }, { phone: body?.phone }],
  });
  console.log(isTeacher);
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
  console.log("object");
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
    const otp = await generateOtp();
    store.otp = otp;
    const info = await transporter.sendMail({
      from: "bitwizecode@gmail.com", // sender address
      to: inputData, // list of receivers
      subject: "Message from your pappa", // Subject line
      text: "Here is your otp", // plain text body
      html: `<p>Your OTP is : <b>${otp}</b></p>`, // html body
    });
    console.log("OTP :", otp);
    res.status(200).send({ message: "OTP sent successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp == store.otp) {
      res.status(200).send({ message: "OTP verified successfully!" });
      return;
    }
    res.status(500).send({ message: "Wrong OTP !" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
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
