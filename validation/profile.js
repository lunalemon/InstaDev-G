const Validation = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  if (!Validation.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 to 40 characters";
  }

  if (isEmpty(data.handle)) {
    errors.handle = "Handle cant be empty";
  }
  if (!isEmpty(data.phone)) {
    if (!Validation.isMobilePhone(data.phone)) {
      errors.handle = "Invalid mobile phone";
    }
  }

  if (!isEmpty(data.website)) {
    if (!Validation.isURL(data.website)) {
      errors.website = "Invalid website";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validation.isURL(data.facebook)) {
      errors.facebook = "Invalid Facebook website url";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validation.isURL(data.linkedin)) {
      errors.linkedin = "Invalid Linkedin website url";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validation.isURL(data.twitter)) {
      errors.twitter = "Invalid Twitter website url";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validation.isURL(data.youtube)) {
      errors.youtube = "Invalid Youtube Url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
