import styled from 'styled-components';


// 전체 페이지
const TotalContainer = styled.div`
  height: 100vh;
`

// 네브바 없는 페이지
const ContainerWithoutNav = styled.main`
  position: relative;
  max-width: 500px;
  margin: 0px auto;
  padding: 20px;
`;

// 네브바 있는 페이지
const ContainerWithNav = styled.main`
  padding-top: 50px;

  max-width: 500px;
  min-width: 280px;
  margin: 0px auto;
  
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`


export { ContainerWithNav, ContainerWithoutNav, TotalContainer }
