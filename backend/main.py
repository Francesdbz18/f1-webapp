from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
import unidecode

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cambiar para producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.openf1.org/v1"

# --------------------- 🔧 UTILITY ---------------------

def generate_f1_headshot_url(full_name: str) -> str:
    name = unidecode.unidecode(full_name)
    parts = name.strip().split()

    if len(parts) < 2:
        return None

    first = parts[0]
    last = parts[-1]
    middle = parts[1] if len(parts) > 2 else ""

    code = (first[:3] + last[:3] + "01").upper()
    safe_name = first + "_" + last if not middle else f"{first} {middle}_{last}"
    firstletter = safe_name[0].upper()

    return f"https://www.formula1.com/content/dam/fom-website/drivers/{firstletter}/{code}_{safe_name}/{code.lower()}.png.transform/3col/image.png"

# --------------------- ✅ API ENDPOINTS ---------------------

@app.get("/api/sessions")
async def get_sessions(year: int = Query(..., description="e.g. 2024")):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/sessions", params={"year": year, "session_type": "Race"})
        response.raise_for_status()
        return response.json()

@app.get("/api/drivers")
async def get_drivers(session_key: int = Query(...)):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/drivers", params={"session_key": session_key})
        response.raise_for_status()
        data = response.json()

    drivers = {}
    for d in data:
        number = d.get("driver_number")
        name = d.get("full_name")
        if not name or not number:
            continue

        key = f"{number}-{name}"
        if key in drivers:
            continue

        headshot = d.get("headshot_url")
        if headshot and "/1col/" in headshot:
            headshot = headshot.replace("/1col/", "/3col/")
        elif not headshot or not headshot.startswith("http"):
            headshot = generate_f1_headshot_url(name)

        drivers[key] = {
            "full_name": name,
            "team": d.get("team_name") or "Unknown",
            "country": d.get("country_code") or "Unknown",
            "number": str(number),
            "headshot_url": headshot
        }

    return list(drivers.values())

@app.get("/api/driver/{number}")
async def get_driver(number: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/drivers")
        response.raise_for_status()
        data = response.json()

    for d in data:
        if str(d.get("driver_number")) == number:
            return {
                "full_name": d.get("full_name"),
                "team": d.get("team_name"),
                "country": d.get("country_code"),
                "number": d.get("driver_number"),
                "headshot_url": d.get("headshot_url") or generate_f1_headshot_url(d.get("full_name"))
            }

    return {"error": "Driver not found"}

@app.get("/api/laps")
async def get_laps(driver_number: str, session_key: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/lap_times", params={
            "driver_number": driver_number,
            "session_key": session_key
        })
        response.raise_for_status()
        return response.json()