import React from 'react';

const FileUploader: React.FC = () => {
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

    return (
        <div>
            <h3>Загрузить CSV файл</h3>
            <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
    );
};

export default FileUploader;
