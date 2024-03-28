// 기사 검색 페이지
// 키워드로 뉴스 실시간 검색

import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { searchNews } from '../api/fetch';
import SearchBar from '../components/SearchBar';
import SearchNewsList from '../components/main/SearchNewsList';

const SearchContainer = styled.div`
  padding: 10px 20px 70px;
`

export default function Search() {

  // 키워드 상태 관리
  const [keyword, setKeyword] = useState('');
  // 필터링 된 뉴스 목록 상태관리
  const [filteredNews, setFilteredNews] = useState([]);


  useEffect(() => {
    
    const fetchNews = async () => {
      const searchWord = keyword.trim().toLowerCase();

      if (searchWord !== '') {
        try {
          // 성공 콜백
          const response = await searchNews(searchWord);
          setFilteredNews(response.data);
          // 실패 콜백
        } catch (error) {
          console.log("Error fetching Searchdata", error);
        }
      } else {
        setFilteredNews([]);
      }
    };

    fetchNews();
  }, [keyword]);

  
  return (
    <SearchContainer>
      <SearchBar setKeyword={setKeyword} />
      <SearchNewsList NewsData={filteredNews} />
    </SearchContainer>
  )
}