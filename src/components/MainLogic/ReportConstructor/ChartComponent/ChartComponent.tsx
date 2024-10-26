// src/components/ChartComponent.tsx

import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

interface ChartComponentProps {
    data: any[];
}

// Регистрация необходимых компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
    const [chartType, setChartType] = useState<'Bar' | 'Doughnut'>('Bar');

    const chartData = {
        labels: data.map((item) => item.name), // Заполняем метками по вашим данным
        datasets: [
            {
                label: 'Значения',
                data: data.map((item) => item.value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChartType(e.target.value as 'Bar' | 'Doughnut');
    };

    return (
        <div>
            <h2>Диаграмма</h2>
            <select onChange={handleChartTypeChange}>
                <option value="Bar">Столбчатая</option>
                <option value="Doughnut">Круговая</option>
            </select>
            {chartType === 'Bar' && <Bar data={chartData} />}
            {chartType === 'Doughnut' && <Doughnut data={chartData} />}
        </div>
    );
};

export default ChartComponent;
