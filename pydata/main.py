from fastapi import FastAPI
from sqlalchemy import Table, select, MetaData
from category_crawling import do_crawling
from database import get_db, engine
from models import init_db

from routers.recommend import recommend_router
from routers.recode import recode_router
from services.learning.news_doc2vec import makeModel

import csv

app = FastAPI()
# 메타데이터를 생성한다.
metadata_obj = MetaData()

@app.on_event("startup")
async def startup():
  init_db()

@app.get("/crawling")
async def start_crawling():
  do_crawling().to_sql(name='article', con= engine, if_exists='append', index=False)
  return {"message": "complete crawling"}

@app.get("/makemodel")
async def make_model():
  makeModel()
  return {"message" : "makeModel"}

@app.get("/keyword")
async def save_keyword():
  connection = next(get_db())
  try:
    article_table = Table("article",metadata_obj, autoload_with=engine)
    stmt = select(article_table)
    datas = connection.execute(stmt)
    for data in datas:
      print(data.article_id, data.content)
  finally:
    connection.close()
  return {"message" : "saveKeyword"}

@app.get("/test")
async def test():
  connection = next(get_db())
  n = 0

  try:
    article_id = Table("last_article_id", metadata_obj, autoload_with=engine)
    stmt = select(article_id)
    datas = connection.execute(stmt)
    for data in datas:
      n = data[0]
  finally:
    connection.close()

  if(n == 0) :
    print("n is 0")
  else :
    print("n is not 0")

  return {"message" : "test success"}

# Path: category_cra

app.include_router(recommend_router.router)
app.include_router(recode_router.router)


@app.get("/member" )
def read_items():
  connection = next(get_db())
  try:
    some_table = Table("member", metadata_obj, autoload_with=engine)
    stmt = select(some_table)
    datas = connection.execute(stmt)
    for data in datas:
      print(data.member_id, data.email, data)

    # result = session.query(Member).all()

    # result = connection.execute(text("SELECT * FROM member"))
    # member = result.first()
    # print(member)

  finally:
    # 데이터베이스 연결 종료
    connection.close()

