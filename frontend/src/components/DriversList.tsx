import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {teamLogos} from './teamLogos';

type Driver = {
    full_name: string; number: string; team: string; country: string; headshot_url: string; team_colour: string;
};

type Props = {
    sessionKey: number;
};

export default function DriversList({sessionKey}: Readonly<Props>) {
    const [drivers, setDrivers] = useState<Driver[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/drivers?session_key=${sessionKey}`)
            .then(res => setDrivers(res.data));
    }, [sessionKey]);

    return (<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drivers.map(driver => (<Link to={`/driver/${driver.number}?session_key=${sessionKey}`}>
                    <div
                        style={{backgroundColor: driver.team_colour}}
                        className="p-6 rounded-xl shadow text-white hover:shadow-lg transition"
                    >
                        <img
                            src={driver.headshot_url}
                            alt={driver.full_name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h2 className="text-center font-bold text-xl">{driver.full_name}</h2>
                        <p className="text-center text-sm">{driver.country}</p>
                        <p className="text-center text-sm italic">{driver.team}</p>
                        {teamLogos[driver.team] && (<img
                                src={teamLogos[driver.team]}
                                alt={`${driver.team}`}
                                className="h-8 mx-auto mt-2"
                            />)}
                    </div>
                </Link>))}
        </div>);
}
