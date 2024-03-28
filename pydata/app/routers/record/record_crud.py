from typing import List

from sqlalchemy.orm import Session

from app.database import engine
import pandas as pd

from app.models import Record


def get_like_list(db: Session, member_id):
    like_list_query = db.query(Record.article_id).filter(Record.member_id == member_id, Record.likes == 1)
    like_list = [record.article_id for record in like_list_query.all()]
    return like_list

def get_user_view_list(db: Session, member_id) -> List[int]:
    article_ids = []
    records = db.query(Record.article_id).filter(Record.member_id == member_id).all()
    article_ids.extend(record.article_id for record in records)
    return article_ids

def get_news_all(db : Session):
    news_df = pd.read_sql("SELECT * FROM article", con = engine)
    return news_df
