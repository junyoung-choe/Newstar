// 메인 페이지 뉴스 카드
import { useState, useEffect } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { getArticle,  likeNews } from "../api/fetch"

import MainNewsHeader from "../components/main/MainNewsHeader"
import MainNewsBody from "../components/main/MainNewsBody"
import NotfoundImg from "../assets/logo_dark.png"

const DetailNewsImage = styled.img`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
`

const DetailNewsContainer = styled.div`
  height: auto;
  max-height: 86vh;
  overflow-y: auto;
  width: 100%;
`

function NewsDetailCard() {
  const params = useParams()
  const [article, setArticle] = useState([])

  // 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {
    getArticle(
      params.articleId,
      ( response ) => {
        setArticle(response?.data.data)
        console.log(response)
      }
    )
  }, [params.articleId])


  // 좋아요 상태 업데이트
  function handleLike() {
    setIsLiked(!isLiked)
    const data = {
      articleId: article.article_id,
      likes: !isLiked
    }
    likeNews(
      data,
      ( response ) => {
        console.log(response)
        isLiked ? console.log("됐습니다") : console.log("좋습니다")
      },
      ( error ) => {
        console.log(error)
      }
    )
  }
  const onErrorImg = (e) => {
    e.target.src = NotfoundImg;
  }

  return (
    <DetailNewsContainer>
      <DetailNewsImage
        src={article.image_url}
        alt="news_image"
        onError={onErrorImg}
      />
      <MainNewsHeader
        newsData={article}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        handleLikeButtonClick={handleLike}
      />
      <MainNewsBody newsData={article} />
    </DetailNewsContainer>
  )
}

export default NewsDetailCard