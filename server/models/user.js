const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    userName: { type:String, unique: true, lowercase: true },
    password: String,
    loginCount: Number,
    onlineMinutes: Number
});

userSchema.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(10, function(err, salt){
        if (err) { next(err); }
        bcrypt.hash(user.password, salt, null, function (err, hash){
            if (err) { next(err) }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePasswords = function(canditatePassword, callback){
    bcrypt.compare(canditatePassword, this.password, function(err, isMatch){
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
