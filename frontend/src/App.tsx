import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SessionSelector from './components/SessionSelector';
import YearSelector from './components/YearSelector';
import DriversList from './components/DriversList';
import DriverDetails from './components/DriverDetails';

export default function App() {
    const [sessionKey, setSessionKey] = useState<number | null>(null);
    const [year, setYear] = useState<number>(2024);

    return (<BrowserRouter>
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-6 text-red-600">F1 Driver Viewer</h1>
            <Routes>
                <Route
                    path="/"
                    element={<>
                        <YearSelector selectedYear={year} onChange={setYear}/>
                        <SessionSelector year={year} onChange={setSessionKey}/>
                        {sessionKey && <DriversList sessionKey={sessionKey}/>}
                    </>}
                />
                <Route path="/driver/:number" element={<DriverDetails/>}/>
            </Routes>
        </div>
    </BrowserRouter>);
}
