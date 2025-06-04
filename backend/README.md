
# Backend: F1 Driver Viewer

## Overview
This is the backend application for managing Formula 1 data, built with **FastAPI**. It provides endpoints to fetch driver and session information from the OpenF1 API.

## Project Structure
```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── drivers.py         ← Endpoints for drivers
│   │   │   ├── sessions.py        ← Endpoints for sessions
│   │   │   └── __init__.py
│   │   └── __init__.py
│   ├── core/
│   │   ├── config.py              ← Configuration (CORS, etc.)
│   │   └── __init__.py
│   ├── models/
│   │   ├── driver.py              ← Driver response models
│   │   ├── session.py             ← Session models
│   │   └── __init__.py
│   ├── services/
│   │   ├── drivers_service.py     ← Logic for fetching driver data
│   │   ├── sessions_service.py    ← Logic for fetching session data
│   │   └── __init__.py
│   ├── main.py                    ← Entry point (FastAPI app)
│   └── __init__.py
├── .env                           ← Contains external API URL (optional)
├── requirements.txt               ← Dependencies (FastAPI, httpx, etc.)
└── README.md                      ← Project documentation
```

## Features
- **Drivers API**: Fetch driver details including name, team, country, and headshot.
- **Sessions API**: Retrieve session information such as race date and location.
- **CORS Configuration**: Allows cross-origin requests for frontend integration.

## Requirements
- Python 3.9+
- FastAPI
- httpx
- unidecode

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Francesdbz18/your-repo-name.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   BASE_URL=https://api.openf1.org/v1
   ```

## Running the Application
Start the FastAPI application using `uvicorn`:
```bash
uvicorn backend.app.main:app --reload
```

- The app will be available at `http://127.0.0.1:8000`.
- Interactive API documentation is accessible at `http://127.0.0.1:8000/docs`.

## API Endpoints
### Drivers
- **GET** `/api/drivers?session_key=<session_key>`  
  Fetch driver details for a specific session.

### Sessions
- **GET** `/api/sessions?year=<year>`  
  Retrieve session information for a given year.

## License
This project is licensed under the MIT License.
```