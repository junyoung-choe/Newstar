import random
from typing import List

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.category.category_crud import get_user_category
from app.routers.recommend.recommend_crud import get_news_all, get_recommend_info, get_article_count, \
    get_random_articles_by_categories
from app.routers.recommend.recommend_schema import ArticleSchema
from app.routers.record.record_crud import get_like_list, get_user_view_list
from app.services.learning.news_doc2vec import make_model
from app.services.learning.news_recommend import recomm
from app.routers.verify_header import verify_header

router = APIRouter(
    prefix="/api/data/news",
)

# 추천할 뉴스 뽑기
@router.get("", response_model=List[ArticleSchema], dependencies=[verify_header()])
def recommend(request: Request, db: Session = Depends(get_db)):
    member_id = request.state.member_id
    # 시청 기록, 전체 기사의 수, 좋아요 기록 불러오기
    views = get_user_view_list(db, member_id)
    li = get_like_list(db, member_id)
    maxsize = get_article_count(db)
    # 좋아요 기록 있을때 처리
    if len(li) != 0:
        recommend_list = recomm(li, maxsize, views)
        if len(recommend_list) > 85:
            recommend_list = select_and_shuffle(recommend_list)
        else:
            random.shuffle(recommend_list)
    # 좋아요 한 데이터 없을때 선호 카테고리로 처리
    else:
        user_category = get_user_category(db, member_id)
        li = get_random_articles_by_categories(db, user_category)
        # 추천리스트중 최대 상위 30개 랜덤 셔플
        recommend_list = recomm(li, maxsize, views)[:60]
        recommend_list = recommend_list[0::2]
        random.shuffle(recommend_list)

    return get_recommend_info(db, recommend_list)

# 모델 재생성
@router.post("/model")
def makemodel(db: Session = Depends(get_db)):
    news_df = get_news_all(db)

    if len(news_df) < 3:
        return {"message" : "skip makemodel"}

    make_model(news_df)
    return {"message" : "makemodel"}


def select_and_shuffle(lst):
    # 상위 30개 중 3간격마다 추출 (top)
    top = lst[:30]
    top = top[0::3]
    random.shuffle(top)

    # 상위 30개를 제외한 나머지 중 상위 45개 중 3간격마다 추출 (middle), 리스트 끝에서부터 10개 요소 중 2간격마다 추출 (bottom)
    middle = lst[30:75]
    middle = middle[0::3]
    bottom = lst[-10:]
    bottom = bottom[0::2]
    rest = middle + bottom

    # 상위 요소를 제외한 나머지 요소를 랜덤하게 섞음.
    random.shuffle(rest)
    final_list = top + rest

    return final_list