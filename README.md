## F1 WebApp — Estadísticas y pilotos de Fórmula 1

Aplicación web para consultar información de pilotos de F1 por temporada y carrera, mostrando sus detalles, estadísticas y tiempos por vuelta.
Usa datos oficiales de la [API OpenF1](https://openf1.org).

---

## Tecnologías usadas

### Frontend

* React + Vite
* TypeScript
* Tailwind CSS
* Axios
* React Router
* Chart.js (para gráficas)

### Backend

* FastAPI
* HTTPX
* API externa: [OpenF1](https://openf1.org)

---

## Instalación en local

### Requisitos previos

* Node.js v18+
* Python 3.10+
* (Opcional) Virtualenv para backend

---

### 1. Clona el repositorio

```bash
git clone https://github.com/francesdbz18/f1-webapp.git
cd f1-webapp
```

---

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Abre en navegador: [http://localhost:5173](http://localhost:5173)

---

### 3. Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API disponible en: [http://localhost:8000](http://localhost:8000)

---

## Estructura del proyecto

```
f1-webapp/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── components/
│           ├── YearSelector.tsx
│           ├── SessionSelector.tsx
│           ├── DriversList.tsx
│           ├── DriverDetails.tsx
│           ├── DriverStats.tsx
│           └── teamLogos.ts
```

---

## Funcionalidades

* Filtra pilotos por año y carrera
* Muestra gráficas de tiempos por vuelta (en segundos)
* Muestra headshots y logos de escuderías actuales.
* Colores reales de equipos según OpenF1
* Usa la API externa en tiempo real

---

## To-do / Mejoras futuras

* Mostrar clasificación, posición final o abandonos
* Añadir filtros por escudería
* Historial de resultados por piloto

---

## Disclaimer

This is an educational project and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trademarks of Formula One Licensing B.V.

---
