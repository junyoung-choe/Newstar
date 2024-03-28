from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import Member

def get_user_by_pw(db: Session, pw: str):
    result = db.query(Member).with_entities(Member.member_id).filter(Member.pw == pw).first()
    if result is None:
        raise HTTPException(status_code=400, detail="요청한 사용자를 찾을 수 없습니다. X-User-Id 값을 확인하세요.")
    else:
        member_id = result.member_id
    return member_id
