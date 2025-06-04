from fastapi import APIRouter, Query
from app.services.drivers_service import fetch_drivers
router = APIRouter()

@router.get("/drivers")
async def get_drivers(session_key: int = Query(...)):
    return await fetch_drivers(session_key)