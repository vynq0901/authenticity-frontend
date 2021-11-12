import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import newsApi from '../api/newsApi'
import Navbar from '../components/Navbar'

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
            <div className="mt-[100px] max-w-[1100px] mx-auto">
                <h1 className="font-bold text-3xl text-center capitalize"> - Tổng hợp tin tức - </h1>
                <div>
                    {
                        newses.map(news => (
                            <Link to={`/news/${news.slug}`} key={news._id} className="flex border-2  mb-2 rounded-xl overflow-hidden">
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
