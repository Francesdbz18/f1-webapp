import React from 'react';

type Props = {
    selectedYear: number;
    onChange: (year: number) => void;
};

export default function YearSelector({ selectedYear, onChange }: Props) {
    const years = [2024, 2023, 2022]; // Puedes añadir más si quieres

    return (
        <div className="text-center mb-4">
            <select
                value={selectedYear}
                onChange={(e) => onChange(Number(e.target.value))}
                className="px-4 py-2 border rounded bg-white"
            >
                {years.map(y => (
                    <option key={y} value={y}>
                        Temporada {y}
                    </option>
                ))}
            </select>
        </div>
    );
}
