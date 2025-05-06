from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

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
        url = "https://api.openf1.org/v1/drivers"
        params = {"session_key": 9583}  # Qatar 2023 FP1 como ejemplo

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()

        data = response.json()

        if not isinstance(data, list):
            return {"error": "Respuesta inesperada de la API externa"}

        # Filtra los primeros 20 y simplifica
        drivers = []
        seen = set()
        for entry in data:
            name = entry.get("full_name")
            if name and name not in seen:
                seen.add(name)
                drivers.append({
                    "full_name": entry.get("full_name"),
                    "country": entry.get("country_code", "Unknown"),
                    "team": entry.get("team_name", "Unknown"),
                    "number": entry.get("driver_number", "?")
                })
            if len(drivers) >= 20:
                break

        return drivers

    except Exception as e:
        return {"error": f"Falló la llamada a OpenF1: {str(e)}"}
