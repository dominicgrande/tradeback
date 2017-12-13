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
    userOneSatisfied: {
        type: Boolean,
        default: false
    },
    userTwoSatisfied: {
        type: Boolean,
        default: false
    },
    userOneCardObject : Object,
    userTwoCardObject : Object
});

module.exports = mongoose.model('Trade', tradeSchema);
