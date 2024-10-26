import React, { useRef, useState } from 'react';
import DataTable from './DataTable/DataTable';
import Papa from "papaparse";
import './ReportConstructor.css';

const testData = [
    { id: 1, name: 'Category A', value: 35, description: 'Description for Category A' },
    { id: 2, name: 'Category B', value: 20, description: 'Description for Category B' },
    { id: 3, name: 'Category C', value: 50, description: 'Description for Category C' },
    { id: 4, name: 'Category D', value: 15, description: 'Description for Category D' },
];

const ReportConstructor: React.FC = () => {
    const [rawData, setRawData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [showExportSelector, setShowExportSelector] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ссылка на canvas

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
            Papa.parse(file, {
                complete: (results: any) => {
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
                <p>Загрузить в .json</p>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleUploadJson}
                />

<p>Загрузить в .csv</p>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleUploadCsv}
                />
            </div>

            <div className="export-section">
                <button onClick={() => setShowExportSelector(true)}>Экспортировать</button>
            </div>
            <DataTable data={filteredData.length > 0 ? filteredData : testData} />
        </div>
    );
};

export default ReportConstructor;
