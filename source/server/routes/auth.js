var config = require("../config")

var User = require('../models/user');


module.exports = function(router, passport) {

    router.post('/register',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.status(200).json({ user: req.user.email
        });
    });

    router.post('/login',
        passport.authenticate('local-login', { failureRedirect: '/login', failureFlash: true }),
        function(req, res){
                //Once these are on the same domain this will redirect correctly
                return res.status(200).json({message: 'ok'});
        }
    );

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            if (req.isAuthenticated()){
                console.log("Authorized");
                res.status(200).json({ user: req.user, message: "Welcome!"});
            } else {
                console.log("Unable to auth");
                res.status(401).json({message: "unable to auth"});
            }
    });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });

    return router;
}

function isLoggedIn(req, res, next) {
    console.log(req.session);
  console.log("Is logged in " + req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log("Is logged in");
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
