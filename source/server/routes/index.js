/*
 * Connect all of your endpoints together here.
 */
module.exports = function(app, router, passport) {

    // GET and POST for Cards
    app.use('/api', require('./cards.js')(router));
    //GET and POST for Trades
    app.use('/api', require('./trades.js')(router));
    // GET and POST for Users
    app.use('/api', require('./users.js')(router));

    // GET, PUT, and DELETE for a Card
    app.use('/api', require('./cardID.js')(router));
    // GET, PUT, and DELETE for a Trade
    app.use('/api', require('./tradeID.js')(router));
    //GET, PUT, and DELETE for a User
    app.use('/api', require('./userID.js')(router));

    app.use('/auth', require('./auth.js')(router, passport));

    app.use('/api', require('./user-trades.js')(router, passport));

    //Add auth api
    // app.use('/auth', require('./auth')(router, passport))

};
