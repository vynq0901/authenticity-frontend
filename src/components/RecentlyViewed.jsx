import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css" 
import "slick-carousel/slick/slick-theme.css"
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from "react-icons/io5";
//components
import Product from './Product'

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className + "text-red-500 block"} onClick={onClick}  style={{ ...style, display: "block"}}
        >
            <IoChevronBackCircleSharp className="text-red-500" />
        </div>
    )
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{ ...style, display: "block", background: "green" }}
        >
            <IoChevronForwardCircleSharp />
        </div>
    )
}

const RecentlyViewed = () => {
    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
      }
    return (
            <Slider {...settings}>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
                       <div>
                           <Product />
                       </div>
            </Slider>
    )
}

export default RecentlyViewed
