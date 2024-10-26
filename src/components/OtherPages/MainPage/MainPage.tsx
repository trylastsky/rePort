import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage: React.FC = () => {


  return (
    <div className="main-page">
      <header className="main-header">
        <h1 className='white'>Добро пожаловать в rePort</h1>
        <p className='white'>Конструктор отчетов для вашего бизнеса.</p>
      </header>
      <section className="about-section">
        <h2 className='white'>О нас</h2>
        <p className='white'>
          rePort — это интуитивно понятный инструмент, созданный для упрощения процесса создания отчетов.
          Наша миссия — дать возможность каждому пользователю легко и быстро генерировать профессиональные отчеты
          без необходимости в глубоких технических знаниях.
        </p>
        <p className='white'>
          История началась с идеи улучшить методы отчетности. Команда экспертов долго работала над функционалом,
          который бы соответствовал требованиям современных пользователей. Мы постоянно собираем отзывы,
          чтобы улучшать сервис и предлагать новые функции.
        </p>
      </section>
      <Link to={"/constructor"}>
      <button className="open-constructor">
        Открыть конструктор
      </button>
      </Link>
    </div>
  );
};

export default MainPage;
