import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

type Props = {
    driverNumber: string; sessionKey: number;
};

export default function DriverStats({driverNumber, sessionKey}: Readonly<Props>) {
    const [lapData, setLapData] = useState<number[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/laps`, {
            params: {driver_number: driverNumber, session_key: sessionKey}
        }).then(res => {
            console.log("📊 Vueltas recibidas:", res.data);
            const times = res.data
                .map((lap: any) => lap.lap_duration)
                .filter((t: number | null): t is number => typeof t === 'number' && t > 0);
            setLapData(times);
        }).catch(err => {
            console.error("❌ Error al obtener vueltas:", err);
        });
    }, [driverNumber, sessionKey]);


    if (lapData.length === 0) {
        return <p className="text-center text-sm italic mt-4">No hay datos de vueltas disponibles.</p>;
    }


    return (<div className="mt-6">
            <h3 className="text-center font-semibold mb-2">Lap Times</h3>
            <Line
                data={{
                    labels: lapData.map((_, i) => `Lap ${i + 1}`), datasets: [{
                        label: 'Lap Time (s)', data: lapData, borderColor: 'red', fill: false, tension: 0.3
                    }]
                }}
                options={{responsive: true}}
            />
        </div>);
}
