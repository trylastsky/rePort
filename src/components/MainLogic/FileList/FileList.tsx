import React, { useEffect, useState } from 'react';
import FileUploader from '../FileUploader/FileUploader';
import './FileList.css';

interface FileItem {
    name: string;
    data: string;
}

const FileList: React.FC = () => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentFileData, setCurrentFileData] = useState<any[][] | null>(null);
    const [currentFileName, setCurrentFileName] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const loadFiles = () => {
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
        setFiles(storedFiles);
    };


    useEffect(() => {
        loadFiles();
    }, []);

    
    const handleDelete = (name: string) => {
        localStorage.removeItem(`file-${name}`);
        loadFiles();
    };

    const handleDownload = (name: string) => {
        const data = localStorage.getItem(`file-${name}`);
        const blob = new Blob([data || ''], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const openModal = (data: string, name: string) => {
        const parsedData = parseCSV(data);
        setCurrentFileData(parsedData);
        setCurrentFileName(name);
        setIsEditing(false);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentFileData(null);
        setCurrentFileName(null);
        setIsEditing(false);
    };

    const parseCSV = (data: string): any[][] => {
        const rows = data.split('\n').map(row => row.split(','));
        return rows.map(row => row.map(cell => cell.trim()));
    };

    const saveFile = () => {
        if (currentFileData && currentFileName) {
            const csvContent = currentFileData.map(row => row.join(',')).join('\n');
            localStorage.setItem(`file-${currentFileName}`, csvContent);
            alert('Файл успешно сохранен!');
            loadFiles(); 

            closeModal();
        }
    };

    return (
        <div>
            <FileUploader></FileUploader>
            <h3>Список загруженных CSV файлов</h3>
            {files.length > 0 ? (
                <ul>
                    {files.map(file => (
                        <li key={file.name}>
                            <strong>{file.name}</strong>
                            <button onClick={() => handleDownload(file.name)}>Скачать</button>
                            <button onClick={() => openModal(file.data, file.name)}>Просмотреть</button>
                            <button onClick={() => handleDelete(file.name)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет загруженных файлов.</p>
            )}

            {/* Модальное окно для просмотра и редактирования файла */}
            {isModalOpen && currentFileData && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>{isEditing ? 'Редактирование' : 'Просмотр'} файла: {currentFileName}</h4>
                        <Table data={currentFileData} setData={setCurrentFileData} isEditing={isEditing} />
                        <button onClick={() => {
                            if (isEditing) {
                                saveFile();
                            } else {
                                setIsEditing(true);
                            }
                        }}>
                            {isEditing ? 'Сохранить изменения' : 'Редактировать'}
                        </button>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Table: React.FC<{ data: any[][]; setData: React.Dispatch<React.SetStateAction<any[][]>>; isEditing: boolean }> = ({ data, setData, isEditing }) => {
    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        const newData = data.map((row, idx) => 
            idx === rowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell)) : row
        );
        setData(newData);
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    {data[0].map((header: string, index: number) => (
                        <th key={index}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={header}
                                    onChange={(e) => handleCellChange(0, index, e.target.value)}
                                    style={{ width: '100%', border: 'none' }}
                                />
                            ) : (
                                header
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.slice(1).map((row: any[], rowIndex: number) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => handleCellChange(rowIndex + 1, cellIndex, e.target.value)}
                                    />
                                ) : (
                                    cell

                                )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    
    export default FileList;
    