import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productApi from '../api/productApi'
//components
import Product from './Product'

const Category = ({title, link, recent, category}) => {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            if (category === 'sneakers') {
                const response = await productApi.getNewestSneakers()
                setProducts(response.data)
            } else if ( category === 'streetwear') {
                const response = await productApi.getNewestStreetwear()
                setProducts(response.data)
            } else if ( category === 'collectibles') {
                const response = await productApi.getNewestCollectibles()
                setProducts(response.data)
            } else {
                const storageItem = sessionStorage.getItem('viewedProduct')
                const viewedProduct = JSON.parse(storageItem)
                let arr = []
                for (const obj of viewedProduct) {
                    arr.push(obj)
                }
                setProducts(arr)
            }
        } catch (error) {
            console.log(error.response)
        }
    } 
    useEffect(() => {
        getProducts()
       
    }, [])
    return (
        <div className="w-full mt-5">
            <div className="w-full flex justify-between items-center">
                <span className="text-lg font-semibold">{title}</span>
                {
                    !recent && <Link to={link} className="text-sm font-medium">Xem tất cả</Link>
                }
            </div>
            <div className="grid grid-cols-5 gap-4">
                {
                    products.map((product, index) => <Product 
                    key={index}
                    name={product?.name}
                    price={product?.averagePrice}
                    image={product?.images.smallImageUrl}
                    slug={product?.slug} 
                    />)
                }
            </div>
        </div>
    )
}

export default Category
