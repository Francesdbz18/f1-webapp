import React from 'react';
import ReactDOM from 'react-dom/client';
import DriversList from './components/DriversList';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">F1 Driver Standings</h1>
      <DriversList />
    </div>
  </React.StrictMode>,
);
