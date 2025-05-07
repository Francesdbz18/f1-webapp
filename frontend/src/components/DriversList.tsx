import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Driver = {
  full_name: string;
  country: string;
  team: string;
  number: string;
};

const teamColors: { [team: string]: string } = {
  'Red Bull Racing': 'bg-blue-950',
  'Mercedes': 'bg-slate-400',
  'Ferrari': 'bg-red-600',
  'McLaren': 'bg-orange-500',
  'Aston Martin': 'bg-green-700',
  'Alpine': 'bg-indigo-600',
  'RB': 'bg-blue-700',
  'Kick Sauber': 'bg-lime-400',
  'Williams': 'bg-blue-600',
  'Haas F1 Team': 'bg-slate-950',
};

export default function DriversList() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/drivers')
        .then(res => setDrivers(res.data))
        .catch(err => console.error(err));
  }, []);

  return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver, index) => (
            <Link to={`/driver/${driver.number}`} key={driver.number}>
              <div
                  className={`p-6 rounded-xl shadow-lg text-white ${
                      teamColors[driver.team] || 'bg-gray-500'
                  }`}
              >
                <div className="text-sm opacity-80 mb-1">#{driver.number}</div>
                <h2 className="text-xl font-bold">{driver.full_name}</h2>
                <p className="text-sm"> {driver.country}</p>
                <p className="text-sm italic">{driver.team}</p>
              </div>
            </Link>
        ))}
      </div>
  );
}
