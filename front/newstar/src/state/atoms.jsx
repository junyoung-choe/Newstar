import { atom } from "recoil"

const newsDataState = atom({
  key: "newsDataState",
  default: []
})

const keywordState = atom({
  key: "keywordState",
  default: ""
})

const recordDataState = atom({
  key: "recordState",
  default: ""
})

const categoryDataState = atom({
  key: "categoryState",
  default: []
})

const likeDataState = atom({
  key: "likeState",
  default: ""
})

const userKeyState = atom({
  key: "userKey",
  default: ""

})

export { 
  userKeyState,
  newsDataState,
  likeDataState, 
  recordDataState,
  categoryDataState
 }