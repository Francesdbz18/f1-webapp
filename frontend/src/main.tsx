import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DriverDetails from './components/DriverDetails';
import DriversList from './components/DriversList';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">F1 Driver Standings</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DriversList />} />
                <Route path="/driver/:number" element={<DriverDetails />} />
            </Routes>
        </BrowserRouter>
    </div>
  </React.StrictMode>,
);
