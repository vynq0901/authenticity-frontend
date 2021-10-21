import React from 'react'
//components
import Tab from './Tab'
import { FiUser, FiArchive } from "react-icons/fi"
import { GrMoney, GrAddCircle } from "react-icons/gr";


const TabContainer = ({className, user}) => {
    // const user = useSelector(state => state.userLogin.userInfo)
    return (
        <div className={`pb-3 pt-3 pl-3 mb-[-20px] bg-gray-100 ` + className }>
            <p className="font-bold text-xl mb-7">{user.name}</p>
            <Tab icon={<FiUser className="text-[30px] mr-3" />} path='/account/info' tabName="Thông Tin" description="Thông tin của bạn" />
            <Tab icon={<FiArchive className="text-[30px] mr-3" />} path='/account/buying' tabName="Mua" description="Thông tin đấu giá, các đơn hàng của bạn" />
            <Tab icon={<GrMoney className="text-[30px] mr-3" />} path='/account/selling' tabName="Bán" description="Thông tin hoạt động bán sản phẩm của bạn" />
            <Tab icon={<GrAddCircle className="text-[30px] mr-3" />} path='/account/following' tabName="Đang theo dõi" description="Thông tin các sản phẩm bạn theo dõi" />
        </div>
    )
}

export default TabContainer
 