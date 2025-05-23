import httpx
import unidecode
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"],
                   allow_headers=["*"], )

BASE_URL = "https://api.openf1.org/v1"


def generate_f1_headshot_url(full_name: str) -> str:
    name = unidecode.unidecode(full_name)
    parts = name.strip().split()

    if len(parts) < 2:
        return "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers"

    first = parts[0]
    last = parts[-1]
    middle = parts[1] if len(parts) > 2 else ""

    code = (first[:3] + last[:3] + "01").upper()
    safe_name = first + "_" + last if not middle else f"{first} {middle}_{last}"
    firstletter = safe_name[0].upper()

    return f"https://www.formula1.com/content/dam/fom-website/drivers/{firstletter}/{code}_{safe_name}/{code.lower()}.png.transform/3col/image.png"


@app.get("/api/sessions")
async def get_sessions(year: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/sessions", params={"year": year, "session_type": "Race"})
        response.raise_for_status()

    data = response.json()
    return [{"session_key": s["session_key"],
             "label": f"{s['country_name']} - {s['circuit_short_name']} - {s['session_name']}",
             "date": s["date_start"][:10]} for s in data]


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

        headshot = d.get("headshot_url") or ""
        if "/1col/" in headshot:
            headshot = headshot.replace("/1col/", "/3col/")
        if not headshot or not headshot.startswith("http") or not headshot.endswith("3col/image.png"):
            headshot = generate_f1_headshot_url(name)

        drivers[key] = {"full_name": name, "team": d.get("team_name") or "Unknown",
                        "country": d.get("country_code") or "", "number": str(number), "headshot_url": headshot,
                        "team_colour": "#" + (d.get("team_colour") or "555555"), }

    return list(drivers.values())


@app.get("/api/laps")
async def get_laps(driver_number: str, session_key: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/laps",
                                    params={"driver_number": driver_number, "session_key": session_key})
        response.raise_for_status()
        return response.json()
