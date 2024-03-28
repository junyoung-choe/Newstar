import styled from "styled-components"
import NotFoundImg from '../../assets/logo_dark.png'

const BookMarkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 0.5px solid gray;
  border-radius: 8px;
  width: 100%;
  height: 100px;
`

const BookMarkInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px; 
  width: 75%;
  gap: 1px;
  font-size: 13px;
`

const BookMarkImage = styled.img`
  width: 25%;
  // 왼상 오상 오하 왼하
  border-radius: 0 8px 8px 0;
`

const BookMarkText = styled.div`
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`

const BookMarkContent = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: gray;
`

// 뉴스 북마크
export default function BookMark({ newsData }) {
  const onErrorImg = (e) => {
    e.target.src = NotFoundImg;
  }
  return (
    <BookMarkWrapper>
      <BookMarkInfo>
        <BookMarkText style={{ marginBottom: '5px'}}>{newsData.title}</BookMarkText>
        <BookMarkContent>{newsData.content}</BookMarkContent>
        <BookMarkText style={{color: 'gray', marginTop: '5px'}}>{newsData.url}</BookMarkText>
      </BookMarkInfo>
      <BookMarkImage src={newsData.image_url} alt="news image" onError={onErrorImg} />
    </BookMarkWrapper>
  )
}