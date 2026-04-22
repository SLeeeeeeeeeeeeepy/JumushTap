import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/images/logo.png" alt="Jumush Tap" className="custom-logo" />
        </Link>
        <nav className={`navbar__links ${isOpen ? 'open' : ''}`} id="navLinks">
          {location.pathname === '/' ? (
            <>
              <a href="#how" className="nav-link">Как работает</a>
              <a href="#categories" className="nav-link">Категории</a>
              <a href="#testimonials" className="nav-link">Отзывы</a>
            </>
          ) : (
            <Link to="/" className="nav-link">Главная</Link>
          )}
          
          {user ? (
            <>
              <Link to="/jobs" className="btn btn--outline btn--sm">Вакансии</Link>
              <Link to="/profile" className="btn btn--primary btn--sm">Профиль</Link>
              <button onClick={logout} className="btn btn--outline btn--sm" style={{borderColor: '#ef4444', color: '#ef4444'}}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--outline btn--sm">Войти</Link>
              <Link to="/register" className="btn btn--primary btn--sm">Регистрация</Link>
            </>
          )}
        </nav>
        <button 
          className={`burger ${isOpen ? 'active' : ''}`} 
          id="burger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
