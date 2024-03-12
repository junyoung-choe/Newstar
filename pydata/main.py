from cgitb import text

from fastapi import FastAPI
from sqlalchemy import Table, select, MetaData
from category_crawling import do_crawling
from database import get_db, engine
from models import init_db

app = FastAPI()
# 메타데이터를 생성한다.
metadata_obj = MetaData()

@app.on_event("startup")
async def startup():
  init_db()

@app.get("/")
async def root():
  return {"message": "Hello World"}

@app.get("/crawling")
async def start_crawling():
  do_crawling()
  return {"message": "complete crawling"}

# Path: category_cra

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
