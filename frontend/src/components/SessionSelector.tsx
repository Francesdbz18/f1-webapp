import React, {useEffect, useState} from 'react';
import axios from 'axios';

type Session = {
    session_key: number; label: string; date: string;
};

type Props = {
    year: number; onChange: (sessionKey: number) => void;
};

export default function SessionSelector({year, onChange}: Readonly<Props>) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sessions?year=${year}`)
            .then(res => {
                const sorted = res.data.sort((a: Session, b: Session) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setSessions(sorted);
                if (sorted.length > 0) {
                    onChange(sorted[0].session_key);
                }
            })
            .finally(() => setLoading(false));
    }, [year]);

    if (loading) return <p className="text-center text-gray-600">Cargando sesiones...</p>;

    return (<div className="mb-6 text-center">
        <select
            onChange={(e) => onChange(Number(e.target.value))}
            className="px-4 py-2 border rounded bg-white"
        >
            {sessions.map(s => (<option key={s.session_key} value={s.session_key}>
                {s.label} ({s.date})
            </option>))}
        </select>
    </div>);
}
