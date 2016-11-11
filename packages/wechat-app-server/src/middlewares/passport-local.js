import mongoose from 'mongoose'
import restify from 'restify'
import passport from 'passport'
import { Strategy } from 'passport-local'

const User = mongoose.model('User')

export default (server) => {
  server.use(passport.initialize())
  server.use(passport.session())

  // This is how a user gets serialized
  passport.serializeUser((user, done) => done(null, user.id))

  // This is how a user gets deserialized
  passport.deserializeUser((id, done) => done(null, {id:123456, username:'john'}));

  passport.use(
    new Strategy(
      { usernameField: 'username', session: true },
      (username, password, done) => {
          User.auth(username, password)
          .then(user => {
            user ? done(null, user): done(null, false, { error: 'Incorrect username or password.' })
          })
      }
    )
  );
}

export const login = (req, res, next) => {
    // The local login strategy
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }

        // Technically, the user should exist at this point, but if not, check
        if(!user) {
            return next(new restify.InvalidCredentialsError("Please check your details and try again."));
        }

        // Log the user in!
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            req.session.user_id = req.user.id;

            if(user.username) {
                res.json({ success: 'Welcome ' + user.username + "!"});
                return next();
            }

            res.json({ success: 'Welcome!'});
            return next();
        });
    })(req, res, next);
}
