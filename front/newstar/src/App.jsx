import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
import styled from "styled-components"

import Intro from "./pages/Intro"
import Main from "./pages/Main"
import Search from "./pages/Search"
import MyPage from "./pages/MyPage"
import ChooseKeyword from "./pages/ChooseKeyword"
import { BottomNavbar, TopNavbar } from "./components/Navbar"

const MainContent = styled.div`
  padding: 50px 0px;
`

function app() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          {/* <TopNavbar/> */}
          <MainContent>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/intro" element={<Intro/>} />
              <Route path="/search" element={<Search/>} />
              <Route path="/mypage" element={<MyPage/>} />
              <Route path="/keywords" element={<ChooseKeyword/>} />
            </Routes>
          </MainContent>
          <BottomNavbar />
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default app