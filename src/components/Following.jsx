import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import portfolioApi from '../api/portfolioApi'
import {  BiTrash } from "react-icons/bi"
import { toast } from 'react-toastify'

const Following = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [products, setProducts] = useState([])
    const [deletedFollowing, setDeletedFollowing] = useState('')
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const getFollowingProduct = async () => {
        try {
            const response = await portfolioApi.getFollowing(user.id)
            setProducts(response.results)
        console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleDelete = async (followingId) => {
        try {
            const response = await portfolioApi.deleteFollowing(followingId)
            toast.success('Xóa thành công')
            setProducts(response.updatedFollowing)
            setOpenDeleteModal(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteModal = (following) => {
        setDeletedFollowing(following)
        setOpenDeleteModal(!openDeleteModal)
    }
    useEffect(() => {
        getFollowingProduct()
    }, [])
    return (
        <div className="p-4">
            <p className="my-8 font-bold text-xl capitalize">Sản phẩm đang theo dõi</p>
            <table>
            <thead className="border-t-[1px] border-b-[1px]">
                <tr className="text-left font-semibold text-sm ">
                    <th className="w-[250px]">Sản phẩm</th>
                    <th className="w-[200px]">Giá bán thấp nhất</th>
                    <th className="w-[200px]">Lần bán gần nhất</th>
                    <th className="w-[200px]"></th>
                </tr>
            </thead>
            {
               products.length !== 0 ?
               <tbody className="p-4">
                   {
                       products.map(product => (
                           <tr key={product.followingId}>
                                <td className="p-2">
                                    <Link to={`/${product.productSlug}`} className="flex items-center justify-between">
                                        <div className="w-[30%] mr-2">
                                            <img src={product.productImage} className="w-full" alt="product" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-medium line-clamp-2">{product.productName}</p>
                                            <p className="text-xs border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size {product.productSize}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="font-semibold">$ {product.lowestAsk ? product.lowestAsk : '--'}</td>
                                <td className="font-semibold">$ {product.lastSale ? product.lastSale : '--'}</td>
                                <td>
                                    <div className="text-center cursor-pointer" onClick={() => handleDeleteModal(product)}>
                                        <BiTrash className="inline-block font-bold"/>
                                    </div>
                                </td>
                           </tr>
                       ))
                   }
               </tbody>
               :
               <div className="absolute left-1/2 top-1/3 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
            }
        </table>
            {/* DELETE MODAL */}
            <div className={"absolute z-[52] bg-white rounded-md top-0 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-4 animate-modal-open " + (openDeleteModal ? '' : "hidden")}>
                <div>
                    <div className="w-[100px] mx-auto">
                        <img src={deletedFollowing.productImage} alt="product" />
                    </div>
                    <p className="text-xs font-semibold">{deletedFollowing.productName}</p>
                    <p className="text-xs mx-auto my-1 border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size: {deletedFollowing.productSize}</p>
                </div>
                <p className="my-2 text-sm font-semibold text-center">Bạn có chắc chắn xóa ?</p>
                <div className="flex justify-between">
                    <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={handleDeleteModal}>Hủy</button>
                    <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={() => handleDelete(deletedFollowing.followingId)}>Xóa</button>
                </div>
            </div>
            {/* DELETE MODAL END */}
          
            <div className={"absolute top-0 right-0 left-0 bottom-0 z-[51] opacity-30 bg-black " + (openDeleteModal ? '' : "hidden")}></div>
        </div>
    )
}

export default Following
