const socketIO = require('socket.io');
const User = require('../models/user');
const moment = require('moment');
const _ = require('lodash');

var connections = [];
var users = [];

function emitMessage(socketIO, socket){
    var anonymousIndex = _.findIndex(users, function(user){
        return user.userName == 'anonymous';
    });

    var anonymousUserCount = 0;
    var registeredUsers = 0;
    if (anonymousIndex != -1) {
        anonymousUserCount = users[anonymousIndex].sockets.length;
        registeredUsers = users.length -1;
    }else{
        registeredUsers = users.length;
    }

    socketIO.emit('CURRENT_USERS', {anonymousUserCount: anonymousUserCount, registeredUsers: registeredUsers});
}

function dump(func){
    console.log("func: %s", func);
    console.log("userCount: %s", users.length);
    _.forEach(users, function(user){
        console.log("  userName: %s", user.userName);
        console.log("  timeStamp: %s", user.timeStamp);
        _.forEach(user.sockets, function(userSocket){
            console.log("     sock: %s", userSocket.id);
        })
    });
}

function removeSocketFromUsers(socket){

    _.forEach(users, function(user){
        var socketIndex = _.findIndex(user.sockets, function (userSocket){
            return userSocket.id == socket.id;
        });

        if (socketIndex != -1) {
            user.sockets.splice(socketIndex, 1);
        }

        if (user.sockets.length <= 0 && user.userName != 'anonymous'){
            // persist to mongo
            User.findOne({userName: user.userName}, function(err, userFromDB){
                if(err) {
                    console.log(err);
                    return;
                }

                var onlineTime = moment(user.timeStamp);
                var difference = moment(new Date).diff(onlineTime, 'minutes');
                userFromDB.onlineMinutes = userFromDB.onlineMinutes + difference;
                userFromDB.update(userFromDB, function(err){
                    if (err) { console.log(err) }
                })
            });
        }
    });

    _.remove(users, function(user){
        return user.sockets.length <= 0;
    })
}

module.exports = function(server){
    const io = socketIO.listen(server);

    io.sockets.on('connection', function(socket){
        socket.once('disconnect', function(){
            connections.splice(connections.indexOf(socket), 1);
            removeSocketFromUsers(socket);
            socket.disconnect();
            console.log('Disconnected : connection count %s', connections.length);
            io.emit('disconnect');
        });
        socket.on('LOGIN', function(userName){
            console.log('%s logged in with socket :%s', userName, socket.id);
            removeSocketFromUsers(socket)
            var index = _.findIndex(users, function(user){
                return user.userName == userName;
            });



            if (index == -1) {
                var user = {
                    timeStamp: new Date(),
                    userName: userName,
                    sockets: [socket]
                }
                users.push(user);
            }else{
                users[index].sockets.push(socket);
            }

            emitMessage(io, socket);

        });

        connections.push(socket);
    });


}
