import httpx
from app.models.session import Session

BASE_URL = "https://api.openf1.org/v1"

async def fetch_sessions(year: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/sessions", params={"year": year, "session_type": "Race"})
        response.raise_for_status()

    data = response.json()
    return [
        Session(
            session_key=s["session_key"],
            label=f"{s['country_name']} - {s['circuit_short_name']} - {translate_session_name(s['session_name'])}",
            date=s["date_start"][:10],
        )
        for s in data
    ]

def translate_session_name(name: str) -> str:
    if name == "Race":
        return "Carrera"
    elif name == "Sprint":
        return "Carrera al sprint"
    return name

