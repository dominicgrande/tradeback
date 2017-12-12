var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema({
    userOneCard	: String,
    userTwoCard	: String,
    cardOneOwner: String,
    cardTwoOwner: String,
    dateCompleted : {
        type: Date,
        default: Date.now
    },
    userOneCardObject : Object,
    userTwoCardObject : Object
});

module.exports = mongoose.model('Trade', tradeSchema);
