const Validator = require("validator");
const isEmpty = require("./is-empty");


module.exports = function validatechangepasswordInput(data) {
  let errors = {};
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  

  if (!Validator.matches(data.password, passw)) {
    errors.password =
      "Password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password Field Required";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Confirm Password Required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords Must Match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
    //Boolean flag
  };
};