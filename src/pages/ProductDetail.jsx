import React, { useEffect, useState } from 'react'
import {HiHeart} from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import productApi from '../api/productApi'
import portfolioApi from '../api/portfolioApi'
import { getProduct } from '../redux/actions/productActions'
import useModal from '../hooks/useModal'
import { toast } from 'react-toastify'
//components
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import BuySellContainer from '../components/BuySellContainer'
import RecentlyViewed from '../components/RecentlyViewed'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'



const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [followingSize, setFollowingSize] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {show, toggleModal} = useModal()
    const dispatch = useDispatch()
    const params = useParams()
  
    const {slug} = params
    //CALL API
    const getProductDetails = async () => {
      try {
        const response = await productApi.getBySlug(slug)
        setProduct(response.product)
        setIsLoading(false)
        dispatch(getProduct(response))
      } catch (error) {
          console.log(error.response)
      }
    }
    
    const handleSizeChange = (size) => {
        setFollowingSize(size)
    }

    const addFollowingProduct = async () => {
        try {
            const response = await portfolioApi.addFollowingProduct(product.id, followingSize)
            console.log(response)
            toast.success('Thêm thành công !')
            toggleModal(!show)
        } catch (error) {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau')
            console.log(error.response)
        }
    }    
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [show])
    useEffect(() => {
        window.scrollTo(0, 0)
        getProductDetails()
    }, [params])
    
    return (
        <div className="relative">
            <Navbar />
            {
                isLoading ? <div className="mx-auto mt-20 min-h-screen">
                    <Spinner className="text-red-700"></Spinner>
                </div>
                :
                <div className="max-w-[1100px] mx-auto mt-20">
                    <HiHeart className="text-4xl border-[1px] block border-gray-300 p-2 ml-auto rounded-full cursor-pointer" onClick={toggleModal}/>
                    {/* PRODUCT IMAGE AND BUY SELL */}
                    <div className="grid grid-cols-12 gap-20 mt-10">
                        <div className="col-span-7">
                            <h1 className="font-semibold">{product.name}</h1>
                            <span className="text-xs border-[1px] rounded-full text-gray-500 px-1 mr-2">100% Authentic</span>
                            <span className="text-xs border-[1px] rounded-full text-gray-500 px-1">Tình trạng: Mới</span>
                            <div>  
                                <img className="w-9/12 mx-auto"
                                    src={product.images?.imageUrl}
                                    alt="product"
                                />
                            </div>
                        </div>
                        <div className="col-span-5">
                            <BuySellContainer slug={slug}/>
                        </div>
                    </div>
                    {/* PRODUCT DESCRIPTION */}
                    <div className="mb-5">
                        <hr className="border-t" />
                        <h3 className="bg-black inline-block text-white py-1 px-2 mb-5">Chi tiết sản phẩm</h3>
                        <div className="flex justify-between">
                            <div className="w-5/12">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">Style ID</span>
                                    <p className="font-semibold text-sm">{product.styleId}</p>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">Màu sắc</span>
                                    <p className="font-semibold text-sm">{product.colorway}</p>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">Giá niêm yết</span>
                                    <p className="font-semibold text-sm">$ {product.retailPrice}</p>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] text-gray-600">Ngày ra mắt</span>
                                    <p className="font-semibold text-sm">{product.releaseDate?.split('T')[0]}</p>
                                </div>
                            </div>
                            <div className="w-6/12">
                                <h4 className="font-semibold mb-2">Mô tả sản phẩm</h4>
                                {
                                    product.description ?
                                    <p className="text-xs tracking-wide leading-5" dangerouslySetInnerHTML={{ __html: product['description']}}></p> : <p>Chưa cập nhật</p>
                                }
                            </div>
                        </div>
                </div>
                {/* RECENTLY VIEWED */}
                <div className="mb-5">
                    <hr className="border-t" />
                    <h3 className="bg-black inline-block text-white py-1 px-2 mb-5">Xem gần đây</h3>
                    <RecentlyViewed />
                </div>
                <Modal show={show} toggleModal={toggleModal}>
                    <h1 className="text-center mb-4 font-semibold">Thêm sản phẩm đang theo dõi</h1>
                    <p className="font-semibold mb-2">Chọn kích cỡ</p>
                   <div className="flex flex-wrap">
                    {
                        product.sizes.map((size) => (
                            <div className={"w-[12%] text-center py-1 border-[1px] mr-2 mb-2 font-semibold cursor-pointer hover:bg-gray-300 " + (followingSize === size ? "bg-black text-white" : "")} onClick={() => handleSizeChange(size)}>{size}</div>
                        ))
                    }
                   </div>
                    <div className="flex justify-around py-4">
                       <button className="border-[1px] border-black py-1 w-[80px] text-sm font-semibold" onClick={toggleModal}>Hủy</button>
                       <button  className={"bg-black text-white py-1 w-[80px] text-sm font-semibold " + (!followingSize ? "bg-gray-200" : "")} onClick={addFollowingProduct}>Xác nhận</button>
                    </div>
                </Modal>
              </div>
            }
            <Footer />
        </div>
    )
}

export default ProductDetail
