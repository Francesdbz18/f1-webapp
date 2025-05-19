import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

type Props = {
    driverNumber: string; sessionKey: number;
};

export default function DriverStats({driverNumber, sessionKey}: Readonly<Props>) {
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [average, setAverage] = useState<number | null>(null);
    const [dnf, setDnf] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/laps`, {
            params: {driver_number: driverNumber, session_key: sessionKey}
        }).then(res => {
            const data = res.data;

            const durations = data
                .map((lap: any) => lap.lap_duration)
                .filter((t: number) => t > 0);

            const lastLap = data[data.length - 1];
            const isFinished = lastLap?.is_finished === true;

            setLapTimes(durations);
            setAverage(durations.length ? durations.reduce((a, b) => a + b, 0) / durations.length : null);
            setDnf(!isFinished);

        });
    }, [driverNumber, sessionKey]);

    if (lapTimes.length === 0) {
        return <p className="text-center italic text-sm text-gray-600 mt-4">No hay datos de vueltas disponibles.</p>;
    }

    const formatSeconds = (secs: number): string => {
        const minutes = Math.floor(secs / 60);
        const seconds = (secs % 60).toFixed(3).padStart(6, '0');
        return `${minutes}:${seconds}`;
    };

    return (<div className="mt-6 bg-white p-4 rounded shadow text-black">
        <h3 className="text-center font-semibold mb-2">Estadísticas de Vueltas</h3>

        {average !== null && (<p className="text-center mb-1">
            <strong>Promedio:</strong> {formatSeconds(average)}
        </p>)}

        <Line
            data={{
                labels: lapTimes.map((_, i) => `Vuelta ${i + 1}`), datasets: [{
                    label: 'Duración por vuelta',
                    data: lapTimes,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    fill: true,
                    tension: 0.3
                }]
            }}
            options={{
                responsive: true, plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                return `⏱ ${formatSeconds(ctx.parsed.y)}`;
                            }
                        }
                    }
                }, scales: {
                    y: {
                        ticks: {
                            callback: function (value: number) {
                                return formatSeconds(value);
                            }
                        }, title: {
                            display: true, text: 'Tiempo (mm:ss.xxx)'
                        }
                    }
                }
            }}
        />
    </div>);
}
