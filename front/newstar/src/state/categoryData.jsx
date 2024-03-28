// 카테고리 번호
const BigCategoryData = [
  { 
    code: 100,
    name: '정치',
    state: false
  }, 
  { 
    code: 101,
    name: '경제',
    state: false
  },
  { 
    code: 102,
    name: '사회',
    state: false
  },
  { 
    code: 103,
    name: '생활/문화',
    state: false
  },
  { 
    code: 104,
    name: '세계',
    state: false
  },
  {
    code: 105, 
    name: 'IT/과학',
    state: false
  }]

const SmallCategoryData = {
  100: [
    { 
      code: 265,
      name: '국회/정당'
    },
    {
      code: 268,
      name: '북한'
    },
    {
      code: 266,
      name: '행정'
    },
    {
      code: 267,
      name: '국방/외교'
    },
    {
      code: 269, 
      name: '정치일반'
    },],
  101: [
    { 
      code: 259, 
      name: '금융'
    },
    { 
      code: 260, 
      name: '부동산'
    },
    { 
      code: 262, 
      name: '글로벌 경제'
    },
    { 
      code: 310, 
      name: '생활경제'
    },
    { 
      code: 263, 
      name: '경제 일반'
    },],
  102: [
    { 
      code: 249, 
      name: '사건사고'
    },
    { 
      code: 251, 
      name: '노동'
    },
    { 
      code: 252, 
      name: '환경'
    },
    { 
      code: 255, 
      name: '식품/의료'
    },
    { 
      code: 256, 
      name: '지역'
    },],
  103: [
    { 
      code: 241, 
      name: '건강정보'
    },
    { 
      code: 239, 
      name: '자동차/시승기'
    },
    { 
      code: 240, 
      name: '도로/교통'
    },
    { 
      code: 237, 
      name: '여행/레저'
    },
    { 
      code: 238, 
      name: '음식/맛집'
    },
    { 
      code: 376, 
      name: '패션/뷰티'
    },
  ],
  104: [
    { 
      code: 231, 
      name: '아시아/호주'
    },
    { 
      code: 232, 
      name: '미국/중남미'
    },
    { 
      code: 233, 
      name: '유럽'
    },
    { 
      code: 234, 
      name: '중동/아프리카'
    },
    { 
      code: 322, 
      name: '세계 일반'
    },],
  105: [
    { 
      code: 731, 
      name: '모바일'
    },
    { 
      code: 226, 
      name: '인터넷/SNS'
    },
    { 
      code: 227, 
      name: '통신/뉴미디어'
    },
    { 
      code: 230, 
      name: 'IT 일반'
    },
    { 
      code: 732, 
      name: '보안/해킹'
    },
    { 
      code: 283, 
      name: '컴퓨터'
    },
    { 
      code: 229, 
      name: '게임/리뷰'
    },
    { 
      code: 228, 
      name: '과학 일반'
    },]
  }

const BigCategory = { 
  100: '정치', 
  101: '경제',
  102: '사회',
  103: '생활/문화',
  104: '세계', 
  105: 'IT/과학'
}

const SmallCategory = {
  265: '국회/정당',
  268: '북한',
  266: '행정',
  267: '국방/외교',
  269: '정치일반',
  
  259: '금융',
  260: '부동산',
  262: '글로벌 경제',
  310: '생활경제',
  263: '경제 일반',

  249: '사건사고',
  251: '노동',
  252: '환경',
  255: '식품/의료',
  256: '지역',

  241: '건강정보',
  239: '자동차/시승기',
  240: '도로/교통',
  237: '여행/레저',
  238: '음식/맛집',
  376: '패션/뷰티',

  231: '아시아/호주',
  232: '미국/중남미',
  233: '유럽',
  234: '중동/아프리카',
  322: '세계 일반',
  
  731: '모바일',
  226: '인터넷/SNS',
  227: '통신/뉴미디어',
  230: 'IT 일반',
  732: '보안/해킹',
  283: '컴퓨터',
  229: '게임/리뷰',
  228: '과학 일반',
}


export { BigCategory, SmallCategory, BigCategoryData, SmallCategoryData }
