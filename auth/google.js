const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const helpers = require('./_helpers');
const User = require('../members/members-model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_URL
    }, (accessToken, refreshToken, profile, done) => {
        let username = profile.id;
        console.log(profile)

        User.findBy({ username })
        .first()
        .then(user => {
            console.log(user)
            if (typeof user === "undefined") {
                console.log('create')
                const data = { first_name: profile.name.givenName, last_name: profile.name.familyName, email: profile.emails[0].value, username: profile.id, password: profile.id}
                
                helpers.createUser(data);
            }
            return done(null, user)
      })
    })
)