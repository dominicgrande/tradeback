var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    username		  : String,
    password	    : String,
    location      :  String,
    description   : String,
    tags          : [String],
    cards         : [String],
    trades        : [String],
    profile       : String,
    profile_image : {
        type: String, 
        default: 'https://s3-us-west-2.amazonaws.com/cs498rk-images/prof_pic_orig.png'
    },
    fb_name: String
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
