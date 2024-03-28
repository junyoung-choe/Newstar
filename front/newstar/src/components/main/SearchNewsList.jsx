// 검색 시 나오는 뉴스 리스트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postRecords } from "../../api/fetch";


// styled-components
const BoxContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  justify-content: center;
  gap: 20px;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  `

const SearchNewsCardImage = styled.img`
  width: 112.5px; /* 너비를 115px로 고정 */
  height: 70px; /* 높이를 90px로 고정 */
  border-radius: 5px;
  object-fit: cover;
`

const SearchTitle = styled.h3`
  flex: 1; /* 제목이 남은 공간을 채우도록 설정 */
  margin: 0; /* 기본 마진 제거 */
`

const SearchNewsList = ({ NewsData }) => {
  const navigate = useNavigate();

  const handleNewsClick = (articleId) => {
    const mynews = { articleId };
    postRecords(
      mynews,
      (response) => {
        console.log("시청 기록 생성 성공", response);
        navigate(`/newstar/${articleId}`);
      },
      (error) => {
        console.log("시청 기록 생성 실패", error);
      }
    );
  };
  
  return (
    <div>
      {NewsData.length > 0 ? (
        NewsData.map((newsItem) => (
          <BoxContainer key={newsItem.article_id} onClick={() => handleNewsClick(newsItem.article_id)}>
            <SearchNewsCardImage src={newsItem.image_url} alt="news image" />
            <SearchTitle>{newsItem.title}</SearchTitle>
          </BoxContainer>
        ))
      ) : (
        <BoxContainer>검색 결과가 존재하지 않습니다.</BoxContainer>
      )}
    </div>
  );
};

export default SearchNewsList;
