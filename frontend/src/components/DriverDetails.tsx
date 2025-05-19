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
    team_colour: string;
};

export default function DriverDetails() {
    const { number } = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const sessionKey = Number(query.get("session_key"));
    const navigate = useNavigate();

    const [driver, setDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionKey || !number) return;

        axios.get(`http://localhost:8000/api/drivers?session_key=${sessionKey}`)
            .then(res => {
                const found = res.data.find((d: Driver) => String(d.number) === String(number));
                setDriver(found ?? null);
            })
            .finally(() => setLoading(false));
    }, [number, sessionKey]);

    if (loading) {
        return <p className="text-center text-gray-600 text-lg">Cargando datos del piloto...</p>;
    }

    if (!driver) {
        return (
            <div className="text-center text-red-600">
                <p className="text-lg font-semibold">Piloto no encontrado en esta sesión.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    ← Volver
                </button>
            </div>
        );
    }

    return (
        <div
            className="max-w-xl mx-auto p-6 rounded-xl shadow text-white"
            style={{ backgroundColor: driver.team_colour }}
        >
            <img
                src={driver.headshot_url}
                alt={driver.full_name}
                onError={(e) =>
                    (e.currentTarget.src = 'https://media.formula1.com/d_driver_fallback_image.png')
                }
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-white"
            />
            <h2 className="text-center text-2xl font-bold">{driver.full_name}</h2>
            <p className="text-center text-sm">{driver.country}</p>
            <p className="text-center text-sm italic">{driver.team}</p>

            <DriverStats driverNumber={driver.number} sessionKey={sessionKey} />

            <button
                onClick={() => navigate('/')}
                className="mt-6 block mx-auto px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
            >
                ← Volver
            </button>
        </div>
    );
}
