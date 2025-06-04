from fastapi import APIRouter
import httpx

BASE_URL = "https://api.openf1.org/v1"

router = APIRouter()

@router.get("/laps")
async def get_laps(driver_number: str, session_key: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/laps",
                                    params={"driver_number": driver_number, "session_key": session_key})
        response.raise_for_status()
        return response.json()