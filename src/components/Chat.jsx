import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import {BiChat, BiSend } from "react-icons/bi"

//io


const Chat = () => {
    const [email, setEmail] = useState("")
    const [toggle, setToggle] = useState(false)
    const [socket, setSocket] = useState(null)
    const [connect, setConnect] = useState(false)
    const [admin, setAdmin] = useState({})
    const [currentMessage, setCurrentMessage] = useState("")
    const [messages, setMessages] = useState([]) 
    const joinRoom = () => {
        if (email !== "") {
            socket.emit("join_room", email)
            setConnect(true)
        }
    }
  
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: email,
                isAdmin: false,
                user: email,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setMessages([...messages, {isAdmin: false, message: currentMessage}])
        }
    }
    useEffect(() => {
        if (socket) {
            socket.on('receive_message', (data) => {
                console.log(data)
               setMessages([...messages, {
                    isAdmin: true,
                    message: data.message
               }])
           })
        }
    }, [socket])

    useEffect(() => {
        if (!socket) {
            const st = io.connect('http://localhost:5000')
            setSocket(st)
        }
     
    }, [socket])
    return (
        <div className="fixed z-50  bottom-[100px] left-[40px]" >
            <div className="p-3 rounded-full bg-red-700 cursor-pointer" onClick={() => setToggle(!toggle)}>
                <BiChat className="text-white text-2xl" />
            </div>
            {
                toggle && <div className="border-red-700 h-[300px] absolute border-2 w-[300px] top-[-280px] left-full bg-white rounded-lg">
                        {
                        !connect && <>
                                            <div className="p-4">
                                                <p className="text-base text-center font-medium my-4 bg-red-700 text-white py-2 rounded-lg">Chat với nhân viên hỗ trợ</p>
                                                <div>
                                                    <p className="font-medium">Nhập email của bạn</p>
                                                    <input className="p-2 text-sm border-[1px] border-gray-200 w-full my-4" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />                                                              
                                                    <button className="text-sm font-medium block mx-auto bg-red-700 text-white p-2 rounded-lg" onClick={joinRoom}>Bắt đầu chat</button>
                                                </div>
                                            </div>
                                        </>
                        }
                        {
                            connect && <div className="p-2 flex flex-col">
                                            <div className="h-[250px] bg-pink-300 w-full">
                                                {
                                                    messages.map(msg => <p>{msg.message}</p>)
                                                }
                                            </div>
                                             <div className="flex items-center">                                              
                                                <input className="border-[1px] border-black flex-1 p-1 rounded-md text-sm mr-4" onChange={(event) => setCurrentMessage(event.target.value)}/>
                                                <button onClick={sendMessage} className="text-white bg-red-700 p-1 text-sm font-semibold rounded-md"><BiSend className="inline-block mr-1" />Gửi</button>
                                            </div>
                                        </div>  
                        }
                    </div>
            }
        </div>
    )
}

export default Chat
