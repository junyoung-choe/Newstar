import { useEffect, useState } from 'react';

import Modal from 'react-modal'
import Select from 'react-select';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setAnswer } from '../api/fetch';

const customModal =  Modal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "80%",
    height: "90%",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};


const SurveyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 9px;
`

const SurveyTitle = styled.h2`
  display: flex;
  justify-content: center;
`

const SurveyQuestion = styled.div`
  font-size: 14px;
  margin: 5px 0px;
  font-weight: 700;
`

const SurveyText = styled.span`
  font-size: 10px;
  margin-left: 15px;
  color: gray;
`

const SurveyDescription = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  font-size: 13px;
`


const SurveyContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`

const AnswerWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const SurveyButton = styled.button`
  background-color: #8AC038;
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  border: 0px;
  color: white;
`

function SelectAnswer({ qId, qName, onChangeHandler }) {
  const Answers = ['매우 만족', '만족', '보통', '불만족', '매우 불만족']
  return (
    <>
      {Answers.map((answer, idx) => (
          <AnswerWrapper key={idx}>
            <input type="radio" id={`${qId}${idx}`} value={Answers[idx]} name={qName} onChange={onChangeHandler}/>
            <label htmlFor={`${qId}${idx}`} style={{fontSize: '13px'}}>{answer}</label>
          </AnswerWrapper>))
      }
    </>
  )
}



function SurveyContent({ setSurveyModalOpen }) {
  const navigate = useNavigate()

  const options = [
    { value: 'pc', label: 'PC' },
    { value: 'mobile', label: 'Mobile' },
  ];

  const [isValid, setIsValid] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [surveyValue, setSurveyValue] = useState({
    deviceType: "pc",
    category: "",
    read: "",
    loading: "",
    user: "",
    text: "없는디?",
    phone: "",
  })

  useEffect(() => {
    if(surveyValue.category && 
      surveyValue.read && 
      surveyValue.loading &&
       surveyValue.user && 
       surveyValue.phone && 
       isValidPhone) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [surveyValue])

  // Select onChange Handler
  const onChangeSelect = (e) => setSurveyValue(prev => ({
    ...prev,
    deviceType: e.value
  }))

  // Category onChange Handler
  const onChangeCategory = (e) => setSurveyValue(prev => ({
    ...prev,
    category: e.target.value
  }))

  // Read onChange Handler
  const onChangeRead = (e) => setSurveyValue(prev => ({
    ...prev,
    read: e.target.value
  }))

  // Loading onChange Handler
  const onChangeLoading = (e) => setSurveyValue(prev => ({
    ...prev,
    loading: e.target.value
  }))

  // User onChange Handler
  const onChangeUser = (e) => setSurveyValue(prev => ({
    ...prev,
    user: e.target.value
  }))

  // Text onChange Handler
  const onChangeText = (e) => setSurveyValue(prev => ({
    ...prev,
    text: e.target.value
  }))

  // Phone onChange Handler
  const onChangePhone = (e) => {
    const regExp = /^01([0|1|6|7|8|9]?)-([0-9]{3,4})-([0-9]{4})$/;

    setSurveyValue(prev => ({
      ...prev,
      phone: e.target.value
    }))

    if(regExp.test(e.target.value)) {
      setIsValidPhone(true)
      setErrorMessage("")
    } else {
      setIsValidPhone(false)
      setErrorMessage("올바르지 않은 휴대폰 번호입니다.")
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(isValid) {
      const data = []
      let seq = 1;

      for(let type in surveyValue) {
        data.push({
          questionId: seq,
          response: surveyValue[type], 
        })
        seq++;
      }
      setAnswer(data, 
        (response) => {
          console.log(response)
          setSurveyModalOpen(false);
        },
        (error) => {
          console.log(error)
          console.log(error)
        })
    }
  }

  return (
    <SurveyForm onSubmit={handleSubmit}>
      <SurveyTitle>깜짝설문 !</SurveyTitle>
      <SurveyDescription>참여해주신 분들께 추첨을 통해 커피쿠폰을 드립니다!</SurveyDescription>
      <br />
      <SurveyContents>
        <SurveyQuestion>1. 서비스를 이용한 환경이 무엇인가요? </SurveyQuestion>
          <Select 
            options={options}
            defaultValue={options[0]}
            onChange={onChangeSelect}
          />
        <SurveyQuestion>2. 뉴스 기사의 카테고리가 다양한가요?</SurveyQuestion>
        <AnswerWrapper>
          <input type="radio" id="check1" name="category" value="네, 다양합니다." onChange={onChangeCategory}/>
          <label htmlFor="check1" style={{fontSize: '13px'}}> 네, 다양합니다. </label>
        </AnswerWrapper>
        <AnswerWrapper>
          <input type="radio" id="check2" name="category" value="적당합니다." onChange={onChangeCategory}/>
          <label htmlFor="check2" style={{fontSize: '13px'}}> 적당합니다. </label>
        </AnswerWrapper>
        <AnswerWrapper>
          <input type="radio" id="check3" name="category" value="부족한 것 같습니다." onChange={onChangeCategory}/>
          <label htmlFor="check3" style={{fontSize: '13px'}}> 부족한 것 같네요. </label>
        </AnswerWrapper>
        <SurveyQuestion>3. 웹 사이트의 디자인은 괜찮나요?</SurveyQuestion>
        <SelectAnswer qId={'read'} qName={'read'} onChangeHandler={onChangeRead}/>
        <SurveyQuestion>4. 웹 사이트의 로딩 속도에 만족하십니까?</SurveyQuestion>
        <SelectAnswer qId={'loading'} qName={'loading'} onChangeHandler={onChangeLoading}/>
        <SurveyQuestion>5. 웹 사이트 사용자 경험(페이지 이동의 편의성, 버튼 및 링크의 명확성 등)에 만족하십니까?</SurveyQuestion>
        <SelectAnswer qId={'user'} qName={'user'} onChangeHandler={onChangeUser}/>
        <SurveyQuestion>
          6. 개선할 점이 있다면 적어주세요.<br />
          <SurveyText>(작성하시면 당첨 확률이 올라갑니다!)</SurveyText>
        </SurveyQuestion>
        <textarea rows={5} name="text" onChange={onChangeText}/>
        <SurveyQuestion>7. 기프티콘 전송을 위해 휴대폰 번호를 입력해주세요. ex) 000-0000-0000</SurveyQuestion>
        <input type="tel" id="phone" name="phone" onChange={onChangePhone}/>
        <label htmlFor="phone" style={{fontSize: '13px', fontWeight: 700, color: '#8AC038'}}>{errorMessage}</label>
      </SurveyContents>
      <SurveyButton style={{ backgroundColor: isValid ? '#8AC038' : 'lightgray' }}>참여완료</SurveyButton>
    </SurveyForm>
  )
}

function Survey({ surveyModalOpen, setSurveyModalOpen }) {
  return (
    <Modal
      isOpen={surveyModalOpen}
      onRequestClose={() => setSurveyModalOpen(false)}
      style={customModal}
      ariaHideApp={true}
      shouldCloseOnOverlayClick={true}
      contentLabel="user_survey"
    >
      <SurveyContent setSurveyModalOpen={setSurveyModalOpen} />
    </Modal>
  )
}

export default Survey