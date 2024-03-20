from fastapi import Depends
from sqlalchemy.orm import Session

from krwordrank.word import KRWordRank
from krwordrank.hangle import normalize

from app.database import get_db

def make_keyword(content : str, db: Session = Depends(get_db())):
    print(content)
    min_count = 1   # 단어의 최소 출현 빈도수 (그래프 생성 시)
    max_length = 10 # 단어의 최대 길이
    # verbose =True
    wordrank_extractor = KRWordRank(min_count, max_length , verbose=True)

    beta = 0.85    # PageRank의 decaying factor beta
    max_iter = 10

    texts = content.split(".")
    print(texts)
    texts = [normalize(text,english=False , number=True) for text in texts ]
    keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)

    for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:30]:
        print('%8s:\t%.4f' % (word, r))

    from krwordrank.word import summarize_with_keywords

    stopwords ={'제거','할','단어', '있다', '있는'}
    keywords = summarize_with_keywords(texts, min_count=4, max_length=10,
                                       beta=0.85, max_iter=10, stopwords=stopwords, verbose=True)
    # keywords = summarize_with_keywords(texts) # with default arguments
    print(keywords)