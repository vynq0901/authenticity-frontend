import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authActions'
import { BiSupport, BiUser } from "react-icons/bi"

import SupporterChat from '../components/SupporterChat'


const SupporterPage = () => {
    const [rooms, setRooms] = useState([])
    const [socket, setSocket] = useState(null)
   
    const [currentRoom, setCurrentRoom] = useState({})
    const dispatch = useDispatch()
    
    
    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
    }
    
    useEffect(() => {
        if (!socket) {
            const st = io.connect('http://localhost:5000')
            setSocket(st)
        }
        if (socket) {
            socket.emit('login_admin', {isAdmin: true})
        }  
    }, [socket])
    useEffect(() => {
        if (socket) {
            socket.emit('get_users_list')
            socket.on('update_users', (data) => {
                setRooms(data)
            })
        }
    }, [socket])
    useEffect(() => {
        if (socket) {
            socket.emit('admin_join_room', {isAdmin: true, room: currentRoom.room})
        }
    }, [socket, currentRoom])
    return ( 
        <>
            <div className="flex items-center justify-between py-3 px-7 border-b border-solid border-gray-400 z-50">
                <Link to="/" className="logo">
                    <span className={"tracking-widest text-red-700"}>Authenti</span>
                    <span className={"tracking-widest text-gray-400"}>city</span>
                </Link>
                <div className="font-semibold cursor-pointer" onClick={handleLogout}>
                    <p>Đăng xuất</p>
                </div>
            </div>
            <div className="flex items-center m-4 text-2xl text-white bg-red-700 w-[fit-content] p-2 rounded-xl ">
                <BiSupport className="mr-4 text-4xl" />
                <p className="font-semibold capitalize">Nhân viên hỗ trợ</p>
            </div>
            <div className="flex">
                <div className="w-[25%] mr-10" >  
                    {
                        rooms.map(r => (
                            <div className={"p-4 bg-gray-200 " + (currentRoom.room === r.room && "border-r-4 border-red-700")} onClick={() => setCurrentRoom(r)}>
                                <div className="flex items-center font-medium text-lg">
                                    <BiUser className="text-2xl mr-4" /> 
                                    <p className=" text-center">{r.room}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
               <SupporterChat socket={socket} currentRoom={currentRoom} />
            </div>
        </>
    )
}

export default SupporterPage
