var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

/**
 * Specifies what strategy we'll use
 */
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Registration Strategy
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        function(email, password, done) {
            User.findOne({
                'username': username
            }, function(err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    return done(null, false);
                } else {
                    var newUser = new User();

                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        console.log(err);
                        return done(null, newUser);
                    });
                }
            });
        }));

    // Login Strategy
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        function(email, password, done) {
            User.findOne({
                'username': username
            }, function(err, user) {
                if (err) {
                    return done(err);
                } else if (!user || !user.validPassword(password)) {
                    return done(null, false);
                }

                return done(null, user);
            });
        }));
};
