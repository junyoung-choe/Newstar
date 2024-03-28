import { Outlet, useLocation } from "react-router-dom"

import { ContainerWithNav, TotalContainer } from "../styles/Container"
import { TopNavbar, TopNavbarWithoutBack, BottomNavbar } from "../components/Navbar";

function MainPage() {
  const location = useLocation()

  function renderTopNavbar() {
    if (location.pathname == '/newstar') {
      return <TopNavbarWithoutBack />
    } else {
      return <TopNavbar />
    }
  }

  return (
    <TotalContainer>
      {renderTopNavbar()}
      <ContainerWithNav>
        <Outlet/>
      </ContainerWithNav>
      <BottomNavbar/>
    </TotalContainer>
  )
}

export default MainPage