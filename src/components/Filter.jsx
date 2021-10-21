import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Filter = ({filters, onFiltersChange}) => {
    const categories = ['sneakers', 'streetwear']
    const sneakerBrands = ['nike', 'adidas', 'jordan', 'vans']
    const streetwearBrands = ['supreme']
    const handleCategoryChange = (category) => {
        onFiltersChange({
            ...filters,
            category: category
        })
    }
    const handleBrandChange = (brand) => {
        onFiltersChange({
            ...filters,
            brand: brand
        })
    }
    const renderCurrentCategoryBrand = () => {
        if (filters.category === 'sneakers') {
            sneakerBrands.map((brand, index) => (<li 
                key={index} 
                onClick={() => handleBrandChange(brand)} 
                className="mb-1 cursor-pointer">
                    <Link to={`/products?brand=${brand}`}>
                        {brand.toUpperCase()}
                    </Link>
            </li>))
        }
    }
    return (
        <div className="col-span-2 text-sm font-semibold">
            <div className="mb-8">
                <p className="mb-3 underline">DANH MỤC</p>
                <ul>
                    {
                        categories.map((category, index) => <li key={index}
                                                                onClick={() => handleCategoryChange(category)}
                                                                className="mb-1 cursor-pointer">
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
                      sneakerBrands.map((brand, index) => <li 
                        key={index} 
                        onClick={() => handleBrandChange(brand)} 
                        className="mb-1 cursor-pointer">
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
