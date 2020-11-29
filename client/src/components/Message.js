import React from 'react';
import "./Message.scss";

function Message({message:{user, text}, username}) {
    let byCurrentUser = false;
    const trimmed = username.trim().toLowerCase();
    if (user === trimmed) {
        byCurrentUser = true;
    }
    return (
        byCurrentUser ? (
            <div className='mssgContainer right'>
                <p className='author'>{trimmed}</p>
                <div className='box blue'>
                    <p className='content'>{text}</p>
                </div>
            </div>
        ) : (
            <div className='mssgContainer left'>
                <div className='box white'>
                    <p className='content'>{text}</p>
                </div>
                <p className='author'>{user}</p>
            </div>
        )
    )
}

export default Message;
