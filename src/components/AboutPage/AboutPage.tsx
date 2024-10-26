import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="intro">
        <h1 className='red'>О компании rePort</h1>
        <p className='white'>
          Мы в rePort стремимся сделать процесс создания отчетов простым и удобным для всех. 
          Наш онлайн-конструктор позволяет вам создавать профессиональные отчеты за считанные минуты, 
          не тратя время на сложные шаблоны и форматы.
        </p>
      </section>

      <section className="advantages">
        <h2 className='red'>Наши преимущества</h2>
        <ul>
          <li className='white'>💡 Легкость в использовании: Just drag and drop!</li>
          <li className='white'>🌍 Доступность: Создавайте отчеты в любом месте и в любое время.</li>
          <li className='white'>📊 Множество интеграций: Подключайте свои данные из различных источников.</li>
          <li className='white'>🔒 Безопасность: Мы заботимся о ваших данных и соблюдаем все нормы конфиденциальности.</li>
        </ul>
      </section>

      <section className="privacy-policy">
        <h2 className='red'>Политика конфиденциальности</h2>
        <p className='white'>В rePort мы уважаем вашу конфиденциальность и обязуемся защищать вашу личную информацию. 
        Наша политика конфиденциальности включает следующие моменты:</p>
        <ul>
          <li className='white'>Мы не передаем ваши данные третьим лицам без вашего согласия.</li>
          <li className='white'>Ваши данные шифруются и хранятся в безопасной среде.</li>
          <li className='white'>Вы можете в любой момент запросить удаление ваших данных из нашей базы.</li>
        </ul>
        <p className='white'>Для получения более детальной информации, пожалуйста, ознакомьтесь с нашей <a href="/privacy-terms">Политикой конфиденциальности</a>.</p>
      </section>

      <section className="contact">
        <h2 className='red'>Контакты</h2>
        <p className='white'>
          Если у вас есть вопросы или вам нужна помощь, вы можете связаться с нашей службой поддержки по адресу 
          <a href="mailto:support@report.com"> support@report.com</a>.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
