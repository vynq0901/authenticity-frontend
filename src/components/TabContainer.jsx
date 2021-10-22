import React from 'react'
//components
import Tab from './Tab'
import { FiUser, FiArchive } from "react-icons/fi"
import { GrMoney, GrAddCircle } from "react-icons/gr";


const TabContainer = ({className, user, children}) => {
    // const user = useSelector(state => state.userLogin.userInfo)
    return (
        <div className={`pb-3 pt-3 pl-3 mb-[-20px] bg-gray-100 ` + className }>
            <p className="font-bold text-xl mb-7">{user.name}</p>
          {
              children
          }
        </div>
    )
}

export default TabContainer
 