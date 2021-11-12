import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const categories = ['sneakers', 'streetwear']
const brands = ['nike', 'adidas', 'jordan', 'vans', 'supreme']

const Filter = ({filters, onFiltersChange}) => {

    const handleCategoryChange = (category) => {
        delete filters.brand
        onFiltersChange({
            ...filters,
            category: category
        })
    }

    const handleBrandChange = (brand) => {
        delete filters.category
        onFiltersChange({
            ...filters,
            brand: brand
        })
    }
 
    return (
        <div className="col-span-2 text-sm font-semibold">
            <div className="mb-8">
                <p className="mb-3 underline">DANH MỤC</p>
                <ul>
                    {
                        categories.map((category, index) => <li key={index}
                                                                onClick={() => handleCategoryChange(category)}
                                                                className={`mb-1 cursor-pointer ` + (filters.category && filters.category === category ? 'text-red-700' : '')}>
                                                                    <NavLink exact to={`/products?category=${category}`}>
                                                                        {category.toUpperCase()}
                                                                    </NavLink>
                                                            </li>)
                       
                    }
                </ul> 
            </div>
            <div>
                <p className="mb-3 underline">THƯƠNG HIỆU</p>
                <ul>
                    {
                      brands.map((brand, index) => <li 
                        key={index} 
                        onClick={() => handleBrandChange(brand)} 
                        className={`mb-1 cursor-pointer ` + (filters.brand && filters.brand === brand ? 'text-red-700' : '')}>
                            <Link to={`/products?brand=${brand}`}>
                                {brand.toUpperCase()}
                            </Link>
                        </li>)
                    }
                </ul> 
            </div>
        </div>
    )
}

export default Filter
