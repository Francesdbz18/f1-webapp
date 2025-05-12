import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Session = {
    session_key: number;
    meeting_name: string;
    session_name: string;
    date_start: string;
};

type Props = {
    year: number;
    onChange: (sessionKey: number) => void;
};

export default function SeasonSelector({ year, onChange }: Props) {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sessions?year=${year}`)
            .then(res => {
                const sorted = res.data.sort((a: Session, b: Session) =>
                    new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
                );
                setSessions(sorted);
                if (sorted[0]) onChange(sorted[0].session_key);
            });
    }, [year]);

    return (
        <div className="mb-6 text-center">
            <select
                className="px-4 py-2 border rounded bg-white"
                onChange={(e) => onChange(Number(e.target.value))}
            >
                {sessions.map(s => (
                    <option key={s.session_key} value={s.session_key}>
                        {s.meeting_name} - {s.session_name}
                    </option>
                ))}
            </select>
        </div>
    );
}
