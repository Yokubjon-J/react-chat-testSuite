import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "./Message";
import './MessageList.scss';

function MessageList({messages, username}) {
    return (
        <ScrollToBottom className='messageBoard'>
            
            {messages.map((message, i) => <div key={i}><Message message={message} username={username}/></div>)}
            
        </ScrollToBottom>
    )
}

export default MessageList
