import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import './JoinToChat.scss';

const JoinToChat = () => {
    const [username, setUsername]=useState('');
    const [chatroom, setChatroom]=useState('');
    return (
        <div className='form'>
            <h2>Join the discussion</h2>
            <input placeholder='username' type='text' onChange={(e)=>{
                setUsername(e.target.value);
            }} />
            <input placeholder='chatroom name' type='text' onChange={(e)=>{
                setChatroom(e.target.value);
            }} />
            <Link to={`/chat?username=${username}&chatroom=${chatroom}`} onClick={(e)=>{return (!username || !chatroom)?e.preventDefault():null}}>
                <button type='submit'><h3>Join</h3></button>
            </Link>
        </div>
    )
}

export default JoinToChat; //removing this line makes index.js (in components folder) not work