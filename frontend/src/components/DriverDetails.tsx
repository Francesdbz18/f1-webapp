import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DriverStats from './DriverStats';

type Driver = {
    full_name: string;
    country: string;
    team: string;
    number: string;
    headshot_url: string;
};

export default function DriverDetails() {
    const { number } = useParams();
    const navigate = useNavigate();
    const [driver, setDriver] = useState<Driver | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/driver/${number}`)
            .then(res => setDriver(res.data))
            .catch(() => setDriver(null));
    }, [number]);

    if (!driver) {
        return <p className="text-center">Driver not found.</p>;
    }

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
            <img
                src={driver.headshot_url}
                alt={driver.full_name}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
            />
            <h2 className="text-center text-2xl font-bold">{driver.full_name}</h2>
            <p className="text-center text-sm">{driver.country}</p>
            <p className="text-center text-sm italic">{driver.team}</p>

            {/* Aquí podrías guardar el sessionKey en localStorage/context si quieres */}
            <DriverStats driverNumber={driver.number} sessionKey={9583} />

            <button
                onClick={() => navigate('/')}
                className="mt-6 block mx-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                ← Back
            </button>
        </div>
    );
}
