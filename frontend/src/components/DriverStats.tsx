import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip,} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

type Props = {
    driverNumber: string; sessionKey: number;
};

export default function DriverStats({driverNumber, sessionKey}: Readonly<Props>) {
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [average, setAverage] = useState<number | null>(null);
    const [bestLap, setBestLap] = useState<number | null>(null);
    const [dnf] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/laps`, {
                params: {driver_number: driverNumber, session_key: sessionKey},
            })
            .then((res) => {
                const data = res.data;

                const durations = data
                    .map((lap: any) => lap.lap_duration)
                    .filter((t: number) => t > 0);

                setLapTimes(durations);
                setAverage(durations.length ? durations.reduce((a: any, b: any) => a + b, 0) / durations.length : null);
                setBestLap(durations.length ? Math.min(...durations) : null);
            });
    }, [driverNumber, sessionKey]);

    if (lapTimes.length === 0) {
        return (<p className="text-center italic text-sm text-gray-600 mt-4">
            No hay datos de vueltas disponibles.
        </p>);
    }

    const formatSeconds = (secs: number): string => {
        const minutes = Math.floor(secs / 60);
        const seconds = (secs % 60).toFixed(3).padStart(6, '0');
        return `${minutes}:${seconds}`;
    };

    return (<div className="mt-6 bg-white p-6 rounded shadow text-black">
        <h3 className="text-center font-semibold text-xl mb-4">Estadísticas de Vueltas</h3>

        <div className="grid md:grid-cols-3 gap-4 text-center text-sm mb-4">
            <p><strong>Vueltas completadas:</strong> {lapTimes.length}</p>
            <p><strong>Promedio:</strong> {average !== null ? formatSeconds(average) : '-'}</p>
            <p><strong>Mejor vuelta:</strong> {bestLap !== null ? formatSeconds(bestLap) : '-'}</p>
        </div>

        {dnf && (<p className="text-center text-red-600 font-semibold mb-2">
            ⚠️ Este piloto no finalizó la carrera (DNF)
        </p>)}

        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px]">
            <Line
                data={{
                    labels: lapTimes.map((_, i) => `Vuelta ${i + 1}`), datasets: [{
                        label: 'Duración por vuelta',
                        data: lapTimes,
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: lapTimes.map(t => t === bestLap ? 6 : 3),
                        pointBackgroundColor: lapTimes.map(t => t === bestLap ? 'green' : 'red'),
                    }],
                }}
                options={{
                    responsive: true, maintainAspectRatio: false, // CLAVE para que la altura se respete
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (ctx) {
                                    return `⏱ ${formatSeconds(ctx.parsed.y)}`;
                                },
                            },
                        },
                    }, scales: {
                        y: {
                            ticks: {
                                callback: function (value: string | number) {
                                    const num = typeof value === 'number' ? value : parseFloat(value);
                                    return isNaN(num) ? '' : formatSeconds(num);
                                },
                            }, title: {
                                display: false, text: 'Tiempo (mm:ss.xxx)',
                            },
                        },
                    },
                }}
            />
        </div>

    </div>);
}
