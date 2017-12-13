Trade/**
 * @file Handles GET and POST of the /api/users endpoint
 * @author Kevin Wang
 */
var mongoose = require('mongoose');
var Trade = require('../models/trade');

module.exports = function(router) {
    var url = router.route('/trades');

    // /api/users GET Request - returns list of users
    url.get(function(req, res) {
        var payload;
        var payload2;

        if (req.query.includeCard){
            payload = Trade.find({userOneCard: req.query.includeCard});
            payload2 = Trade.find({userTwoCard: req.query.includeCard});
        } else {
            payload = Trade.find({});            
        }

        if (req.query.sort) {
            payload.sort(JSON.parse(req.query.sort));
        }

        if (req.query.select) {
            payload.select(JSON.parse(req.query.select));
        }

        if (req.query.skip) {
            payload.skip(JSON.parse(req.query.skip));
        }

        if (req.query.limit) {
            payload.limit(JSON.parse(req.query.limit));
        }

        if (req.query.count) {
            payload.count();
        }

        if (req.query.includeCard){
            payload.exec(function(err, trades) {
                if (err) {
                    res.status(500).json({
                        message: 'Failed Trades GET',
                        data: err
                    });
                    return;
                } else {
                    Promise.resolve(trades);
                }
            }).then((offerOneTrades) => {
                payload2.exec(function(err, offerTwoTrades){
                    if (err) {
                        res.status(500).json({
                            message: 'Failed trades get'
                        });
                    } else {
                        let newArray = offerOneTrades.concat(offerTwoTrades);
                        res.status(200).json({
                            message: 'Trades get succesful',
                            data: newArray
                        });
                    }
                })
            });
            return;
        } else {
            payload.exec(function(err, trades) {
                if (err) {
                    res.status(500).json({
                        message: 'Failed Trades GET',
                        data: err
                    });
                } else {
                    res.status(200).json({
                        message: 'Trades GET successful',
                        data: trades
                    });
                }
            });
        }
    });

    // var mongoose = require('mongoose');
    //
    // var tradeSchema = mongoose.Schema({
    //     userOneCard	: String,
    //     userTwoCard	: String,
    //     dateCreated : {
    //         type: Date,
    //         default: Date.now
    //     }
    // });
    //
    // module.exports = mongoose.model('Trade', tradeSchema);

    url.post(function(req, res) {
        if (!req.isAuthenticated()) {
            res.status(403).json({message: "Please login"});
            return;
        }

        if (
            !req.body.userOneCard || !req.body.userTwoCard || 
            !req.body.cardOneOwner || !req.body.cardTwoOwner
            ) 
        {
            res.status(400).json({
                message: 'Bad trade'
            });
        } else {
            Trade.create({
                userOneCard   : req.body.userOneCard,
                userTwoCard   : req.body.userTwoCard,
                cardOneOwner  : req.body.cardOneOwner,
                cardTwoOwner  : req.body.cardTwoOwner,
                dateCompleted : null
            }, function(err, trade) {
                if (err) {
                    res.status(500).json({
                        message: 'Failed to POST Trade',
                        data: err
                    });
                } else {
                    res.status(201).json({
                        message: "Succcessful POST Trade",
                        data: trade,
                    });
                }
            });
        }
    });

    return router;
}
