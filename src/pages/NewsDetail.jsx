import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import newsApi from '../api/newsApi'
import { Link } from 'react-router-dom'
//components
import Navbar from '../components/Navbar'
import CommentsSection from '../components/CommentsSection'

const NewsDetail = () => {
    const [news, setNews] = useState({})
    const [comments, setComments] = useState([])
    const [otherNews, setOtherNews] = useState([])
    const [scroll, setScroll] = useState(false)
    const otherRef = useRef()
    const params = useParams()
  
    const {slug} = params
    const getNews = async (slug) => {
        try {
            const response = await newsApi.getNews(slug)
            setNews(response.news)
            setComments(response.news.comments)
        } catch (error) {
            console.log(error.response)
        }
    }
    const getOtherNews = async () => {
        const response = await newsApi.getAllNews()
 
        setOtherNews(response.newses)
    }
    const handleNewComment = (newComment) => {
        setComments([...comments, newComment])
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        getNews(slug)
        getOtherNews()
    }, [params])

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 100
            if (show) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div>
            <Navbar />
           <div className="flex mt-[100px] max-w-[1200px] mx-auto">
               <div className="p-8 w-[80%]">
                    <h1 className="font-bold text-4xl mb-6">{news.title}</h1>
                    <p className="mb-10 text-sm text-gray-400">{news.createdAt?.split('T')[0]}, <span>{news.createdBy?.name}</span></p>
                    <div className="w-3/4" dangerouslySetInnerHTML={{ __html: news["content"] }}></div>
                    <CommentsSection news={news} newsComments={comments} onNewComment={handleNewComment} />
               </div>
               <div className={"mt-[300px] w-[25%] bg-white z-50 p-2 h-[fit-content] fixed right-0 top-0 mr-4 border-[1px] border-gray-300 overflow-auto transition-all duration-300 " + (scroll ? "!mt-[62px]" : "")}>
                   <h1 className="font-bold bg-red-700 text-white py-1 px-2">Các tin khác</h1>
                   {
                       otherNews.filter(n => n._id !== news._id).map(news => (
                       <Link to={`/news/${news.slug}`} className="flex mb-4 border-b-[1px] p-1">
                           <div className="w-[30%] mr-2">
                               <img src={news.thumbnail} alt="news-thumbnail" className="w-full" />
                           </div>
                           <p className="flex-1 text-xs font-medium line-clamp-2">{news.title}</p>
                       </Link>
                       ))
                   }
                  
               </div>
           </div>
        </div>
    )
}

export default NewsDetail
