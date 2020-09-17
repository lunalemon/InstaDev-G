const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//@route  POST/api/users/register
//@desc   registers the user
//@access public
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  } 

  User.findOne({
    email:req.body.email
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
    if(err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save()
      .then((user) => res.json(user))
      .catch((err) => console.log(err))
    })
  })
  }
})
.catch((err) => console.log(err));
})

//FOR VEENA <3
//@route  POST/api/users/login
//@descr  Logs user in
//@access Public



router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find the user with email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }

      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // if user match
            const payload = { id: user.id, name: user.name, avatar: user.avatar };
            
            // sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                return res.json({token: 'Bearer '+token})
              }
            )
          }
            else 
            {
              return res.status(404).json({ password: 'Password incorect' });
            }
            
          
        })
        .catch(err => console.log(err));

    })
    .catch();

})


module.exports = router;