// 하단 네비게이션 바
// 홈, 마이페이지, 기사 검색

import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';

import { FiHome } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  height: 80px;
  max-width: 500px;
  min-width: 280px;
  
  margin: 0 auto;
  
  display: flex;
  align-items: center;

  padding: 10px;
  z-index: 10;
  background-color: white;
`

const TopNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 50px;
  max-width: 500px;
  min-width: 300px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 10px 5px;
  z-index: 10;
  
  background-color: white;
`

const NavContent = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  float: left;
  width: calc(100%/4);
`


const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


function BottomNavbar() {
  return (
    <NavContainer>
      <NavContent>
        <Link to={'/newstar'}>
          <IconWrapper><FiHome size="20" /></IconWrapper>
        </Link>
      </NavContent>
      <NavContent>
        <Link to={'/newstar/search'}>
          <IconWrapper><IoSearch size="20" /></IconWrapper>
          </Link>
      </NavContent>
      <NavContent>
        <Link to={'/newstar/category'}>
          <IconWrapper><FaList size="20" /></IconWrapper>
        </Link>
      </NavContent>
      <NavContent>
        <Link to={'/newstar/mypage'}>
          <IconWrapper><BsFillPersonFill size="20" /></IconWrapper>
        </Link>
      </NavContent>
    </NavContainer>
  )
}

function TopNavbar() {
  const navigate = useNavigate()
  return (
    <TopNavContainer>
      <IoArrowBack style={{ cursor: 'pointer'}} size={25} onClick={() => navigate(-1)} />
      <Link to={'/newstar'}>
        <img 
          src="/logo_dark.png" 
          alt="newstar logo"
          width="80"
          height="35" />
      </Link>
    </TopNavContainer>
  )
}

function TopNavbarWithoutBack() {
  return (
    <TopNavContainer>
      <Link to={'/newstar'}>
        <img 
          src="/logo_dark.png" 
          alt="newstar logo"
          width="80"
          height="35" />
      </Link>
    </TopNavContainer>
  )
}

export { BottomNavbar, TopNavbar, TopNavbarWithoutBack }