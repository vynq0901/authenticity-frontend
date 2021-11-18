import React, {useEffect, useState} from 'react'
import { VscChromeClose } from "react-icons/vsc"
import productApi from '../../../api/productApi'

const ProductSizeInfo = ({product, size, onToggle, view}) => {
    const [data, setData] = useState([])
    const getAllBids = async () => {
        try {
            const response = await productApi.getAllBids(product, size)
            console.log(response)
            setData(response.bids)
        } catch (error) {
            console.log(error.response)
        }
    }
    const getAllAsks = async () => {
        try {
            const response = await productApi.getAllAsks(product, size)
            setData(response.asks)
        } catch (error) {
            console.log(error.response)
        }
    }
    const getAllSales = async () => {
        try {
            const response = await productApi.getAllSale(product, size)
            setData(response.sales)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        if (view === 'bid') getAllBids()
        if (view === 'ask') getAllAsks()
        if (view === 'sale') getAllSales()
    }, [])
    useEffect(() => {       
        document.body.style.overflow = "hidden"     
        return () => {
            document.body.style.overflow = "unset"               
        }
    }, [])
    
    return (
        <div className="overflow-auto">
            {
                view === 'bid' &&  
                                        <>
                                            <div className="fixed animate-slide-left top-0 right-0 w-[400px] h-full z-50 bg-white z-[51] p-4">
                                            <div className="mb-4 flex justify-between">
                                                <div>
                                                    <h2 className="font-semibold">Các phiếu đấu giá</h2>
                                                    <p className="text-sm text-gray-400">(Giá chưa bao gồm phí xử lý)</p>
                                                </div>
                                                <button onClick={onToggle}><VscChromeClose className="text-2xl"/></button>
                                            </div>
                                            <table>
                                                <thead className="border-t-[2px] border-black border-b-[2px]">
                                                    <tr>
                                                        <th className="w-[100px]">Size</th>
                                                        <th className="w-[100px]">Giá</th>
                                                        <th className="w-[100px]">Ngày</th>
                                                        <th className="w-[100px]">Giờ</th>
                                                    </tr>
                                                </thead>
                                               
                                                   {
                                                      data.length !== 0 ? 
                                                            <tbody>
                                                                {
                                                                    data.map(bid => (
                                                                        <tr className="font-medium text-sm leading-10 border-b-[1px]">
                                                                            <td className="text-center">{bid.productSize}</td>
                                                                            <td className="text-center">$ {bid.price}</td>
                                                                            <td className="text-center">{new Date(bid.createdAt).toLocaleDateString()}</td>
                                                                            <td className="text-center">{new Date(bid.createdAt).toLocaleTimeString()}</td>
                                                                        </tr>
                                                                    )) 
                                                                }
                                                            </tbody> :
                                                            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
                                                   }
                                               
                                            </table>
                                        </div>
                                        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-75" onClick={onToggle}></div>
                                        </>
            }
            {
            view === 'ask' &&  
                                    <>
                                        <div className="fixed animate-slide-left top-0 right-0 w-[400px] h-full z-50 bg-white z-[51] p-4">
                                        <div className="mb-4 flex justify-between">
                                            <div>
                                                <h2 className="font-semibold">Tất cả giá bán</h2>
                                                <p className="text-sm text-gray-400">(Giá chưa bao gồm phí xử lý)</p>
                                            </div>
                                            <button onClick={onToggle}><VscChromeClose className="text-2xl"/></button>
                                        </div>
                                        <table>
                                            <thead className="border-t-[2px] border-black border-b-[2px]">
                                                <tr>
                                                    <th className="w-[100px]">Size</th>
                                                    <th className="w-[100px]">Giá</th>
                                                    <th className="w-[100px]">Ngày</th>
                                                    <th className="w-[100px]">Giờ</th>
                                                </tr>
                                            </thead>
                                            {
                                                      data.length !== 0 ? 
                                                            <tbody>
                                                                {
                                                                    data.map(ask => (
                                                                        <tr className="font-medium text-sm leading-10 border-b-[1px]">
                                                                            <td className="text-center">{ask.productSize}</td>
                                                                            <td className="text-center">$ {ask.price}</td>
                                                                            <td className="text-center">{new Date(ask.createdAt).toLocaleDateString()}</td>
                                                                            <td className="text-center">{new Date(ask.createdAt).toLocaleTimeString()}</td>
                                                                        </tr>
                                                                    )) 
                                                                }
                                                            </tbody> :
                                                            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
                                            }
                                        </table>
                                    </div>
                                    <div className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-75" onClick={onToggle}></div>
                                    </>
            }
             {
            view === 'sale' &&  
                                    <>
                                        <div className="fixed animate-slide-left top-0 right-0 w-[400px] h-full z-50 bg-white z-[51] p-4">
                                        <div className="mb-4 flex justify-between">
                                            <div>
                                                <h2 className="font-semibold">Tất cả giá đã bán</h2>
                                                <p className="text-sm text-gray-400">(Giá chưa bao gồm phí xử lý)</p>
                                            </div>
                                            <button onClick={onToggle}><VscChromeClose className="text-2xl"/></button>
                                        </div>
                                        <table>
                                            <thead className="border-t-[2px] border-black border-b-[2px]">
                                                <tr>
                                                    <th className="w-[130px]">Size</th>
                                                    <th className="w-[130px]">Giá</th>
                                                    <th className="w-[130px]">Ngày</th>
                                                </tr>
                                            </thead>
                                            {
                                                      data.length !== 0 ? 
                                                            <tbody>
                                                                {
                                                                    data.map(sale => (
                                                                        <tr className="font-medium text-sm leading-10 border-b-[1px]">
                                                                            <td className="text-center">{sale.productSize}</td>
                                                                            <td className="text-center">$ {sale.salePrice}</td>
                                                                            <td className="text-center">{new Date(sale.createdAt).toLocaleDateString()}</td>
                                                                          
                                                                        </tr>
                                                                    )) 
                                                                }
                                                            </tbody> :
                                                            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 text-sm underline font-semibold capitalize">Không có dữ liệu</div>
                                            }
                                        </table>
                                    </div>
                                    <div className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-75" onClick={onToggle}></div>
                                    </>
            }
       </div>
    )
}

export default ProductSizeInfo
