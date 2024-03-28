import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { BigCategoryData, SmallCategoryData } from '../state/categoryData'

const CategoryNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 20px 50px 90px;
`

const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  border-radius: 10px;
`

const BigCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(90% / 2);
  height: 60px;
  border-radius: 5px;
  color: black;
  background-color: white;
  box-shadow: 2px 2px 7px 1px lightgray;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgb(138, 192, 56, 0.7);
    color: white;
    transition: 0.5s;
  }

`

const SmallCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(90% / 2);
  height: 45px;
  border-radius: 5px;
  color: black;
  background-color: white;
  box-shadow: 2px 2px 7px 1px lightgray;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgb(138, 192, 56, 0.7);
    color: white;
    transition: 0.5s;
  }
`


export default function CategoryNews() {
  const navigate = useNavigate()

  const list100 = SmallCategoryData[100].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/newstar/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  const list101 = SmallCategoryData[101].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/newstar/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  const list102 = SmallCategoryData[102].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/newstar/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  const list103 = SmallCategoryData[103].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/newstar/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  const list104 = SmallCategoryData[104].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/newstar/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  const list105 = SmallCategoryData[105].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/newstar/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  return (
    <CategoryNewsContainer>
      <CategoryBox>
        <BigCategoryBox onClick={() => navigate('/newstar/category/100')}>정치 전체</BigCategoryBox>
        {list100}
      </CategoryBox>
      <CategoryBox>
        <BigCategoryBox onClick={() => navigate('/newstar/category/101')}>경제 전체</BigCategoryBox>
        {list101}
      </CategoryBox>
      <CategoryBox>
        <BigCategoryBox onClick={() => navigate('/newstar/category/102')}>사회 전체</BigCategoryBox>
        {list102}
      </CategoryBox>
      <CategoryBox>
        <BigCategoryBox onClick={() => navigate('/newstar/category/103')}>생활/문화 전체</BigCategoryBox>
        {list103}
      </CategoryBox>
      <CategoryBox>
        <BigCategoryBox onClick={() => navigate('/newstar/category/104')}>세계 전체</BigCategoryBox>
        {list104}
      </CategoryBox>
      <CategoryBox>
        <BigCategoryBox onClick={() => navigate('/newstar/category/105')}>IT/과학 전체</BigCategoryBox>
        {list105}
      </CategoryBox>
    </CategoryNewsContainer>
  )
}