// 대분류, 중분류끼리 모은 뉴스
import styled from 'styled-components'
import NotFoundImg from '../../assets/logo_dark.png'

import { useNavigate } from 'react-router-dom'

const CategoryNewsCardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  padding-bottom: 15px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
`

const CategoryNewsCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  font-size: 18px;
  padding: 0px 10px;
  gap: 3px;
`

const CategoryNewsCardImage = styled.img`
  width: 25%;
  // 왼상 오상 오하 왼하
  // border-radius: 0 8px 8px 0;
  border-radius: 5px;
`

const CategoryNewsTitle = styled.div`
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const CategoryNewsContent = styled.div`
  font-size: 11px;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const CategoryNewsDate = styled.div`
  font-size: 11px;
  color: gray;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export default function CategoryNewsCard({ categoryData }) {
  const navigate = useNavigate()
  const newsDate = categoryData.date.replace("T", ' ')
  
  const onErrorImg = (e) => {
    e.target.src = NotFoundImg;
  }
  return (
    <>
      <CategoryNewsCardWrapper onClick={() => navigate(`/newstar/${categoryData.article_id}`)}>
        <CategoryNewsCardImage src= {categoryData.image_url} alt="news_image" onError={onErrorImg}/>
        <CategoryNewsCardContent>
          <CategoryNewsDate>{newsDate}</CategoryNewsDate>
          <CategoryNewsTitle>{categoryData.title}</CategoryNewsTitle>
          <CategoryNewsContent>{categoryData.content}</CategoryNewsContent>
        </CategoryNewsCardContent>
      </CategoryNewsCardWrapper>
    </>
  )
}