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
        //soo = s.id; //8
        console.log('id, 1st occu: ',s.id);
        console.log('soo, 1st occu: ',soo);
        const {error, user} = addUser({id:s.id, username, chatroom}); //8 s.id was soo
        console.log('in 1st occu: ', user)
        console.log('eror, user: ', error, user)
        if(error) return callback(error);
        s.emit('message', {user:'admin', text:`${user.username}, welcome to ${user.chatroom}`});
        s.broadcast.to(user.chatroom).emit('message', {user:'admin', text:`${user.username}, has joined`});
        io.to(user.chatroom).emit('roomData', { room: user.chatroom, users: getUserInRoom(user.chatroom) });
        s.join(user.chatroom);
        callback();
    });
    s.on('send', (message, callback)=>{
        console.log('current users: ', users)
        let user = getUser(s.id);  //s.id was soo
        let so = s.id;
        console.log('user: ', user) 
        io.to(user.chatroom).emit('message', {user:user.username, text:message});
        callback();
    });
    s.on('disconnect', ()=>{
        console.log('disjoined');
        const user = removeUser(s.id);
        if(user) {
            io.to(user.chatroom).emit('message', { user: 'admin', text: `${user.username} has left.` });
            io.to(user.chatroom).emit('roomData', { room: user.chatroom, users: getUserInRoom(user.chatroom)});
          }
  })
})
app.use(router);
server.listen(process.env.PORT || 5000, ()=>{
    console.log('Up and running!')
});