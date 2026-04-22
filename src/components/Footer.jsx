import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__links">
          <div className="footer__col">
            <h4>Соискателям</h4>
            <Link to="/jobs">Вакансии</Link>
            <a href="#">Как найти работу</a>
            <a href="#">Советы</a>
          </div>
          <div className="footer__col">
            <h4>Работодателям</h4>
            <a href="#">Поддержка</a>
            <a href="#">Разместить вакансию</a>
            <a href="#">Тарифы</a>
          </div>
          <div className="footer__col">
            <h4>Компания</h4>
            <a href="#">Контакты</a>
            <a href="#">О нас</a>
            <a href="#">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 Jumush Tap. Все права защищены.</p>
      </div>
    </footer>
  );
}
