import axios, { Axios } from "axios"
import { api, axiosInstance } from "./api"

// 뉴스 데이터 조회
function getNews(success, fail) {
  return axiosInstance.get(api.news)
    .then(success)
    .catch(fail)
}


// 검색어로 뉴스 조회
function searchNews(searchWord, success, fail) {
  const requestword = {
    keyword: searchWord
  }
  return axiosInstance.post(api.search, requestword)
    .then(success)
    .catch(fail)
}


// 이전 데이터 불러오기
function getMembers(success, fail) {
  return axiosInstance.get(api.members)
    .then(success)
    .catch(fail)
}


// 새로운 회원 등록
function postMembers(cate, success, fail) {
  return axiosInstance.post(api.members, cate)
    .then(success)
    .catch(fail)
}


// 시청기록 조회
function getRecords(success, fail) {
  return axiosInstance.get(api.records)
    .then(success)
    .catch(fail)
}


// 시청기록 생성
function postRecords(mynews, success, fail) {
  return axiosInstance.post(api.records, mynews)
    .then(success)
    .catch(fail)
}


// 좋아요 목록 조회
function getLikes(success, fail) {
  return axiosInstance.get(api.like)
    .then(success)
    .catch(fail)
}


// 키워드 조회
function getKeyword(success, fail) {
  return axiosInstance.get(api.keywords)
    .then(success)
    .catch(fail)
}


// 카테고리별로 조회
function getCategoryNews(bCate, sCate, newsNum, pageNum, success, fail) {
  const categoryUrl = api.category(newsNum, pageNum, sCate, bCate)
  return axiosInstance.get(categoryUrl)
    .then(success)
    .catch(fail)
}


// 좋아요
function likeNews(like, success, fail) {
  return axiosInstance.patch(api.records, like)
    .then(success)
    .catch(fail)
}


// 뉴스 하나 불러오기
function getArticle(articleId, success, fail) {
  const articleUrl = api.articles(articleId)
  return axiosInstance.get(articleUrl)
    .then(success)
    .catch(fail)
}

// 설문 답변 저장하기
function setAnswer(data, success, fail) {
  return axiosInstance.post(api.answer, data)
    .then(success)
    .catch(fail)
}


export {
  getNews,
  searchNews, 
  getMembers, 
  postMembers, 
  getRecords, 
  postRecords,
  getLikes,
  getKeyword,
  getCategoryNews,
  likeNews,
  getArticle,
  setAnswer
}
