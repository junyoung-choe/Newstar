import { Routes, Route, Outlet } from "react-router-dom"

import { ContainerWithoutNav, TotalContainer } from "../styles/Container"

function StartPage() {
  return (
    <TotalContainer>
      <ContainerWithoutNav>
        <Outlet/>
      </ContainerWithoutNav>
    </TotalContainer>
  )
}

export default StartPage