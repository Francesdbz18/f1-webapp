import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeasonSelector from './components/SeasonSelector';
import DriversList from './components/DriversList';
import DriverDetails from './components/DriverDetails';

export default function App() {
    const [sessionKey, setSessionKey] = useState<number | null>(null);

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-red-600">F1 Driver Viewer</h1>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <SeasonSelector year={2025} onChange={setSessionKey} />
                                {sessionKey && <DriversList sessionKey={sessionKey} />}
                            </>
                        }
                    />
                    <Route path="/driver/:number" element={<DriverDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
