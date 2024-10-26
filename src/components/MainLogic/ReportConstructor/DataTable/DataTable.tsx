import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Регистрация необходимых элементов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
    const [tableData, setTableData] = useState(data);
    const [chartVisible, setChartVisible] = useState(false);
    const [chartType, setChartType] = useState<'bar' | 'coloredBar'>('bar');
    const [colorType, setColorType] = useState<'colored' | 'gray'>('colored');

    const handleDelete = (index: number) => {
        const newData = tableData.filter((_, i) => i !== index);
        setTableData(newData);
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
                    <button onClick={() => handleDelete(row.index)}>Удалить</button>
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

    // Данные для графика
    const chartData = {
        labels: tableData.map(item => item.name), 
        datasets: [{
            data: tableData.map(item => item.value), 
            backgroundColor: colorType === 'colored'
                ? ['red', 'blue', 'green', 'yellow']
                : ['grey'], // Для серого цвета
        }],
    };

    const handleAddChart = () => {
        setChartVisible(true); // Показываем опции выбора для графика
    };

    return (
        <div className="data-table">
            <button onClick={handleAddChart}>Добавить диаграмму</button>

            {chartVisible && (
                <div>
                    <div>
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
                                value="coloredBar"
                                checked={chartType === 'coloredBar'}
                                onChange={() => setChartType('coloredBar')}
                            /> Столбчатая цветная
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="colored"
                                checked={colorType === 'colored'}
                                onChange={() => setColorType('colored')}
                            /> Цветная
                        </label>
                        <label>
                            <input

type="radio"
value="gray"
checked={colorType === 'gray'}
onChange={() => setColorType('gray')}
/> Серая
</label>
</div>
</div>
)}

<table {...getTableProps()}>
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

{chartVisible && (
<>
{chartType === 'bar' || chartType === 'coloredBar' ? (
<Bar data={chartData} />
) : null}
</>
)}
</div>
);
};

export default DataTable;
