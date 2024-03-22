from typing import Union

from pydantic import BaseModel
from datetime import datetime

class Recommend(BaseModel):
    articleId : int
    rank : int

class ArticleSchema(BaseModel):
    article_id: Union[int,None] = None
    title: Union[str,None] = None
    url: Union[str,None] = None
    date: Union[datetime,None] = None
    bcategory: Union[int,None] = None
    scategory: Union[int,None] = None
    image_url: Union[str,None] = None
    content: Union[str,None] = None
