import styled from "styled-components"
import Lottie from "lottie-react"
import loading from "../assets/lottie/loading.json"

const LoadingBox = styled.div`
  display: flex;
  margin-top: calc((100vh / 2) - 200px) ;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Loading() {
  return (
    <LoadingBox>
      <img src="/newsCharacter.gif" alt="" width="200px"/>
      <div style={{fontSize: '20px', fontWeight: 'bold'}}>로딩중 입니당</div>
    </LoadingBox>
  )
}