// 메인 페이지 뉴스 카드
import { useState } from 'react';
import styled from 'styled-components';

import MainNewsHeader from './MainNewsHeader';
import MainNewsBody from './MainNewsBody';
import NotFoundImg from '../../assets/logo_dark.png';

import { likeNews } from '../../api/fetch';

const MainNewsImage = styled.img`
    width: 100%;
    height: 300px;
    padding: 15px 15px 0px 15px;
    object-fit: contain;
    margin: 0 auto;
`;


const NewsContainer = styled.div`
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;

function MainNewsCard({ newsData }) {
    // 좋아요 상태 관리
    const [isLiked, setIsLiked] = useState(false);

    // 좋아요 상태 업데이트
    function handleLike() {
        setIsLiked(!isLiked);
        const data = {
            articleId: newsData.article_id,
            likes: !isLiked,
        };
        likeNews(
            data,
            (response) => {

            },
            (error) => {
                console.log(error);
            }
        );
    }
    const onErrorImg = (e) => {
        e.target.src = NotFoundImg;
    };

    return (
        <NewsContainer onDoubleClick={handleLike}>
            <MainNewsImage src={newsData.image_url} alt="news image" onError={onErrorImg} />
            <MainNewsHeader
                newsData={newsData}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                handleLikeButtonClick={handleLike}
            />
            <MainNewsBody newsData={newsData} />
        </NewsContainer>
    );
}

export default MainNewsCard;
