const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUser, removeUser, getUser,getUserInRoom, users} = require('./participants.js'); //8

const app = express();
app.use(cors());
const router = require('./router');
// const { Console } = require('console');
// const { callback } = require('util');

const server = http.createServer(app);
const io = socket(server);
let soo;
io.on('connection', (s)=>{
    console.log('joined');
    s.on('joined', ({username, chatroom}, callback)=>{
        console.log('inside joined');
        let soo = s.id;
        console.log('id, 1st occu: ',soo);
        const {error, user} = addUser({id:soo, username, chatroom});
        console.log('in 1st occu: ', user)
        console.log('eror, user: ', error, user)
        if(error) return callback(error);
        s.emit('message', {user:'admin', text:`${user.username}, welcome to ${user.chatroom}`});
        s.broadcast.to(user.chatroom).emit('message', {user:'admin', text:`${user.username}, has joined`});
        s.join(user.chatroom);
        callback();
    });
    s.on('send', (message, callback)=>{
        console.log('current user: ', user)
        let user = getUser(soo); //8
        if (!user) {
            user = getUser(users[0].id)
            console.log('inside if: ', user)
        }
        console.log('id, 2nd occu: ',soo); // 'soo' will be different here
        console.log('id: ',soo);
        console.log('user: ', user) 
        io.to(user.chatroom).emit('message', {user:user.username, text:message});
        callback();
    });
    s.on('disconnect', ()=>{
        console.log('disjoined');
  })
})
app.use(router);
server.listen(process.env.PORT || 5000, ()=>{
    console.log('Up and running!')
});