import React, { useState, useEffect } from 'react'
import {BiSend} from 'react-icons/bi'
const SupporterChat = ({socket, currentRoom}) => {
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: currentRoom.room,
                isAdmin: true,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setMessages([...messages, {isAdmin: true, message: currentMessage}])
        }
    }
    const handleMessageChange = (msg) => {
        setCurrentMessage(msg)
    }
    useEffect(() => {
        if (socket) {
         socket.on('receive_message', (data) => {
            setMessages([...messages, {
                isAdmin: false,
                message: data.message
           }])
          
        })
     }
     }, [socket])
    return (
        <div className="flex-1 p-8 border-[2px] border-black mr-10 rounded-lg">
            <p className="font-medium text-xl">Chat với: {currentRoom.room}</p>
            <div>
                <div className="h-[300px] border-[1px] border-black mb-4 rounded-lg">
                    {
                        messages.map(msg => (<p>{msg.message}</p>))
                    }
                </div>
                <div className="flex items-center">
                    <input className="border-[1px] border-black flex-1 mr-4 p-2 rounded-lg" onChange={(event) => handleMessageChange(event.target.value)}/>
                    <button onClick={sendMessage} className="text-white bg-red-700 p-2 font-semibold rounded-lg"><BiSend className="inline-block mr-1" />Gửi</button>
                </div>
            </div>
        </div>
    )
}

export default SupporterChat
