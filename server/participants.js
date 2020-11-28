const users = []; 

const addUser = ({id, username, chatroom}) => {
    // id = id;
    console.log('id in addUser: ', id)
    username = username.trim().toLowerCase();
    chatroom = chatroom.trim().toLowerCase();
    const ifExists = users.find((user)=>{return user.chatroom === chatroom && user.username === username});
    if (ifExists) {
        return {error: 'username is taken'};
    }
    const user = {id,username,chatroom}
    users.push(user); 
    console.log(users)
    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user)=>{return user.id===id});
    if (index) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    console.log(users)
    return users.find((user)=>{return user.id===id});
}

const getUserInRoom = () => {
    users.filter((user)=>{return user.chatroom === chatroom});
}

module.exports = {addUser, removeUser, getUser,getUserInRoom, users}