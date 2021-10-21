import React, { useEffect, useState } from 'react'
import productApi from '../api/productApi'
//components
import Product from './Product'
import Pagination from './Pagination'

const ProductContainer = ({filters, onFiltersChange}) => {
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        totalProducts: 1
    })
    //CALL API
    const getProducts = async () => {
        try {
            const response = await productApi.getAll(filters)
            setProducts(response.products)
            setPagination(response.pagination)
        } catch (error) {
            console.log('Somethings wrong:', error)
        }
    }
    //HANDLE PAGINATION
    const handlePageChange = (newPage) => {
        onFiltersChange({
            ...filters,
            page: newPage.selected + 1
        })
    }
   
    useEffect(() => {
        getProducts()
    }, [filters])
    return (
        <div className="col-span-10 grid grid-cols-4 gap-4 grid-flow-row">
            {
                products.map((product) => {
                    return <Product 
                            key={product.id}
                            name={product.name}
                            price={product.averagePrice}
                            image={product.images?.smallImageUrl}
                            slug={product.slug} 
                            />
                            
                }) 
            }
            <Pagination onPageChange={handlePageChange} pagination={pagination}/>
        </div>
    )
}

export default ProductContainer
