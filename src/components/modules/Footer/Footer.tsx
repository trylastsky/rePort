import React from 'react';
import './Footer.css'; 
import t1logo from "../../../assets/t1logo.png";
import logo from "../../../assets/logo.png"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logo} alt="Логотип" />
                    <img src={t1logo} alt="Спонсор 1" />
                </div>
                <nav className="footer-nav">
                    <ul>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/constructor">Конструктор</a></li>
                        <li><a href="/about">О нас</a></li>
                        <li><a href="/privacy-terms">Политика конфиденциальности</a></li>
                        <li><a href="/contact">Контакты</a></li>
                    </ul>
                </nav>
            </div>
            <div className="scroll-to-top">
                <a href="#top" className="scroll-button">⟰</a> {/* Изменили символ на стрелку влево */}
            </div>
            <div className="license">
                <p>&copy;  2024 rePort</p>
            </div>
        </footer>
    );
};

export default Footer;
