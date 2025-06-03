from pydantic import BaseModel

class Session(BaseModel):
    session_key: int
    label: str
    date: str