from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.routers.keywords.keyword_schema import Content
from app.routers.keywords.keyword_service import make_keyword

from app.database import get_db

router = APIRouter(
    prefix="/api/data",
)

@router.get("/keywordtest")
def keyword_test(content : Content):
    print(content.content)
    make_keyword(content.content)