import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../redux/actions/authActions'
import { useHistory } from 'react-router'

import Spinner from './Spinner'

const Login = ({toggleActive, onToggleActive}) => {
    const loading = useSelector(state => state.userLogin.loading)
    const user = useSelector(state => state.userLogin.userInfo)
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch()
    const handleOnChange = (event) => {
       setUserInfo({
           ...userInfo,
           [event.target.name]: event.target.value
       })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
       dispatch(login(userInfo.username, userInfo.password))
    }
    useEffect(() => {
        if (user) {
            history.goBack()
        }
    }, [user])
    return (
        <form className={toggleActive === 2 ? "" : "hidden"} onSubmit={handleSubmit}>
        <div>
            <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder="Tên tài khoản" name="username" onChange={handleOnChange} />
        </div>
        <div>
            <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder="Mật khẩu" type="password" name="password" onChange={handleOnChange} />
        </div>
        <button className="text-center text-xs w-full bg-red-700 text-white rounded-sm font-semibold py-2"> {loading ? <Spinner /> : <p>Đăng nhập</p>} </button>
        <div  className="text-xs mt-3 flex justify-between">
            <p>Chưa có tài khoản ? <span className="text-red-700 font-semibold underline cursor-pointer" onClick={() => onToggleActive(1)}>Đăng kí</span></p>
            <p className="text-red-700 font-semibold underline cursor-pointer">Quên mật khẩu</p>
        </div>
     
    </form>
    )
}

export default Login
