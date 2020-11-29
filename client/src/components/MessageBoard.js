import React from 'react';
import './MessageBoard.scss';
import MessageList from './MessageList';

export default function MessageBoard({chatroom, message, sendMessage, setMessage, messages, username}) {
    return (
        <div className='body'>
        <div className='container'>
        <div className='messageBoard'>
            <div className='topBar'>
                <div className='forGroupName'>
                    <a href='/'><img className='imgOne' src='https://d29fhpw069ctt2.cloudfront.net/icon/image/39219/preview.png' alt='close' /></a>
                    <h4>{chatroom}</h4>
                </div>
                <img className='imgOne' src='https://www.clipartmax.com/png/full/42-422885_glossy-red-icon-button-clip-art-at-clker-online-status-icon-png.png' alt='online'/>
            </div>
            <MessageList messages={messages} username={username}/>
        </div>
        <div className='inputField'>
            <input
              type='text'
              value={message}
              onKeyPress={e=>e.key==='Enter'?sendMessage(e):null}
              onChange={e=>setMessage(e.target.value)}
            />
            <input type='submit' onClick={e=>sendMessage(e)} />
        </div>
        </div>
        </div>
    )
}
