from datetime import datetime
from typing import List

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Article
from app.database import engine
import pandas as pd

def get_news_all(db : Session):
    news_df = pd.read_sql("SELECT * FROM article", con = engine)
    return news_df

def get_recommend_info(db: Session, li):
    if len(li) == 0:
        return li
    recommended_ids = li
    articles = db.query(Article).filter(Article.article_id.in_(recommended_ids)).all()
    articles = set(articles)

    # 결과 데이터를 기존의 li의 순서에 맞추어 정렬
    articles_sorted = sorted(articles, key=lambda x: li.index(x.article_id))

    # 데이터베이스 쿼리 결과를 DataFrame으로 변환
    df = pd.DataFrame([{
        'article_id': article.article_id,
        'content': getattr(article, 'content', str),
        'summary': getattr(article, 'summary', str),
        'bcategory': getattr(article, 'bcategory', int),
        'scategory': getattr(article, 'scategory', int),
        'date': getattr(article, 'date', datetime),
        'image_url': getattr(article, 'image_url', str),
        'title': getattr(article, 'title', str),
        'url': getattr(article, 'url', str),
    } for article in articles_sorted])

    # 'summary'의 내용을 'content'로 복사하고 'summary' 컬럼 삭제
    df['content'] = df['summary']
    df.drop('summary', axis=1, inplace=True)

    # DataFrame을 다시 객체의 리스트로 변환
    articles_sorted = [Article(article_id=row['article_id'],
                               content=row['content'],
                               bcategory=row['bcategory'],
                               scategory=row['scategory'],
                               date=row['date'],
                               image_url=row['image_url'],
                               title=row['title'],
                               url=row['url'],
                               ) for index, row in df.iterrows()]
    return articles_sorted

def get_article_count(db: Session):
    count = db.query(func.count(Article.article_id)).scalar()
    return count

def get_random_articles_by_categories(db: Session, user_categories: List[int]) -> List[int]:
    article_ids = []
    for category in user_categories:
        # 각 카테고리에 대해 article 테이블에서 랜덤으로 2개의 레코드를 선택
        random_articles = db.query(Article.article_id) \
            .filter(Article.bcategory == category) \
            .order_by(func.random()) \
            .limit(5) \
            .all()
        # 선택된 레코드의 article_id를 article_ids 리스트에 추가
        article_ids.extend([article.article_id for article in random_articles])

    return article_ids