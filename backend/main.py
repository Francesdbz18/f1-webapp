from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import unidecode
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/drivers")
async def get_drivers():
    try:
        session_key = 9583  # Ejemplo: GP Japón 2024 Carrera (actualízalo según necesites)
        url = "https://api.openf1.org/v1/drivers"
        params = {"session_key": session_key}

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()

        data = response.json()

        if not isinstance(data, list):
            return {"error": "Respuesta inesperada de la API externa"}

        drivers = {}
        for driver in data:
            number = driver.get("driver_number")
            name = driver.get("full_name")
            team = driver.get("team_name")
            country = driver.get("country_code")
            headshot = driver.get("headshot_url")

            if not name or not number:
                continue

            unique_key = f"{number}-{name}"
            if unique_key in drivers:
                continue

            # Mejora la calidad de imagen
            if headshot and isinstance(headshot, str) and "/1col/" in headshot:
                headshot = headshot.replace("/1col/", "/3col/")
            elif not headshot or not headshot.startswith("http"):
                headshot = generate_f1_headshot_url(name)

            drivers[unique_key] = {
                "full_name": name,
                "team": team or "Unknown",
                "country": country or "Unknown",
                "number": str(number),
                "headshot_url": headshot
            }

        return list(drivers.values())

    except Exception as e:
        return {"error": f"Falló la llamada a OpenF1: {str(e)}"}

@app.get("/api/driver/{number}")
async def get_driver(number: str):
    try:
        url = "https://api.openf1.org/v1/drivers"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()

        data = response.json()

        for driver in data:
            if str(driver.get("driver_number")) == number:
                return {
                    "full_name": driver.get("full_name"),
                    "team": driver.get("team_name"),
                    "country": driver.get("country_code"),
                    "number": driver.get("driver_number"),
                }

        return {"error": "Driver not found"}

    except Exception as e:
        return {"error": f"Error fetching driver: {str(e)}"}

def generate_f1_headshot_url(full_name: str) -> str:
    name = unidecode.unidecode(full_name)

    parts = name.strip().split()


    first = parts[0]
    if len(parts) > 2:
        middle = parts[1]
    last = parts[-1]

    code = (
            first[:3].upper() +
            last[:3].upper() +
            "01"
    )

    safe_name = first + "_" + last
    if len(parts) > 2:
        safe_name = first + " " + middle + "_" + last

    firstletter = safe_name[0].upper()

    return f"https://www.formula1.com/content/dam/fom-website/drivers/{firstletter}/{code}_{safe_name}/{code.lower()}.png.transform/3col/image.png"

