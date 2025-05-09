import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

type Driver = {
    full_name: string;
    country: string;
    team: string;
    number: string | number;
};

export default function DriverDetails() {
    const { number } = useParams();
    const navigate = useNavigate();

    const [driver, setDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!number) return;

        axios.get('http://localhost:8000/api/drivers')
            .then((res) => {
                console.log('🔍 Respuesta de API:', res.data);
                const foundDriver = res.data.find((d: Driver) => String(d.number) === String(number));
                if (foundDriver) {
                    setDriver(foundDriver);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('❌ Error al cargar driver:', err);
                setError(true);
                setLoading(false);
            });
    }, [number]);

    if (loading) {
        return <p className="text-center text-xl">Loading driver details...</p>;
    }

    if (error || !driver) {
        return (
            <div className="text-center">
                <p className="text-xl text-red-500 mb-4">Driver not found or error loading data.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to List
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-red-600">Driver Details</h1>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
                <img
                    src={driver.headshot_url || 'https://media.formula1.com/d_driver_fallback_image.png/content/'}
                    onError={(e) => {
                        e.currentTarget.src = 'https://media.formula1.com/d_driver_fallback_image.png/content/';
                    }}
                    alt={driver.full_name}
                    className="w-48 h-48 object-cover rounded-full mx-auto mb-6 shadow"
                />

                <p className="text-xl mb-2">👤 <strong>Name:</strong> {driver.full_name}</p>
                <p className="text-xl mb-2">🏳️ <strong>Country:</strong> {driver.country}</p>
                <p className="text-xl mb-2">🏎️ <strong>Team:</strong> {driver.team}</p>
                <p className="text-xl mb-6">🔢 <strong>Number:</strong> #{driver.number}</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to List
                </button>
            </div>
        </div>
    );
}
