const passport = require("passport");
const Members = require("../members/members-model");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const opts = {};
const keys = require("../auth/keys");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

<<<<<<< HEAD
opts.secretOrKey = 'secret';
=======
opts.secretOrKey = "process.env.JWT_SECRET";
>>>>>>> f0f63fcf5d922832ea272dd6cf2129a21b5b15ee

// //opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// ff
passport.use(
  new JwtStrategy(opts, async function(payload, done) {
    Members.findBydId(payload.id)
      .then(function(user) {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        if (err) {
          return done(err, false);
        }
      });
  })
);
