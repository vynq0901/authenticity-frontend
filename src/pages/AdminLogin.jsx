import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../redux/actions/authActions'
//components
import Spinner from '../components/Spinner'

const AdminLogin = () => {
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
            if (user.role === 'admin') history.push('/admin')
        }
    }, [user])
    return (
       <div className="flex items-center justify-center">
            <form className="w-[400px] translate-y-1/2 border-[1px] p-4 border-gray-400 rounded-md" onSubmit={handleSubmit}>
                <h1 className="font-semibold text-center text-2xl mb-4">Đăng nhập quản trị</h1>
                <div>
                    <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder="Tên tài khoản" name="username" onChange={handleOnChange} />
                </div>
                <div>
                    <input className="text-sm border-[1px] rounded-sm p-2 mb-2 w-full" placeholder="Mật khẩu" type="password" name="password" onChange={handleOnChange} />
                </div>
                <button className="text-center text-xs w-full bg-red-700 text-white rounded-sm font-semibold py-2"> {loading ? <Spinner /> : <p>Đăng nhập</p>} </button>   
            </form>
       </div>
    )
}

export default AdminLogin
