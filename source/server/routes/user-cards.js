/**
 * @file Defines route to fetch trades for current logged in users
 * @name server.user-cards.js
 * @author Kevin Wang and Dominic Grande
 */

/**
 * @namespace server
 */

/**
 * @module server/user-cards
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Card = require('../models/card')

module.exports = function(router, passport) {
    var url = router.route('/user-cards/');

    /**
     * userCards REST API resource end-point
     * @endpoint /api/user-cards
     * @name userCards
     * @version v1
     * @since v1
     * @description Retrieve a list of cards owned by a specific
     */
    url.get(function(req, res) {
          let query = Card.find({author: req.query.username});
          query.exec(function(err, cards) {
              if (err) {
                    res.status(500).json({message: "Internal server error"});
                } else {
                    res.status(200).json({
                      message: "User Cards",
                      data: cards
                    });
                }
            });

    });

    return router;
}
