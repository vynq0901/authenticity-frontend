import React from 'react'
//components
import Category from './Category'

const HomeCategories = () => {
    return (
        <div className="mt-5">
            <Category title='Xem gần đây' recent />
            <Category title='Sneakers mới phát hành' category='sneakers' link='/products?category=sneakers'/>
            <Category title='Streetwear thịnh hành' category='streetwear' link='/products?category=streetwear'/>
        </div>
    )
}

export default HomeCategories
