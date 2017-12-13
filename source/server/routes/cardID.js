
/* * @file Handles GET, PUT, and DELETE of the /api/users/* endpoint
 * @author Kevin Wang
 */
var mongoose = require('mongoose');
var Card = require('../models/card');

module.exports = function(router) {
    var url = router.route('/card/');

    // /api/users/* GET Request - returns data for one task
    url.get(function(req, res) {
        Card.findOne({
            _id: req.query.id
        }, function(err, card) {
            if (err) {
                res.status(404).json({
                    message: 'Failed Card ID GET',
                    data: err
                });
            } else {
                res.status(200).json({
                    message: 'Card ID GET Succesful',
                    data: card
                });
            }
        });
    });

    // /api/users/* PUT Request - updates data for one task
    url.put(function(req, res) {
        if (req.query.status){
            Card.findByIdAndUpdate({_id: req.query.id}, {"status": 1}, {upsert: true, new: true}, function(err, card){
                if (err) {
                    res.status(404).json({
                        message: 'Failed Card ID PUT',
                        data: err
                    });
                } else {
                    res.status(200).json({
                        message: 'Card ID PUT Succesful With Status',
                        data: card,
                    });
                }
            });
            return;
        }
        else {
           Card.findByIdAndUpdate(req.query.id, req.body, {
            new: true
        }, function(err, card) {
            if (err) {
                res.status(404).json({
                    message: 'Failed Card ID PUT',
                    data: err
                });
            } else {
                res.status(200).json({
                    message: 'Card ID PUT Succesful',
                    data: card,
                });
            }
        }) 
        }
        
    });

    // /api/users/* DELETE Request - deletes one task
    url.delete(function(req, res) {
        Card.deleteOne({
            _id: req.query.id
        }, function(err, card) {
            if (err) {
                res.status(404).json({
                    message: 'Failed User ID DELETE',
                    data: err
                });
            } else {
                res.status(200).json({
                    message: 'User ID DELETE Succesful',
                    data: card,
                });
            }
        })
    });

    return router;
}
