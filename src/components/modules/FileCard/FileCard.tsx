import React from 'react';
import "./FileCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface FileCardProps {
    fileName: string;
    fileExtension: string;
    filePath: string;
    onDelete: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ fileName, fileExtension, filePath, onDelete }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        link.click();
    };

    const handlePreview = () => {
        window.open(filePath, '_blank');
    };

    return (
        <div className="file-card">
            <div className="file-image">
                <span className="file-extension">{fileExtension}</span>
            </div>
            <div className="file-info">
                <h4>{fileName}</h4>
                <div className="file-buttons">
                    <button onClick={handleDownload} title="Скачать">
                        <FontAwesomeIcon icon={faDownload} />
                    </button>
                    <button onClick={handlePreview} title="Просмотреть">
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button onClick={onDelete} title="Удалить">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileCard;
