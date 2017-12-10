/**
 * @file Defines route to fetch trades for current logged in users
 * @name server.user-trades.js
 * @author Kevin Wang and Dominic Grande
 */

/**
 * @namespace server
 */

/**
 * @module server/user-trades
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Trade = require('../models/trade')

module.exports = function(router, passport) {
    var url = router.route('/user-trades');

    /**
    * userTrades REST API resource end-point
    * @endpoint /api/user-trades
    * @name userTrades
    * @version v1
    * @since v1
    * @description Retrieve a list of trades for a specific user
    */
    url.get(function(req, res) {
        console.log(req.user.id);
        if (!req.user) {
            res.status(401).json({message: "You are not logged in"});
        } else {
            let queryOne = Trade.find({cardOneOwner: req.user.username});
            queryOne.exec(function(err, trades) {
                if (err) {
                    res.status(500).json({message: "Internal server error"});
                } else {
                    Promise.resolve(trades);
                }
            }).then(function(queryOneTrades) {
                let queryTwo = Trade.find({cardTwoOwner: req.user.username});
                queryTwo.exec(function(err, trades) {
                    if (err) {
                        res.status(500).json({message: "Internal server error"});
                    } else {
                        let combinedTrades = queryOneTrades.concat(trades);
                        res.status(200).json({message: "Send array of trades", data: combinedTrades});
                    }
                });
            });
        }
    });

    return router;
}
