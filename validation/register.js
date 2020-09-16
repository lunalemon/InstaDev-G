const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  if(!Validator.isLength(data.name, {min:2, max:30})){
    errors.name = 'Name must be between 2 and 30 characters';
  } 
  //sequence matters here
  if(isEmpty(data.name)) {
    errors.name = 'Name Field Required';
  }
  if(isEmpty(data.email)) {
    errors.email = 'Email Address Required';
  }
  if(!Validator.isLength(data.password, {min:6, max:30})){
    errors.password = 'Password must be between 6 and 30 characters';
  }
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid';
  }
  if(isEmpty(data.password)) {
    errors.password = 'Password Field Required';
  }
  if(isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password';
  }
    if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords Must Match';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
    //Boolean flag
  }
}