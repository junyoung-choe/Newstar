// 키워드 태그
import styled from 'styled-components'

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px 22px;
  border-radius: 5px;
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: 600;
  line-height: 1.5;

  color: ${(props) => props.color || "black"};
  background: ${(props) => props.$background || "white"};
  box-shadow: 2px 2px 7px 1px lightgray;
  cursor: pointer;
`

export default function SelectBox({ children, color, $background, onClick, fontSize }) {
  return (
    <BoxWrapper 
      color={color} 
      fontSize={fontSize}
      $background={$background}
      onClick={onClick}
      >
      {children}
    </BoxWrapper>
  )
}