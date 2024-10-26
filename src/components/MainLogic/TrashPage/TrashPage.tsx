import React, { useState } from 'react';
import FileCard from '../../modules/FileCard/FileCard';
import "./TrashPage.css"

interface File {
    id: number;
    name: string;
    extension: string;
    path: string;
}

const TrashPage: React.FC = () => {
    const [files, setFiles] = useState<File[]>([
        { id: 1, name: "example1.csv", extension: ".csv", path: "uploads/example1.csv" },
        { id: 2, name: "example2.pdf", extension: ".pdf", path: "uploads/example2.pdf" },
        { id: 3, name: "example3.txt", extension: ".txt", path: "uploads/example3.txt" },
    ]);

    const handleDelete = (fileId: number) => {
        // Удаляем файл из состояния
        setFiles(files.filter(file => file.id !== fileId));
        console.log(`Файл с ID ${fileId} удален`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Удаленные файлы</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {files.map(file => (
                    <FileCard
                        key={file.id}
                        fileName={file.name}
                        fileExtension={file.extension}
                        filePath={file.path}
                        onDelete={() => handleDelete(file.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrashPage;
