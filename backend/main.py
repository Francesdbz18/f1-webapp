from fastapi import FastAPI
from app.core.config import configure_cors
from app.api.endpoints.drivers import router as drivers_router
from app.api.endpoints.sessions import router as sessions_router
from app.api.endpoints.laps import router as laps_router

app = FastAPI()

configure_cors(app)

app.include_router(drivers_router, prefix="/api")
app.include_router(sessions_router, prefix="/api")
app.include_router(laps_router, prefix="/api")
