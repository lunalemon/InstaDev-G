const JwtStrategy = require('passport-jwt').Strategy;
<<<<<<< HEAD
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const User = require('../models/User');

const opts = {};


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch();
  }));
}
=======
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require('../config/keys');
const User = require('../models/User');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

>>>>>>> e42db258b9504482f4dac83ad29521c1ebfcd96c
