import React from 'react'

const LatestNews = () => {
    return (
        <div className="col-span-5">
            <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Tin mới nhất</h2>
                <p className="text-sm font-medium">Xem tất cả</p>
            </div>
            <News />
            <News />
            <News />
            <News />
            <News />
        </div>
    )
}

export default LatestNews


//news components

const News = () => {
    return (
        <div className=" border-solid border-b-2 border-gray-200 mb-4 pb-2">
            <h1 className="font-semibold">That's 5 | Amyl and The Sniffers</h1>
            <h3 className="font-medium text-xs text-gray-500">Admin - 09/14/2021</h3>
        </div>
    )
}



