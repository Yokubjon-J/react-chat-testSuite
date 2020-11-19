const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser,getUserInRoom, users} = require('./participants.js');

const app = express();
const router = require('./router');
// const { Console } = require('console');
// const { callback } = require('util');

const server = http.createServer(app);
const io = socket(server);
io.on('connection', (s)=>{
    let so = s.id;
    console.log('joined');
    s.on('joined', ({username, chatroom}, callback)=>{
        // let so = s.id;
        console.log('id, 1st occu: ',so);
        const {error, user} = addUser({id:so, username, chatroom});
        console.log('in 1st occu: ', user)
        console.log('eror, user: ', error, user)
        if(error) return callback(error);
        s.emit('message', {user:'admin', text:`${user.username}, welcome to ${user.chatroom}`});
        s.broadcast.to(user.chatroom).emit('message', {user:'admin', text:`${user.username}, has joined`});
        s.join(user.chatroom);
        callback();
    });
    s.on('send', (message, callback)=>{
        //console.log('current user: ', user)
        const user = getUser(so); //8
        console.log('id, 3rd occu: ',so); // 'so' will be different here
        console.log('id: ',so);
        console.log('user: ', user) //8
        //console.log('users: ',users)
        io.to(user.chatroom).emit('message', {user:user.username, text:message});
        calllback();
    });
    s.on('disconnect', ()=>{
        console.log('disjoined');
  })
})
app.use(router);
server.listen(process.env.PORT || 5000, ()=>{
    console.log('Up and running!')
});