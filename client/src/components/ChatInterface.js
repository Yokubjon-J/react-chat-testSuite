import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import MessageBoard from './MessageBoard';
const ENDPOINT = 'http://localhost:5000/';
let socket;

const ChatInterface = ({location}) => {
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    
    useEffect(()=>{
        const { username, chatroom } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setUsername(username);
        setChatroom(chatroom);
        socket.emit('joined', {username, chatroom}, (error)=>{
            if (error) alert(error);
        });

        console.log(socket)
        console.log('location.search: ', location.search)

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message', (message)=>{
            return setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, []);

    
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('send', message, ()=>{setMessage('')}); //after 'message' var reaches the server, 'message' var will equal empty str in client-side;
        }
    }

    console.log("watch out!: ", message, messages)

    return (
        <div>
            <MessageBoard chatroom={chatroom} message={message} 
                setMessage={setMessage} sendMessage={sendMessage} 
                messages={messages} username={username}
            />
            {/* <Input /> */}
            {/* <input value={message}
                onChange={(e)=>{
                    e.preventDefault();
                    setMessage(e.target.value);}}
                
                onKeyPress={(e)=>{return e.key==='Enter'?sendMessage(e):null;}} /> */}
        </div>
    )
}

export default ChatInterface;//removing this line makes index.js (in components folder) not work