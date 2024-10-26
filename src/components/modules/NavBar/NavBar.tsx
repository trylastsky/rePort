import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faClipboardList, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 

const Navbar: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
            <li className="navbar-item">
                    <Link 
                        className={`navlink decoration_none transition0_3 ${location.pathname === '/constructor' ? 'active' : ''}`} 
                        to="/constructor"
                    >
                        <FontAwesomeIcon icon={faAtom} className="navbar-icon" />
                        <span className="navbar-text">Конструктор</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link 
                        className={`navlink decoration_none transition0_3 ${location.pathname === '/constructor-projects' ? 'active' : ''}`} 
                        to="/constructor-projects"
                    >
                        <FontAwesomeIcon icon={faClipboardList} className="navbar-icon" />
                        <span className="navbar-text">Проекты</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link 
                        className={`navlink decoration_none transition0_3 ${location.pathname === '/constructor-file_list' ? 'active' : ''}`} 
                        to="/constructor-file_list"
                    >
                        <FontAwesomeIcon icon={faFileAlt} className="navbar-icon" />
                        <span className="navbar-text">Мои файлы</span>
                    </Link>
                </li>
                <li className="navbar-item" id='trash'>
                    <Link 
                        className={`navlink decoration_none transition0_3 ${location.pathname === '/constructor-trash' ? 'active' : ''}`} 
                        to="/constructor-trash"
                    >
                        <FontAwesomeIcon icon={faTrash} className="navbar-icon" />
                        <span className="navbar-text">Корзина</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
