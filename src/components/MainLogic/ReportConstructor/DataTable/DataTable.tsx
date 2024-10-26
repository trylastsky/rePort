import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './DataTable.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
    const [tableData, setTableData] = useState(data);
    const [charts, setCharts] = useState<{ type: 'bar' | 'doughnut'; column: string; width: number; height: number; theme: string }[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [chartType, setChartType] = useState<'bar' | 'doughnut'>('bar');
    const [chartWidth, setChartWidth] = useState<number>(400);
    const [chartHeight, setChartHeight] = useState<number>(300);
    const [chartTheme, setChartTheme] = useState<string>('light');

    // Загрузка сохраненных графиков из localStorage
    useEffect(() => {
        const savedCharts = localStorage.getItem('charts');
        if (savedCharts) {
            setCharts(JSON.parse(savedCharts));
            console.log(savedCharts)
        }
    }, []);

    // Сохранение графиков в localStorage при каждом обновлении
    useEffect(() => {
        localStorage.setItem('charts', JSON.stringify(charts));
    }, [charts.length]);

    const handleDelete = (index: number) => {
        const newCharts = charts.filter((_, i) => i !== index);
        setCharts(newCharts);
    };

    const handleAddChart = () => {
        if (charts.length >= 2) {
            alert('Можно добавить до 2 диаграмм');
            return;
        }
        if (selectedColumn === '') {
            alert('Пожалуйста, выберите столбец для диаграммы');
            return;
        }

        const newChart = { type: chartType, column: selectedColumn, width: chartWidth, height: chartHeight, theme: chartTheme };
        setCharts([...charts, newChart]);
        setSelectedColumn('');
    };

    const columns = React.useMemo(() => {
        const columnKeys = data[0] ? Object.keys(data[0]) : [];
        return [
            ...columnKeys.map((key) => ({
                Header: key,
                accessor: key,
            })),
            {
                Header: 'Действия',
                Cell: ({ row }: any) => (
                    <button className="delete-button" onClick={() => handleDelete(row.index)}>Удалить</button>
                ),
            },
        ];
    }, [tableData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData });

    const getChartData = (selectedColumn: string) => ({
        labels: tableData.map(item => item.name),
        datasets: [{
            label: 'Значения',
            data: tableData.map(item => (item[selectedColumn] !== undefined ? item[selectedColumn] : 0)),
            backgroundColor: chartType === 'doughnut'
                ? ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
                : ['rgba(75,192,192,1)', 'rgba(153,102,255,1)'],
        }],
    });

    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn(event.target.value);
    };

    const validateInput = (value: number, type: string) => {
        return value >= 0 && /^\d+$/.test(value.toString());
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (validateInput(value, 'width')) {
            setChartWidth(value);
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (validateInput(value, 'height')) {
            setChartHeight(value);
        }
    };

    return (
        <div className="data-table">
            <button className="add-chart-button" onClick={handleAddChart}>Добавить диаграмму</button>

            <div className="chart-options">
                <div>
                    <label htmlFor="column-select">Выберите столбец для диаграммы:</label>
                    <select id="column-select" value={selectedColumn} onChange={handleColumnChange}>
                        <option value="">--Выберите столбец--</option>
                        {columns.map(column => (
                            <option key={column.accessor} value={column.accessor}>
                                {column.Header}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="bar"
                            checked={chartType === 'bar'}
                            onChange={() => setChartType('bar')}
                        /> Столбчатая
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="doughnut"
                            checked={chartType === 'doughnut'}
                            onChange={() => setChartType('doughnut')}
                        /> Круговая
                    </label>
                </div>
                <div>
                    <label htmlFor="width">Ширина диаграммы:</label>
                    <input
                        type="number"
                        id="width"
                        value={chartWidth}
                        onChange={handleWidthChange}
                        min={100}
                        max={800}
                    />
                </div>
                <div>
                    <label htmlFor="height">Высота диаграммы:</label>
                    <input
                        type="number"
                        id="height"
                        value={chartHeight}
                        onChange={handleHeightChange}
                        min={100}
                        max={600}
                    />
                </div>
                <div>
                    <label htmlFor="theme-select">Выберите тему:</label>
                    <select id="theme-select" value={chartTheme} onChange={(e) => setChartTheme(e.target.value)}>
                        <option value="light">Светлая</option>
                        <option value="dark">Темная</option>
                    </select>
                </div>
            </div>

            <div className="chart-container">
                {charts.map((chart, index) => (
                    <div key={index} className="chart-wrapper" style={{ width: chart.width, height: chart.height }}>
                        {chart.type === 'bar' ? (
                            <Bar
                                data={getChartData(chart.column)}

                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Категории',
                                            },
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: 'Значения',
                                            },
                                            beginAtZero: true,
                                            min: 1,
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <Doughnut
                                data={getChartData(chart.column)}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        )}
                        <button className="delete-chart-button" onClick={() => handleDelete(index)}>
                            Удалить диаграмму
                        </button>
                    </div>
                ))}
            </div>

            <table className="styled-table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} key={column.id}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} key={cell.row.id + "-" + cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

