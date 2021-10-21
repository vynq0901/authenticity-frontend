import React from 'react'

const Spinner = () => {
    return (
        <div className= "inline-block my-[-2px]">
            <div className="w-[20px] h-[20px] rounded-[100%] border-2 border-solid border-white border-r-[transparent] border-l-[transparent] animate-spin"></div>
        </div>
    )
}

export default Spinner
