/**
 * @file Defines route to fetch trades for current logged in users
 * @name server.userID.js
 * @author Kevin Wang and Dominic Grande
 */

/**
 * @namespace server
 */

/**
 * @module server/userID
 */
var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function(router) {
    var url = router.route('/user/');

    /**
     * @name userID-Get
     * @function
     * @version v1
     * @since v1
     * @inner
     * @param {string} path - /api/user/:id
     * @param {string} username - Unique username
     * @return {Object} User - User model excluding password information
     * @description Retrieve a user's information given their username
     */
    url.get(function(req, res) {
        console.log(req.query);
        User.findOne({
            username: req.query.username
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
                delete user.password;
                res.status(200).json({
                    message: 'User ID GET Succesful',
                    data: user
                });
            }
        });
    });

    /**
     * @name userID-Post
     * @function
     * @version v1
     * @since v1
     * @inner
     * @param {string} path - /api/user/:id
     * @param {string} username - Unique username
     * @param {Object} UserUpdates - Updates to user object
     * @return {Number} Status Code - 200 on success
     * @description Retrieve a user's information given their username
     */
    url.put(function(req, res) {
        if (!req.isAuthenticated()) {
            res.status(403).json({
                message: "Please login"
            });
            return;
        }
        console.log(req.query.id)

        User.findOneAndUpdate({username: req.query.id}, req.body, {
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

    return router;
}
