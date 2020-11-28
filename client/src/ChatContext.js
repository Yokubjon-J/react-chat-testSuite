import React, {createContext, useState} from 'react';

export const ChatContext = createContext();
export let ChatContextProvider = (props) => {
    let [retainId, setRetainId] = useState('testing-testing');
    return (
        <ChatContext.Provider value={{retainId, setRetainId}}> 
            {props.children}
        </ChatContext.Provider>
    )
}