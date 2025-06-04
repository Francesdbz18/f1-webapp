from fastapi import APIRouter, Query
from app.services.sessions_service import fetch_sessions


router = APIRouter()

@router.get("/sessions")
async def get_sessions(year: int = Query(...)):
    return await fetch_sessions(year)