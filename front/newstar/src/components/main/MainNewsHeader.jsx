import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import styled from "styled-components"

import Tag from "../../common/Tag"
import LikeButton from "../../common/Like"

import { getRecords } from "../../api/fetch"
import { BigCategory, SmallCategory } from "../../state/categoryData"

const MainNewsHeaderContainer = styled.div`
  padding: 20px 20px 10px;
`

const NewsTagAndLike = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NewsTags = styled.div`
  display: flex;
  gap: 7px;
`


// 뉴스 헤더 (제목, 날짜, 태그)
export default function NewsHeader({ newsData, isLiked, handleLikeButtonClick }) {
  const newsDate = newsData.date?.replace('T', '\n')

  return (
    <MainNewsHeaderContainer>
      <NewsTagAndLike>
        <NewsTags>
          <Link to={`/newstar/category/${newsData.bcategory}`}><Tag fontSize={'12px'}>
              {`# ${BigCategory[newsData.bcategory]}`}</Tag></Link>
          {SmallCategory[newsData.scategory] && <Link to={`/newstar/category/${newsData.scategory}`}><Tag fontSize={'12px'}>
              {`# ${SmallCategory[newsData.scategory]}`}</Tag></Link>}
        </NewsTags>
        <LikeButton 
          isLiked={isLiked}
          handleLikeButtonClick={handleLikeButtonClick}
            />
      </NewsTagAndLike>
      <br />
      <h2>{newsData.title}</h2>
      <br />
      <div style={{color: 'gray'}}>{newsDate}</div>
    </MainNewsHeaderContainer>
    )
  }