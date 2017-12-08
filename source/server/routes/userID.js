/**
 * @file Handles GET, PUT, and DELETE of the /api/users/* endpoint
 * @author Kevin Wang
 */
var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function(router) {
    var url = router.route('/users/:id');

    // /api/users/* GET Request - returns data for one task
    url.get(function(req, res) {
        User.findOne({
            _id: req.params.id
        }, function(err, user) {
            if (err) {
                res.status(404).json({
                    message: 'Failed User ID GET',
                    data: err
                });
            } else if (user == null) {
                res.status(404).json({
                    message: 'Not Found User ID GET',
                    data: []
                });
            } else {
                res.status(200).json({
                    message: 'User ID GET Succesful',
                    data: user
                });
            }
        });
    });

    // /api/users/* PUT Request - updates data for one task
    url.put(function(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function(err, user) {
            if (err) {
                res.status(404).json({
                    message: 'Failed User ID PUT',
                    data: err
                });
            } else if (user == null) {
                res.status(404).json({
                    message: 'Not Found User ID PUT',
                    data: null
                });
            } else {
                res.status(200).json({
                    message: 'User ID PUT Succesful',
                    data: user,
                });
            }
        })
    });

    // /api/users/* DELETE Request - deletes one task
    url.delete(function(req, res) {
        User.deleteOne({
            _id: req.params.id
        }, function(err, user) {
            if (err) {
                res.status(404).json({
                    message: 'Failed User ID DELETE',
                    data: err
                });
            } else if (user.deletedCount == 0) {
                res.status(404).json({
                    message: 'Not Found User ID DELETE',
                    data: null
                });
            } else {
                res.status(200).json({
                    message: 'User ID DELETE Succesful',
                    data: user,
                });
            }
        })
    });

    return router;
}
