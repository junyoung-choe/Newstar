import axios from "axios"

const BASEAPI = '/api'

const api = {
  model: '/data/news/model',
  news: '/data/news',
  members: '/members',
  records: '/records',
  like: '/records/likes',
  keywords: '/keywords',
  category: (newsNum, pageNum, sCate, bCate) => 
    `/articles/category?size=${newsNum}&page=${pageNum}&scategory=${sCate}&bcategory=${bCate}`,
  search: '/data/search',
  articles: (articleId) => `/articles/${articleId}`,
  answer: '/answers',
}

const axiosInstance = axios.create({
  baseURL: BASEAPI
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('X-USER-ID')
    config.headers['X-User-Id'] = accessToken
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// X-USER-ID: 헤더로 보낼 이름 입니다
export { api, axiosInstance }