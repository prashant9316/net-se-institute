console.log("chatroom js loaded")
const socket = io()
console.log(subject.subjectId)
const roomid = subject.subjectId;
let username = userProfile.name;
console.log("User name: " + username)
const chatRoom = document.querySelector('.chat-box');
const sendButton = document.getElementById('add-chat-button');
const messageField = document.querySelector('.chat-input');



socket.emit('join-chatroom', roomid, username);

socket.on('join-chatroom', (conc, cnames) => {
    console.log("connected to a room with " + conc);
    console.log("Socketname: " + cnames)
})

sendButton.addEventListener('click' , () => {
    const msg = messageField.value;
    console.log("message to be added: "+ msg);
    console.log(msg, username, roomid)
    messageField.value = '';
    socket.emit('chatroom-message', msg, username, roomid);
    // chatRoom.scrollTop = document.getElementById('chat-box ul li:last-child').scrollHeight;
})

messageField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
});


socket.on('chatroom-message', (msg, sendername, time) => {
    addMessage(msg, sendername, time)
})

const addMessage = (msg, sendername, time) => {
    if(sendername == username){
        chatRoom.innerHTML += `<li class="chat-right ">
        <div class="chat-hour">${time}</div>
        <div class="chat-text bg-primary text-white">${msg}</div>
        <div class="chat-avatar">
            <img src="https://www.bootdey.com/img/Content/avatar/avatar4.png"
                alt="Retail Admin">
            <div class="chat-name">${sendername}</div>
        </div>
    </li>`
    } else {
        chatRoom.innerHTML += `<li class="chat-left">
        <div class="chat-avatar">
            <img src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                alt="Retail Admin">
            <div class="chat-name">${sendername}</div>
        </div>
        <div class="chat-text w-75">${msg}</div>
        <div class="chat-hour">${time}</div>
    </li>`
    }
}


const addOldChats = async() => {
    console.log("Loading Chats on the screen");

    const data = await fetch(`/chat/${roomid}`, {
        method: 'POST'
    }).then(t => t.json())
    .then(res => {
        console.log(res)
        return res.data
    })
    .catch(e=>{
        alert("Error fetching old chats")
    })
    

    data.messages.map(msg => {
        addMessage(msg.message, msg.username, msg.time)
    })

    chatRoom.scrollTop = chatRoom.scrollHeight;
}
