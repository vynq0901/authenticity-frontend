import React, {useEffect, useState} from 'react'
import { HiArrowNarrowDown } from "react-icons/hi"
import staffApi from '../api/staffApi'
import useModal from '../hooks/useModal'
import { toast } from 'react-toastify'
//components
import Modal from './Modal'

const ProccessingOrders = ({typeOrder, title}) => {
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState('')
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState({})

    let updateStatus = ''
    if (typeOrder === 'incoming-orders') updateStatus = 'đã tiếp nhận'
    if (typeOrder === 'received-orders') updateStatus = 'đang kiểm tra'
    if (typeOrder === 'checked-orders') updateStatus = 'đã gửi hàng'
    if (typeOrder === 'shipped-orders') updateStatus = 'hoàn thành'
    if (typeOrder === 'checking-orders') updateStatus = 'đã kiểm tra'
    const getOrders = async () => {
        try {
            const response = await staffApi.getOrders(typeOrder)
            setOrders(response.orders)
    
        } catch (error) {
            console.log(error.response)
        }
    }


    const handleOpenModal = (order) => {
        setSelectedOrder(order)
        setModal('update')
        toggleModal()
    }
    const handleCancelModal = (order) => {
        setSelectedOrder(order)
        setModal('cancel')
        toggleModal()
    }
    const handleUpdateOrder = async () => {
        try {
            const response = await staffApi.updateOrder(selectedOrder._id, {status: updateStatus})
            toggleModal()
            toast.success("Cập nhật thành công !")
           
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleCancelOrder = async () => {
        try {
            const response = await staffApi.updateOrder(selectedOrder._id, {status: 'đã hủy'})
            toggleModal()
            toast.success("Cập nhật thành công !")
         
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getOrders()
        console.log(typeOrder)
       
    }, [typeOrder])
    return (
        <div className="flex-1 mt-10 py-4 px-8">
            <h1 className="font-bold text-xl mb-4">{title}</h1>
            <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px] text-center">Mã đơn hàng</th>
                            <th className="w-[150px] text-center">Ảnh sản phẩm</th>
                            <th className="w-[200px] text-center">Tên sản phẩm</th>
                            <th className="w-[100px] text-center">Kích cỡ</th>
                            <th className="w-[200px] text-center">Trạng thái</th>
                            <th className="w-[150px] text-center">Ngày cập nhật</th>
                            <th className="w-[250px] text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            orders.map(order => (
                                <tr>
                                    <td className="text-sm font-medium text-center">{order.orderNumber}</td>
                                    <td className="">
                                        <img className="w-[60%] mx-auto" src={order.product.images.smallImageUrl} />
                                    </td>
                                    <td className="text-sm font-medium text-center line-clamp-2">{order.product.name}</td>
                                    <td className="text-sm font-medium text-center">{order.productSize}</td>
                                    <td className="text-xs font-medium capitalize text-center">{order.status}</td>
                                    <td className="text-sm font-medium text-center">{order.updatedAt?.toString().split('T')[0]}</td>
                                    <td className="text-center h-full">
                                        <button className="bg-red-700 text-white text-xs font-semibold py-2 px-2 rounded-md" onClick={() => handleOpenModal(order)}>Cập nhật</button>
                                        {
                                            typeOrder === 'checking-orders' && <button className="bg-gray-500 text-white text-xs font-semibold py-2 px-2 ml-2 rounded-md" onClick={() => handleCancelModal(order)}>Hủy đơn</button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
                        {
                            modal === 'update' ?    <Modal show={show}>
                                                        <h1 className="text-sm font-semibold">Cập nhật trạng thái đơn hàng</h1>
                                                        <p className="text-center font-bold">{selectedOrder.orderNumber}</p>
                                                        <div className="flex flex-col items-center justify-center">
                                                            <HiArrowNarrowDown className="my-2" />
                                                            <p className="capitalize font-bold text-center mb-3">{updateStatus}</p>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <button className="border-[1px] font-semibold text-sm border-black px-4 py-1 bg-white w-[40%]" onClick={toggleModal}>Hủy</button>
                                                            <button className="bg-red-700 font-semibold text-sm text-white px-4 py-1" onClick={handleUpdateOrder}>Cập nhật</button>
                                                        </div>
                                                    </Modal>
                        :
                                                    <Modal show={show}>
                                                        <h1 className="text-sm font-semibold">Cập nhật trạng thái đơn hàng</h1>
                                                        <p className="text-center font-bold">{selectedOrder.orderNumber}</p>
                                                        <div className="flex flex-col items-center justify-center">
                                                            <HiArrowNarrowDown className="my-2" />
                                                            <p className="capitalize font-bold text-center mb-3">Đã hủy</p>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <button className="border-[1px] font-semibold text-sm border-black px-4 py-1 bg-white w-[40%]" onClick={toggleModal}>Hủy</button>
                                                            <button className="bg-red-700 font-semibold text-sm text-white px-4 py-1" onClick={handleCancelOrder}>Hủy đơn</button>
                                                        </div>
                                                    </Modal>
                        }
        </div>
    )
}

export default ProccessingOrders
