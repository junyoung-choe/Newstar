from fastapi import FastAPI, Request, APIRouter
from sqlalchemy import MetaData
from sqlalchemy.orm import Session

from app.category_crawling import do_crawling
from app.database import engine
from app.models import init_db
from app.routers.elasticsearch import es_service, es_router
from app.routers.member.member_crud import get_user_by_pw
from app.routers.recode import recode_router
from app.routers.recommend import recommend_router
from app.routers.recommend.recommend_router import makemodel
from app.routers.search import search_router
from app.routers.keywords import keyword_router

app = FastAPI()
router = APIRouter(prefix="/api/data")


# 메타데이터를 생성한다.
metadata_obj = MetaData()

# 헤더 uuid추출
@app.middleware("http")
async def add_process(request: Request, call_next):
  with Session(engine) as db:
    # 요청 헤더로부터 user_id 추출
    pw = request.headers.get("X-User-ID")
    if(pw != None):
      member_id = await get_user_by_pw(db, pw)
      # 요청 객체의 state 속성을 사용하여 user_id 저장
      request.state.member_id = member_id
      # 요청을 다음 단계로 전달
    else:
      request.state.member_id = ""
    response = await call_next(request)
    return response

@app.on_event("startup")
async def startup():
  init_db()

@router.get("/crawling")
async def start_crawling():
  # do_crawling().to_sql(name='article', con= engine, if_exists='append', index=False)
  # makemodel()
  article_id = es_service.last_article_id()

  if article_id.loc[0]['article_id'] == 0:
    es_service.init_es()
  else:
    es_service.add_es(article_id.loc[0]['article_id'])

  es_service.update_last_article_id()
  return {"message": "complete crawling"}

app.include_router(router)
app.include_router(recommend_router.router)
app.include_router(recode_router.router)
app.include_router(search_router.router)
app.include_router(es_router.router)
app.include_router(keyword_router.router)
