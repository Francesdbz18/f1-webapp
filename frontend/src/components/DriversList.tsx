import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Driver = {
  name: string;
  team: string;
  nationality: string;
  driver_number: string;
};

const teamColors: { [team: string]: string } = {
  'Red Bull': 'bg-blue-600',
  'Mercedes': 'bg-gray-700',
  'Ferrari': 'bg-red-500',
};

export default function DriversList() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/drivers')
      .then(res => setDrivers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {drivers.map((d) => (
        <div
          key={d.name}
          className={`p-6 rounded-xl shadow-md text-white ${teamColors[d.team] || 'bg-gray-500'}`}
        >
          <h2 className="text-xl font-semibold">#{d.driver_number} - {d.name}</h2>
          <p className="text-sm opacity-80">Team: {d.team}</p>
          <p className="text-sm">Nationality: {d.nationality}</p>
        </div>
      ))}
    </div>
  );
}