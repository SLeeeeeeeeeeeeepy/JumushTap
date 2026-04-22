import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const nextUrl = searchParams.get('next') || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) {
      toast('С возвращением, ' + res.user.name, 'success');
      navigate(nextUrl);
    } else {
      toast(res.msg, 'error');
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="mobile-close-btn">
        <i className="ph ph-x"></i>
      </Link>
      
      <div className="auth-container">
        <div className="auth-left">
          <Link to="/" className="auth-left__logo" style={{ textDecoration: 'none' }}>
            <span className="logo-jumush">Jumush</span><span className="logo-tap">Tap</span>
          </Link>
          <div className="auth-left__content" style={{ marginTop: '40px' }}>
            <h2>С возвращением!</h2>
            <p>Войдите в свой аккаунт, чтобы продолжить поиск подработки или найти идеального кандидата.</p>
          </div>
          <div className="auth-left__perks">
            <div className="perk">
              <i className="ph ph-briefcase" style={{ fontSize: '1.2rem', color: '#F48227' }}></i>
              Быстрый отклик на вакансии
            </div>
            <div className="perk">
              <i className="ph ph-chat-circle-text" style={{ fontSize: '1.2rem', color: '#F48227' }}></i>
              Прямая связь с работодателем
            </div>
            <div className="perk">
              <i className="ph ph-shield-check" style={{ fontSize: '1.2rem', color: '#F48227' }}></i>
              Проверенные компании
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h1>Вход в аккаунт</h1>
          <p className="subtitle">Рады видеть вас снова</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <i className="ph ph-envelope"></i>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="example@mail.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Пароль</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <i className="ph ph-lock-key"></i>
                <input 
                  type="password"
                  className="form-input" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required 
                />
                <button type="button" className="pw-toggle">
                  <i className="ph ph-eye-slash"></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn--primary btn--block btn--lg">
              Войти <i className="ph ph-arrow-right" style={{verticalAlign:'middle'}}></i>
            </button>
          </form>

          <div className="auth-footer">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
