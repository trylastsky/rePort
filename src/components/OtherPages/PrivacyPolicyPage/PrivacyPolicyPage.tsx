import React from 'react';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="privacy-policy-page">
      <header>
        <h1>Политика конфиденциальности</h1>
        <p>Дата последнего обновления: 26.10.2024</p>
      </header>

      <section className="intro">
        <p>
          Добро пожаловать в политику конфиденциальности rePort. Мы ценим вашу конфиденциальность и стремимся защищать ваши личные данные. Эта политика описывает, как мы собираем, используем, обрабатываем и раскрываем информацию о вас.
        </p>
      </section>

      <section className="data-collection">
        <h2>Сбор данных</h2>
        <p>Мы можем собирать следующие типы данных:</p>
        <ul>
          <li>Личную информацию: имя, адрес электронной почты, номер телефона и другие данные, которые вы предоставляете при регистрации.</li>
          <li>Данные о ваших действиях на сайте: информация о том, как вы используете наш сайт и сервисы.</li>
        </ul>
        <p>Мы собираем данные следующими способами:</p>
        <ul>
          <li>Во время регистрации вашего аккаунта.</li>
          <li>Когда вы заполняете формы на нашем сайте.</li>
          <li>Через использование cookies и аналогичных технологий.</li>
        </ul>
      </section>

      <section className="data-usage">
        <h2>Использование данных</h2>
        <p>Собранные данные могут использоваться для следующих целей:</p>
        <ul>
          <li>Для предоставления и поддержки нашей услуги.</li>
          <li>Для оповещения о изменениях в нашей услуге.</li>
          <li>Для предоставления поддержки клиентам.</li>
          <li>Для сбора аналитических данных.</li>
          <li>Для отправки новостей, предложений и другой информации, которая может вас заинтересовать.</li>
        </ul>
      </section>

      <section className="data-sharing">
        <h2>Обмен данными</h2>
        <p>Мы не будем передавать ваши личные данные третьим лицам без вашего согласия, за исключением следующих случаев:</p>
        <ul>
          <li>Для соблюдения закона или правовых требований.</li>
          <li>Для защиты прав и безопасности нашей компании и пользователей.</li>
          <li>В случае слияния или продажи бизнеса, если это будет необходимо.</li>
        </ul>
      </section>

      <section className="data-security">
        <h2>Безопасность данных</h2>
        <p>
          Мы принимаем разумные меры для защиты ваших данных от утери, кражи или несанкционированного доступа. Однако ни один метод передачи данных через Интернет или метод хранения данных не является на 100% безопасным.
        </p>
      </section>

      <section className="user-rights">
        <h2>Права пользователей</h2>
        <p>Вы имеете право:</p>
        <ul>
          <li>Запрашивать доступ к своим данным, которые мы храним.</li>
          <li>Запрашивать исправление ваших данных, если они неверны.</li>
          <li>Запрашивать удаление ваших данных, при условии, что это не противоречит закону.</li>
        </ul>
      </section>

      <section className="policy-changes">
        <h2>Изменения в политике</h2>
        <p>

        Мы можем обновлять нашу политику конфиденциальности время от времени. Мы уведомим вас о любых изменениях, разместив новую политику на этой странице.
        </p>
      </section>

      <section className="contact">
        <h2>Контакты</h2>
        <p>
          Если у вас есть вопросы о нашей политике конфиденциальности или о том, как мы обрабатываем ваши данные, пожалуйста, свяжитесь с нами по адресу <a href="mailto:support@report.com">support@report.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
