import React, { useState } from 'react'
import sneakerImg from '../assets/images/sneakercate.jpg'
import { useLocation } from 'react-router'
//components
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import ProductContainer from '../components/ProductContainer'
import Footer from '../components/Footer'

const CategoryPage = () => {
    const queryParams = useLocation().search
    const brand = new URLSearchParams(queryParams).get('brand')
    const category = new URLSearchParams(queryParams).get('category')
    const keyword = new URLSearchParams(queryParams).get('s')
    const [filters, setFilters] = useState({
        page: 1,
        brand: brand, 
        category: category,
        s: keyword,
    })
    const handleFiltersChange = (filters) => {
        setFilters({
            ...filters,
        })
    }
    return (
        <div>
            <Navbar home={false}/>
            <div style={{backgroundImage: `url(${sneakerImg})`}} className="h-fit-content mt-14 px-12 mx-auto pt-20 pb-12">
                <h1 className="text-5xl font-semibold mb-6">Sneakers</h1>
                <p className="max-w-md">On StockX, every sneaker you want is always available and authentic. Buy and sell new sneakers & shoes from Air Jordan, adidas, Nike, Yeezy and more!</p>
            </div>
            <div className="max-w-[1200px] mx-auto mt-7 grid grid-cols-12 ">
                <Filter  filters={filters} onFiltersChange={handleFiltersChange}/>
                <ProductContainer filters={filters} onFiltersChange={handleFiltersChange}/>
            </div>
            <Footer />
        </div>
    )
}

export default CategoryPage
