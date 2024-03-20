import os
import json

from fastapi import APIRouter
from typing import List
from app.routers.search.search_schema import Articles, Keyword
from elasticsearch import Elasticsearch

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(os.path.dirname(BASE_DIR))
SECRET_FILE = os.path.join(PARENT_DIR, 'secrets.json')

with open(SECRET_FILE) as f:
    secrets = json.load(f)

ES = secrets['ES']

router = APIRouter(
    prefix="/api/data/news",
)

@router.post("", response_model=List[Articles])
def search(keyword: Keyword):
    keyword = keyword.keyword
    print(keyword)
    res = []
    index_name = 'article'

    es = Elasticsearch(f"{ES['host']}")
    results = es.search(index=index_name, body={'from': 0, 'size': 10, 'query': {'match': {'content': keyword}}})
    for result in results['hits']['hits']:
        article_id = result['_source']['article_id']
        title = result['_source']['title']
        image_url = result['_source']['image_url']
        article = Articles(article_id=article_id, title=title, image_url=image_url)
        res.append(article)
    return res
