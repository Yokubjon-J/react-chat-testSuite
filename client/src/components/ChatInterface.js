import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000/';
let socket;

const ChatInterface = ({location}) => {
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('');
    const [messages, setMessages] = useState('');
    const [message, setMessage] = useState('');
    socket = io(ENDPOINT);
    useEffect(()=>{
        const { username, chatroom } = queryString.parse(location.search);
        setUsername(username);
        setChatroom(chatroom);
        socket.emit('joined', {username, chatroom}, (error)=>{
            if (error) alert(error);
        });

        console.log(socket)
        console.log('location.search changed: ', location.search)

        // return ()=>{
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    }, [])

    useEffect(()=>{
        socket.on('message', (message)=>{
            return setMessages([...messages, message]);
        })
    }, [messages]);

    // useEffect(() => {
    //     if (!socket) {
    //       socket = io(ENDPOINT);
    //     }
    //     const messageHandler = (message) => {
    //       setMessages(messages => [...messages, message]);
    //     }
    //     socket.on('message', messageHandler);
      
    //     // clean up message handler
    //     return () => {
    //       socket.off('message', messageHandler);
    //     } 
    // }
    //   , []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('send', message, ()=>{setMessage('')}); //after 'message' var reaches the server, 'message' var will equal empty str in client-side;
        }
    }

    console.log("watch out!: ", message, messages)

    return (
        <div>
            <input value={message}
                onChange={(e)=>{
                    e.preventDefault();
                    setMessage(e.target.value);}}
                
                onKeyPress={(e)=>{return e.key==='Enter'?sendMessage(e):null;}} />
        </div>
    )
}

export default ChatInterface;//removing this line makes index.js (in components folder) not work