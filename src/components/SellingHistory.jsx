import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import portfolioApi from '../api/portfolioApi'

const SellingHistory = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [orders, setOrders] = useState([])
    const getOrders = async () => {
        try {
            const response = await portfolioApi.getAskingHistory(user.id)
            console.log(response.data.orders)
            setOrders(response.data.orders)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="mt-8">
        <table>
            <thead className="border-t-[1px] border-b-[1px]">
                <tr className="text-left font-medium text-sm">
                    <th className="w-[300px] font-medium">Sản phẩm</th>
                    <th className="w-[150px] font-medium">Mã đơn hàng</th>
                    <th className="w-[150px] font-medium">Ngày mua</th>
                    <th className="w-[150px] font-medium">Giá mua</th>
                    <th className="w-[150px] font-medium">Tình trạng</th>
                </tr>
            </thead>
            {
                orders.length !== 0 ?
                <tbody>
            {
                   orders.map(order => {
                       return  <tr className="mb-2 border-b-[1px]">
                                    <td className="p-2">
                                        <Link to={`/${order.slug}`} className="flex items-center justify-between">
                                            <div className="w-[30%] mr-2">
                                                <img src={order.productImage} alt="test" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-medium line-clamp-2">{order.productName}</p>
                                                <p className="text-xs border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">US Size {order.productSize}</p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="font-medium text-sm">{order.orderNumber}</td>
                                    <td className="font-medium text-sm">{order.purchaseDate.split('T')[0]}</td>
                                    <td className="font-medium text-sm">${order.purchasePrice}</td>
                                    <td className="font-medium text-sm">{order.status}</td>
                             </tr>
                   })
               }
            </tbody>
            : <div className="absolute left-1/2 top-1/3 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
            }
        </table>
    </div>
    )
}

export default SellingHistory
