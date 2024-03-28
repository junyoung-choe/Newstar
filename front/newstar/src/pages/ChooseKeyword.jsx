// 선호 키워드 선택 페이지
// 초기 추천을 위한 키워드를 선택
// 키워드 선택 후, 회원가입 완료
import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { userKeyState } from '../state/atoms';
import styled from 'styled-components';

import { FaRegChartBar } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { RiComputerLine } from "react-icons/ri";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineFestival } from "react-icons/md";

import { postMembers } from '../api/fetch';
import SelectBox from '../common/SelectBox'
import NextButton from '../common/Button';
import { BigCategoryData } from '../state/categoryData';

import QRModal from '../components/QR';

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 380px;
  gap: 25px;
`

const KeywordPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 60px;
`

const KeywordPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const KeywordPageButton = styled.div`
   display: flex;
   justify-content: end;
   height: 35px;
`

function Keywords({ tagsActive, setTagsActive }) {

  // 클릭 시 색 변화
  function handleTagClick(clickedKeyword) {
    const updatedTags = tagsActive.map((tag) =>
      tag.code === clickedKeyword.code
        ? { ...tag, state: !tag.state } : tag
    )
    setTagsActive(updatedTags)
  }

  // 아이콘을 선택하는 함수
  function selectIcon(keyword)  {
    switch(keyword) {
        case '정치':
            return <RiGovernmentLine size={20} />;
        case '경제':
            return <FaRegChartBar size={20} />;
        case '사회':
            return <FaPeopleGroup size={20} />;
        case '생활/문화':
            return <MdOutlineFestival size={20} />;
        case '세계':
            return <FaEarthAmericas size={20} />;
        case 'IT/과학':
            return <RiComputerLine size={20} />;

        default:
            return ;
    }
  };

  return (
    <SelectBoxWrapper>
      {tagsActive.map((bigkeyword) => (
        <SelectBox 
          key={bigkeyword.code}
          $background={bigkeyword.state ? 'rgb(138, 192, 56, 0.7)' : ''}
          color={bigkeyword.state ? 'black' : ''}
          onClick={() => handleTagClick(bigkeyword)}
          >
          {selectIcon(bigkeyword.name)}
          {bigkeyword.name}
        </SelectBox>
      ))}
    </SelectBoxWrapper>
  )
}


function ChooseKeyword() {

  // userKey 상태 관리
  const setUserKey = useSetRecoilState(userKeyState)

  // 모달 창 상태 관리
  const [modalOpen, setModalOpen] = useState(false)
  

  // 각 키워드 상태 관리
  const [tagsActive, setTagsActive] = useState(BigCategoryData)

  // 선택된 키워드 상태 관리
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // 클릭 시 키워드 담기
  useEffect(() => {
    const newSelectedKeywords = tagsActive.filter(word => word.state).map(word => word.id);
    setSelectedKeywords(newSelectedKeywords);
  }, [tagsActive]);


  // 새로운 user 진입 시 key 값 로컬스토리지에 저장
  function handleCreateMember() {
    postMembers(
      { "categories" : selectedKeywords },
      ( response ) => {

        // 응답으로 받은 key
        const key = response?.data.data.pw
        
        if (!localStorage.getItem('X-USER-ID')) {
          localStorage.setItem('X-USER-ID', key)
          setUserKey(key)
        }
      },
      (error) => {
        console.log(error)
      }
      )
      setModalOpen(!modalOpen)
  }

  return (
    <KeywordPageWrapper>
      <KeywordPageHeader>
        <img 
          src="/logo_dark.png"
          alt="logo"
          width="100px"
          />
        <h3>선호하는 분야를 선택해주세요 !</h3>
      </KeywordPageHeader>
      <Keywords
        tagsActive={tagsActive}
        setTagsActive={setTagsActive}
      />
      <KeywordPageButton>
        { selectedKeywords.length > 0 && <NextButton 
          onClick={handleCreateMember} 
          $background={"lightgray"}
          content={"다음"}/> }
      </KeywordPageButton>
      <QRModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </KeywordPageWrapper>
  )
}

export default ChooseKeyword