const Teacher = require("../model/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = { register, login };
