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

export default function DriverStats({ driverNumber, sessionKey }: Props) {
    const [lapData, setLapData] = useState<number[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/laps`, {
            params: { driver_number: driverNumber, session_key: sessionKey }
        }).then(res => {
            const times = res.data.map((lap: any) => lap.lap_time).filter(Boolean);
            setLapData(times);
        });
    }, [driverNumber, sessionKey]);

    if (lapData.length === 0) return null;

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
