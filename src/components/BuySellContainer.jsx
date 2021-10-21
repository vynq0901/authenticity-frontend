import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//component
import SizeOptions from './SizeOptions'

const BuySellContainer = ({slug}) => {
    const [currentSize, setCurrentSize] = useState('4')
    const asks = useSelector(state => state.currentProductDetail.productDetail?.lowestAsks)
    const bids = useSelector(state => state.currentProductDetail.productDetail?.highestBids)
    const product = useSelector(state => state.currentProductDetail.productDetail?.product)
    const [currentAsk, setCurrentAsk] = useState({})
    const [currentBid, setCurrentBid] = useState({})

    useEffect(() => {
     if(product) {
         
        if (product.category.name === 'sneakers') {
            setCurrentSize('4')
        } else if (product.category.name === 'streetwear') {
            setCurrentSize('S')
        }
     }
    }, [product])

    const handleChangeSize = (size) => {
        const ask = asks.find(a => a._id === size)
        const bid = bids.find(b => b._id === size)
        setCurrentSize(size)
        setCurrentAsk(ask)
        setCurrentBid(bid)
    }
    
    return (
        <div className="p-4 border-[1px] border-gray-400 rounded-md">
            
            <SizeOptions handleChangeSize={handleChangeSize} currentSize={currentSize}/>
           
            <div className="flex items-center mb-3">
                <Link to={`/buy/${slug}?size=${currentSize}`} className="bg-red-600 rounded-lg text-white py-2 px-8 text-center mr-5">
                    <p className="font-bold tracking-tight leading-3">Mua</p>
                    <p className="text-[10px] my-[2px]">hoặc</p>
                    <p className="text-[12px] leading-3 font-semibold tracking-tight">Đấu Giá</p>
                </Link>
                <div>
                    <p className="text-gray-500 text-xs">Giá thấp nhất</p>
                    <p className="font-semibold text-xl">{currentAsk?.lowestPrice ? `$${currentAsk.lowestPrice}` : '--' }</p>
                </div>
            </div>

            <hr className="border-t mb-3"/>

            <div className="flex items-center">
                <Link to={`/sell/${slug}?size=${currentSize}`} className="bg-green-700 rounded-lg text-white py-2 px-9 text-center mr-5">
                    <p className="font-bold leading-3 tracking-tight">Bán</p>
                    <p className="text-[10px] my-[2px]">hoặc</p>
                    <p className="text-[12px] leading-3 font-semibold tracking-tight">Ra Giá</p>
                </Link>
                <div>
                    <p className="text-gray-500 text-xs">Giá trả cao nhất</p>
                    <p className="font-semibold text-xl">{currentBid?.highestPrice ? `$${currentBid.highestPrice}` : '--' }</p>
                </div>
            </div>
        </div>
    )
}

export default BuySellContainer
