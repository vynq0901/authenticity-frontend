import axiosClient from './axiosClient'

const productApi = {
    getAll: (params) => {
        const url = '/products'
        return axiosClient.get(url, { params })
    },
    getBySlug: (slug) => {
        const url = `/${slug}`
        return axiosClient.get(url)
    },
    getAskAndBid: (slug, size) => {
        const url = `/order/${slug}?size=${size}`
        return axiosClient.get(url)
    },
    getNewestSneakers: () => {
        const url = `/top-5-newest-sneakers`
        return axiosClient.get(url)
    },
    getNewestStreetwear: () => {
        const url = `/top-5-newest-streetwear`
        return axiosClient.get(url)
    },
    getNewestCollectibles: () => {
        const url = `/top-5-newest-collectibles`
        return axiosClient.get(url)
    },
    searchProducts: (kw) => {
        const url = `/search?s=${kw}`
        return axiosClient.get(url)
    }
}

export default productApi