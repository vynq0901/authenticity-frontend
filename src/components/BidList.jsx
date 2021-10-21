import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiPencil, BiTrash } from "react-icons/bi"
import { useSelector } from 'react-redux'
import portfolioApi from '../api/portfolioApi'
import buyingApi from '../api/buyingApi'
import { toast } from 'react-toastify'


const BidList = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deletedBid, setdeletedBid] = useState('')
    const [bids, setBids] = useState([])
    const getBids = async () => {
        try {
            const response = await portfolioApi.getBids(user.id)
            console.log(response)
            setBids(response.data.bids)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getBids()
    }, [])

    const handleDeleteModal = (bid) => {
        setdeletedBid(bid)
        setOpenDeleteModal(!openDeleteModal)
    }

    const handleDeleteBid = async (id) => {
        try {
            await buyingApi.deleteBid(id)
            const newBids = bids.filter(bid => bid.bidInfo.bidId !== deletedBid.bidInfo.bidId)
            toast.success('Xoá thành công !!')
            setBids(newBids)
            setOpenDeleteModal(false)
        } catch (error) {
            
        }
    }
    return (
        <div className="mt-8">
        <table>
            <thead className="border-t-[1px] border-b-[1px]">
                <tr className="text-left font-normal text-sm">
                    <th className="w-[250px]">Sản phẩm</th>
                    <th className="w-[150px]">Giá trả</th>
                    <th className="w-[150px]">Giá trả cao nhất</th>
                    <th className="w-[150px]">Giá bán thấp nhất</th>
                    <th className="w-[150px]">Hết hạn</th>
                </tr>
            </thead>
           {
               bids.length !== 0 ? 
               <tbody>
               {
                   bids.map((bid, index) => {
                   return  <tr className="mb-2 border-b-[1px]" key={bid.bidInfo.bidId}>
                       <td className="p-2">
                           <Link to={`/${bid.bidInfo.slug}`} className="flex items-center justify-between">
                               <div className="w-[30%] mr-2">
                                   <img src={bid.bidInfo.productImage} className="w-full" alt="product" />
                               </div>
                               <div className="flex-1">
                                   <p className="text-xs font-medium line-clamp-2">{bid.bidInfo.productName}</p>
                                   <p className="text-xs border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size {bid.bidInfo.productSize}</p>
                               </div>
                           </Link>
                       </td>
                       <td className="font-medium">${bid.bidInfo.price}</td>
                       <td className="font-medium">${bid.highestBid ? bid.highestBid : '--'}</td>
                       <td className="font-medium">${bid.lowestAsk ? bid.lowestAsk : '--'}</td>
                       <td className="font-medium">{bid.bidInfo.expireDate.split('T')[0]}</td>
                       <td>
                           <Link to={`/buy/${bid.bidInfo.slug}?size=${bid.bidInfo.productSize}`} className="inline-block mr-2 cursor-pointer"><BiPencil className="inline-block"/></Link>
                           <span className="inline-block mr-2 cursor-pointer" onClick={() => handleDeleteModal(bid)}><BiTrash className="inline-block"/></span>
                       </td>
                   </tr>
                   })
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
                        <img src={deletedBid.bidInfo?.productImage} alt="product" />
                    </div>
                    <p className="text-xs font-semibold">{deletedBid.bidInfo?.productName}</p>
                    <p className="text-xs mx-auto my-1 border-gray-300 border-[1px] w-[fit-content] px-[2px] py-[1px] rounded-lg">Size: {deletedBid.bidInfo?.productSize}</p>
                </div>
                <p className="my-2 text-sm font-semibold text-center">Bạn có chắc chắn xóa ?</p>
                <div className="flex justify-between">
                    <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={handleDeleteModal}>Hủy</button>
                    <button className="bg-red-700 font-semibold text-sm text-white px-4" onClick={() => handleDeleteBid(deletedBid.bidInfo?.bidId)}>Xóa</button>
                </div>
            </div>
            {/* DELETE MODAL END */}
          
            <div className={"absolute top-0 right-0 left-0 bottom-0 z-[51] opacity-30 bg-black " + (openDeleteModal ? '' : "hidden")}></div>
          </div>
    )
}

export default BidList
