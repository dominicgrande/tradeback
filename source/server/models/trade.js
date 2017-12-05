var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema({
    userOneCard	: String,
    userTwoCard	: String,
    dateCreated : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trade', tradeSchema);
