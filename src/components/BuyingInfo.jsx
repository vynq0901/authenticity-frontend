import { useState, useEffect } from 'react'
import { AiFillTags, AiFillDollarCircle } from "react-icons/ai"
//components
import BidList from './BidList'
import BuyingPending from './BuyingPending'
import BuyingHistory from './BuyingHistory'


const BuyingInfo = ({user}) => {
    const [currentTab, setCurrentTab] = useState('bid')
    let body
    const handleCurrentTabChange = (tabName) => {
        setCurrentTab(tabName)
    }
    const getBidList = () => {
        body = <BidList user={user} />
    }
   
    if (currentTab === 'bid') {
        getBidList()
    } else if ( currentTab ==='pending' ) {
        body = <BuyingPending user={user}/>
    } else {
        body = <BuyingHistory user={user}/>
    }
 
    return (
        <div className="mt-5 py-4 px-8 flex-1">
            {/* BUYINGINFO HEADER */}
            <div className="flex justify-between items-center font-semibold">
                <div className="flex justify-between">
                    <div className={`mr-10 cursor-pointer ` + (currentTab === 'bid' ? 'border-b-2 border-red-700' : '')} onClick={() => handleCurrentTabChange('bid')}>Đấu giá</div>
                    <div className={`mr-10 cursor-pointer ` + (currentTab === 'pending' ? 'border-b-2 border-red-700' : '')} onClick={() => handleCurrentTabChange('pending')}>Đang xử lý</div>
                    <div className={`mr-10 cursor-pointer ` + (currentTab === 'history' ? 'border-b-2 border-red-700' : '')} onClick={() => handleCurrentTabChange('history')}>Lịch sử</div>
                </div>
                <div className="flex items-center"><AiFillDollarCircle className="text-lg mr-2" /><p>Tổng: $1853</p></div>
                <div className="flex items-center"><AiFillTags className="text-lg mr-2 text-red-700" /><p>Tổng đơn hàng: 8</p></div>
            </div>
            {/* BUYINGINFO HEADER */}
            {body}
        </div>
    )
}

export default BuyingInfo
