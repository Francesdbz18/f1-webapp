import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

type Props = {
    driverNumber: string;
    sessionKey: number;
};

function parseLapTime(time: string | null): number | null {
    if (!time) return null;

    const parts = time.split(':');
    if (parts.length === 2) {
        const minutes = parseFloat(parts[0]);
        const seconds = parseFloat(parts[1]);
        return minutes * 60 + seconds;
    }

    const sec = parseFloat(time);
    return isNaN(sec) ? null : sec;
}


export default function DriverStats({ driverNumber, sessionKey }: Readonly<Props>) {
    const [lapData, setLapData] = useState<number[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/laps`, {
            params: { driver_number: driverNumber, session_key: sessionKey }
        }).then(res => {
            console.log('📊 Vueltas recibidas:', res.data); // DEBUG
            const times = res.data
                .map((lap: any) => parseLapTime(lap.lap_time))
                .filter((t: number | null): t is number => t !== null);

            setLapData(times);
        });

    }, [driverNumber, sessionKey]);

    if (lapData.length === 0) {
        return <p className="text-center text-sm italic mt-4">No hay datos de vueltas disponibles.</p>;
    }


    return (
        <div className="mt-6">
            <h3 className="text-center font-semibold mb-2">Lap Times</h3>
            <Line
                data={{
                    labels: lapData.map((_, i) => `Lap ${i + 1}`),
                    datasets: [
                        {
                            label: 'Lap Time (s)',
                            data: lapData,
                            borderColor: 'red',
                            fill: false,
                            tension: 0.3
                        }
                    ]
                }}
                options={{ responsive: true }}
            />
        </div>
    );
}
