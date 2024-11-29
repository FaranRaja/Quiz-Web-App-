// middleware/validationMiddleware.js
const yup = require("yup");

// Signup validation schema
const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

// Login validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Middleware to validate signup data
const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.inner.map((error) => ({
      path: error.path,
      message: error.message,
    }));
    res.status(400).json({ errors });
  }
};

// Middleware to validate login data
const validateLogin = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.inner.map((error) => ({
      path: error.path,
      message: error.message,
    }));
    res.status(400).json({ errors });
  }
};

module.exports = {
  validateSignup,
  validateLogin,
};
