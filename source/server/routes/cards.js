/**
 * @file Handles GET and POST of the /api/users endpoint
 * @author Kevin Wang
 */
var mongoose = require('mongoose');
var Card = require('../models/card');

module.exports = function(router) {
    var url = router.route('/cards');

    // /api/users GET Request - returns list of users
    url.get(function(req, res) {
        var payload;

        if (req.query.where) {
            payload = Card.find(JSON.parse(req.query.where));
        } else {
            payload = Card.find({});
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

        payload.exec(function(err, cards) {
            if (err) {
                res.status(500).json({
                    message: 'Failed Cards GET',
                    data: err
                });
            } else {
                res.status(200).json({
                    message: 'Cards GET successful',
                    data: cards
                });
            }
        })
    });

    url.post(function(req, res) {
        if (
            req.body.title === undefined || 
            req.body.description === undefined ||
            req.body.location === undefined 
        ) {
            res.status(422).json({"Message": "Not a complete post"});
            return;
        }



        Card.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            location: req.body.location,
            deadline: req.body.deadline,
            tags: req.body.tags,
            status: req.body.status,
            offer: req.body.offer,
            author: req.body.author,
            author_id: req.body.author_id
        }, function(err, card) {
            if (err) {
                res.status(500).json({
                    message: 'Failed to POST Card',
                    data: err
                });
            } else {
                res.status(201).json({
                    message: "Succcessful POST Card",
                    data: card,
                });
            }
        })
    });

    return router;
}
