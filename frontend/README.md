# F1 Driver Viewer Frontend

This is the frontend of the F1 Driver Viewer, built with React and TypeScript. It provides a user interface for viewing Formula 1 driver statistics, session details, and lap times.

---

## Technologies Used

- **React**: Component-based UI framework
- **TypeScript**: Strongly typed JavaScript
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router**: Routing library for navigation
- **Chart.js**: Library for creating charts and graphs

---

## Installation

### Prerequisites

- Node.js v18+
- npm (comes with Node.js)

---

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/francesdbz18/f1-webapp.git
   cd f1-webapp/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx                  ← Main application component
│   ├── main.tsx                 ← Entry point for React
│   ├── index.css                ← Global styles
│   ├── components/              ← Reusable UI components
│   │   ├── DriversList.tsx      ← Component for displaying drivers
│   │   ├── DriverDetails.tsx    ← Component for driver details
│   │   ├── DriverStats.tsx      ← Component for driver statistics
│   │   ├── SessionSelector.tsx  ← Dropdown for selecting sessions
│   │   ├── YearSelector.tsx     ← Dropdown for selecting years
│   │   ├── teamLogos.ts         ← Mapping of team names to logo URLs
│   └── assets/                  ← Static assets (images, etc.)
├── tsconfig.json                ← TypeScript configuration
├── vite.config.mts              ← Vite configuration
├── index.html                   ← HTML template
└── package.json                 ← Project dependencies
```

---

## Features

- **Driver List**: Displays drivers with their headshots, teams, and countries.
- **Session Selector**: Allows filtering drivers by session.
- **Team Logos**: Displays team logos dynamically based on driver data.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## To-do / Future Improvements

- Add filters for teams and countries.
- Enhance UI with animations and transitions.
- Add championship standings.

---

## Disclaimer

This is an educational project and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trademarks of Formula One Licensing B.V.

---
```