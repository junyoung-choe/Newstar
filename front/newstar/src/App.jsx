import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { RecoilRoot } from "recoil"

import StartPage from "./pages/StartPage"
import MainPage from "./pages/MainPage"
import { useEffect } from "react"

import Intro from "./pages/Intro"
import ShortForm from "./pages/ShortForm"
import Search from "./pages/Search"
import MyPage from "./pages/MyPage"
import CategoryNews from "./pages/CategoryNews"
import CategoryNewsDetail from "./pages/CategoryNewsDetail"
import ChooseKeyword from "./pages/ChooseKeyword"
import NewsDetail from "./pages/NewsDetail"
import Modal from 'react-modal'
function App() {
  Modal.setAppElement('#root')
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPageWrapper />}>
              <Route index element={<Intro/>} />
              <Route path="choose" element={<ChooseKeyword/>} />
            </Route>
            <Route path="/newstar" element={<MainPageWrapper />}>
              <Route index element={<ShortForm/>} />
              <Route path=":articleId" element={<NewsDetail/>} />
              <Route path="search" element={<Search/>} />
              <Route path="mypage" element={<MyPage/>} />
              <Route path="category" element={<CategoryNews/>} />
              <Route path="category/:categoryId" element={<CategoryNewsDetail/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

// StartPage로의 접근을 제어하는 컴포넌트
function StartPageWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('X-USER-ID');
    if (userId) {
      // 사용자가 이미 로그인했다면 MainPage(또는 다른 페이지)로 리디렉션
      navigate('/newstar');
    }
  }, [navigate]);

  // 사용자가 로그인하지 않았을 경우에만 StartPage를 렌더링
  return <StartPage />;
}

// MainPage로의 접근을 제어하는 컴포넌트
function MainPageWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('X-USER-ID');
    if (!userId) {
      // 사용자가 로그인하지 않았다면 StartPage로 리디렉션
      navigate('/');
    }
  }, [navigate]);

  // 사용자가 로그인했을 경우에만 MainPage를 렌더링
  return <MainPage />;
}

export default App;