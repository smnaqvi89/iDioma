var config = require('./config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../db/models/userModel.js');

passport.use(new FacebookStrategy({
    clientID: config.ID,
    clientSecret: config.SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'name', 'picture.type(normal)']
  },

  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
      {
        where: { facebook_id: profile.id},
        defaults: {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          photo_url: profile.photos[0].value,
        }
      })
      .spread(function (user, created) {
        return cb(null, profile);
      });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

exports.checkAuth = function(req, res, next) {
  if (req.session.passport ? req.session.passport.user : false) {
    console.log('user', req.user);
    console.log('session', req.session);
    return next();
  }
  res.redirect('/login');
};

exports.handleLogin = passport.authenticate('facebook');

exports.handleCallback = passport.authenticate('facebook', { successRedirect: '/home/', failureRedirect: '/login' });