from pydantic import BaseModel

class Driver(BaseModel):
    full_name: str
    number: str
    team: str
    country: str
    headshot_url: str
    team_colour: str