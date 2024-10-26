// src/components/ReportConstructor.tsx
import React, { useState } from 'react';
import DataTable from './DataTable/DataTable';
import Papa from "papaparse";
import ChartComponent from './ChartComponent/ChartComponent';
import './ReportConstructor.css';

const testData = [
    { id: 1, name: 'Category A', value: 35, description: 'Description for Category A' },
    { id: 2, name: 'Category B', value: 20, description: 'Description for Category B' },
    { id: 3, name: 'Category C', value: 50, description: 'Description for Category C' },
    { id: 4, name: 'Category D', value: 15, description: 'Description for Category D' },
];

const ReportConstructor: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const [rawData, setRawData] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [filteredData, setFilteredData] = useState<any[]>([]);

    const handleUploadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const jsonData = JSON.parse(reader.result as string);
                setRawData(jsonData.data);
                setFilteredData(jsonData.data);
            };
            reader.readAsText(file);
        }
    };

    const handleUploadCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Используем PapaParse для обработки CSV
            Papa.parse(file, {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                complete: (results: { data: React.SetStateAction<any[]>; }) => {
                    setRawData(results.data);
                    setFilteredData(results.data);
                },
                header: true,
            });
        }
    };

    return (
        <div className="report-constructor">
            <div className="upload-section">
            <p>загрузить в .json</p>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleUploadJson}
                  
                />
                <p>загрузить в .csv</p>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleUploadCsv}
                    
                  
                />
            </div>
            {/* //filtredData */}
            <DataTable data={testData} /> 
            <ChartComponent data={testData} />
        </div>
    );
};

export default ReportConstructor;
