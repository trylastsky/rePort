import React, { useEffect, useRef, useState } from 'react';
import DataTable from './DataTable/DataTable';
import FileUploader from '../FileUploader/FileUploader';
import Papa from "papaparse";
import './ReportConstructor.css';

interface FileItem {
    name: string;
    data: string;
}

const ReportConstructor: React.FC = () => {
    const [rawData, setRawData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [showExportSelector, setShowExportSelector] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ссылка на canvas

    const loadFiles = () => {
        const reader = new FileReader();
        const storedFiles: FileItem[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('file-')) {
                storedFiles.push({
                    name: key.substring(5),
                    data: localStorage.getItem(key) || ''
                });
            }
        }
        setFilteredData(storedFiles);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            console.log(file)
            const reader = new FileReader();
            //переделать
            reader.onload = () => {
                // Получаем текущее количество файлов
                let userFilesAmount = localStorage.getItem("user_files_amount");

                console.log("Текущее количество файлов в localStorage:", userFilesAmount);

                // Если это первое сохранение или значение отсутствует, инициализируем счетчик
                if (userFilesAmount === null) {
                    userFilesAmount = "0";
                }

                // Преобразуем строку в число
                const amountAsNumber = parseInt(userFilesAmount);
                if (isNaN(amountAsNumber)) {
                    console.error("Ошибка при преобразовании количества файлов в число:", userFilesAmount);
                    return; // Выход из функции, если возникла ошибка
                }

                // Увеличиваем количество файлов
                const newAmount = amountAsNumber + 1;

                // Сохраняем новое количество
                localStorage.setItem("user_files_amount", newAmount.toString());
                
                // Сохраняем файл
                localStorage.setItem(`file-${file.name}`, reader.result as string);

                console.log(`Saved: file-${file.name}`); 
                console.log("Общее число файлов: " + newAmount);
            };

            reader.readAsText(file);
        }   
    };


     useEffect(() => {
        loadFiles();
    }, []);

    return (
        <div className="report-constructor">
            <div className="upload-section">
                <p>Загрузить в .json</p>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                />

<p>Загрузить в .csv</p>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                />
            </div>
            

            <div className="export-section">
                <button onClick={() => setShowExportSelector(true)}>Экспортировать</button>
            </div>
            <DataTable data={filteredData.length > 0 ? filteredData : filteredData} />
                   </div>
    );
};

export default ReportConstructor;
