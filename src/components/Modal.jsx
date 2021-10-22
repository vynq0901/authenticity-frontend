import React, { useEffect } from 'react'
import  {createPortal} from 'react-dom'

const Modal = ({show, toggleModal, children}) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [show])
    return (
        <>
            {
           show ?
         createPortal(<div className="">
         <div  className="z-[52] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4">
             {
                 children
             }
         </div>
         <div className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-75"></div>
     </div>, document.body) : null
        }
        </>
    )
}

export default Modal


