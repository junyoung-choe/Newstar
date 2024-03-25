from fastapi import APIRouter
import logging

LOGGER = logging.getLogger(__name__)

router = APIRouter(
    prefix="/home",
    tags=['home']
)

@router.get("")
async def welcome_home():
    LOGGER.info("Welcome newstar!")
    return "welcome newstar!"

@router.get("/test")
async def test_home():
    LOGGER.info("Welcome page test")
    return "Welcome page test"