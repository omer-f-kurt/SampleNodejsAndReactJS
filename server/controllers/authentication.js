const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function getToken(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.registeredUsers = function(req, res, next){
    User.count({}, function(err, count){
        if(err) {
            return next(err);
        }
        res.send({registeredUsersCount: count});
    })
}

exports.signin = function(req, res, next){

    User.findOne({userName: req.user.userName}, function(err, user){
        if(err) {
            return next(err);
        }

        user.loginCount = user.loginCount + 1;
        user.update(user, function(err){
            if (err) { return next(err); }

            res.send({token: getToken(req.user), userName: user.userName, loginCount: user.loginCount, loginMinutes: user.onlineMinutes});
        })
    });


}

exports.signup = function (req, res, next){
    console.log(req.body);
    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
        return res.status(422).send({error: 'You must provide username and password'});
    }
    User.findOne({userName: userName}, function(err, existingUser){
        if(err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({error: 'User name is already taken!'});
        }
    });


    const user = new User({
        userName: userName,
        password: password,
        loginCount: 1,
        onlineMinutes: 0
    });

    user.save(function(err){
        if (err) { return next(err); }

        res.json({ token: getToken(user), userName: user.userName, loginCount: user.loginCount, loginMinutes: user.onlineMinutes});
    })
};
