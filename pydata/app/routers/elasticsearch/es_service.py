from elasticsearch import Elasticsearch
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.elasticsearch import es_crud
from app.config import conf

ES = conf['ES']

def last_article_id(db: Session = Depends(get_db)):
    article_id = es_crud.get_last_article_id(db)
    return article_id

def init_es(db: Session = Depends(get_db)):
    articles = es_crud.get_article_all(db)
    es = Elasticsearch(f"{ES['host']}")

    for idx, row in articles.iterrows():
        doc = {'article_id' : row['article_id'], 'title' : row['title'], 'content' : row['content'], 'image_url' : row['image_url']}
        es.index(index='article', doc_type='_doc', body=doc)
        es.indices.refresh(index='article')

def add_es(article_id : int, db: Session = Depends(get_db())):
    articles = es_crud.get_recent_article(article_id, db)
    es = Elasticsearch(f"{ES['host']}")

    for idx, row in articles.iterrows():
        doc = {'article_id' : row['article_id'], 'title' : row['title'], 'content' : row['content'], 'image_url' : row['image_url']}
        es.index(index='article', doc_type='_doc', body=doc)
        es.indices.refresh(index='article')

def update_last_article_id(db: Session = Depends(get_db)):
    max = es_crud.get_max_article_id(db)
    max_id = max.loc[0]['max(article_id)']
    es_crud.update_last_article_id(max_id, db)
