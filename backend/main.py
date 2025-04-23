from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/drivers")
def get_drivers():
    return [
        {"name": "Max Verstappen", "team": "Red Bull"},
        {"name": "Lewis Hamilton", "team": "Mercedes"},
        {"name": "Charles Leclerc", "team": "Ferrari"},
    ]