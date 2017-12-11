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
var Card = require('../models/card')

module.exports = function(router, passport) {
    var url = router.route('/user-trades/');

    /**
 * userTrades REST API resource end-point
 * @endpoint /api/user-trades
 * @name userTrades
 * @version v1
 * @since v1
 * @description Retrieve a list of trades for a specific user
 */
    url.get(function(req, res) {
        let queryOne = Trade.find({cardOneOwner: req.query.username});
        queryOne.exec(function(err, trades) {
            if (err) {
                res.status(500).json({message: "Internal server error"});
            } else {
                Promise.resolve(trades);
            }
        }).then(function(queryOneTrades) {
            let queryTwo = Trade.find({cardTwoOwner: req.query.username});
            queryTwo.exec(function(err, trades) {
                if (err) {
                    res.status(500).json({message: "Internal server error"});
                } else {
                    let combinedTrades = queryOneTrades.concat(trades);
                    Promise.resolve(combinedTrades);
                }
            }).then(function(trades) {

                let promise = new Promise((resolve, reject) => {
                  resolve(0);
                });

                let promises = [];
                for (let i = 0; i < trades.length; i++) {
                    let cardOneQuery = Card.findOne({_id: trades[i].userOneCard});
                    let cardTwoQuery = Card.findOne({_id: trades[i].userTwoCard});

                    let promise = new Promise((resolve, reject) => cardOneQuery.exec(function(err, card) {
                        if (err) {
                            res.status(500).json({message: "Internal server error"});
                            reject();
                        } else {
                            resolve(card);
                        }
                    }));
                    promise = promise.then(function(cardOne) {
                        trades[i].userOneCard = cardOne;
                    });   
                    
                    let promiseTwo = new Promise((resolve, reject) => {
                        cardTwoQuery.then(() => cardTwoQuery.exec(function(err, card) {
                            if (err) {
                                res.status(500).json({message: "Internal server error"});
                                reject();
                            } else {
                                resolve(card);                           
                            }
                        }));
                    });

                    promiseTwo = promiseTwo.then(function(cardTwo){
                        trades[i].userTwoCard = cardTwo;
                    })

                    promises.push(promise);
                    promises.push(promiseTwo);
                }

                Promise.all(promises).then(() => {
                    console.log(trades);
                    res.status(200).json({message: "trades", data: trades});
                }).catch(() => {
                    res.status(500).json({message: "Internal server error"});
                });
            });
        });
    });

    return router;
}
