const passport = require("passport");
const db = require("../database/db-config");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db("member_table")
      .where({ id })
      .first()
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
