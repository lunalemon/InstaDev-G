const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const router = express.Router();

//@route  POST/api/users/register
//@desc   registers the user
//@access public
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  } 

  User.findOne({
    email: req.body.email,
  })
  .then((user) => {
    if (user) {
    return res.status(400).json({email: 'Email Already Exists'});
  } else {
    const avatar = gravatar.url(req.body.email, {
    s:'200',
    r:'pg',
    d:'mm'
  });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    avatar: avatar,
    password: req.body.password
  });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
})

//FOR VEENA <3
//@route  POST/api/users/login
//@descr  Logs user in
//@access Public

router.post('/login', (req,res)=>{

const email=req.body.email;
const password=req.body.password;

//Find a user with the given email

User.findOne({ email: email })
  .then((user) => {
    if (!user) {
      return res.status(404).json({ email: " User not found" });
    }

    //check for password
    bcrypt.compare(password, user.password) // comparing new password with hashed password
      .then((isMatch) => {
        if (isMatch) {
          return res.json({ msg: "Success!" });
        } else {
          return res.status(400).json({ password: "Password incorrect" });
        }
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

}
)



module.exports = router;