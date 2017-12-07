var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema({
    userOneCard	: String,
    userTwoCard	: String,
    dateCompleted : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trade', tradeSchema);
