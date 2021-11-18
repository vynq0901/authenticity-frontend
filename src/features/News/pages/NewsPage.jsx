import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import newsApi from '../../../api/newsApi'
import Navbar from '../../../components/Navbar'
import NewsBanner from '../../../assets/images/newscate.jpg'
const NewsPage = () => {
    const [newses, setNewses] = useState([])
  
    const getAllNews = async () => {
        try {
            const response = await newsApi.getAllNews()
           
            setNewses(response.newses)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getAllNews()
    }, [])
   
    return (
        <div>
            <Navbar />
                <div style={{backgroundImage: `url(${NewsBanner})`}} className="min-h-[280px] mt-14 px-12 mx-auto pt-20 pb-12 bg-cover bg-center">
                    <h1 className="text-5xl font-semibold mb-6 text-white">Tổng hợp tin tức <br /> Sneakers - Streewear</h1>
                </div>
            <div className="max-w-[1100px] mx-auto">
                <h1 className="text-xl text-gray-400 capitalize my-[50px]">Nắm bắt những thông tin Trending</h1>
                <div>
                    {
                        newses.map(news => (
                            <Link to={`/news/${news.slug}`} key={news._id} className="flex border-[1px]  mb-4  overflow-hidden hover:shadow-lg">
                                <div className="w-[20%] h-[120px] overflow-hidden mr-4">
                                    <img src={news.thumbnail} alt="news-content" className="w-full h-full" />
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <h2 className="font-medium ">{news.title}</h2>
                                    <p className="ml-auto text-gray-400 text-sm"><span>{news.createdAt?.split('T')[0]}, </span>{news.createdBy?.name}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NewsPage
