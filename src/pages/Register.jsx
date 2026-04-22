import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/Toast';

export default function Register() {
  const [formData, setFormData] = useState({
    role: 'worker',
    name: '',
    email: '',
    password: '',
    city: 'Бишкек'
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register(formData);
    if (res.ok) {
      toast('Регистрация успешна! Добро пожаловать.', 'success');
      navigate('/profile');
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
            <h2>Начни зарабатывать уже сегодня</h2>
            <p>Присоединяйся к тысячам пользователей, которые ежедневно находят подработку и исполнителей.</p>
          </div>
          <div className="auth-left__perks">
            <div className="perk">
              <i className="ph ph-rocket-launch" style={{ fontSize: '1.2rem', color: '#F48227' }}></i>
              Быстрый старт
            </div>
            <div className="perk">
              <i className="ph ph-wallet" style={{ fontSize: '1.2rem', color: '#F48227' }}></i>
              Гарантия выплат
            </div>
            <div className="perk">
              <i className="ph ph-star" style={{ fontSize: '1.2rem', color: '#F48227' }}></i>
              Система рейтингов
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h1>Создать аккаунт</h1>
          <p className="subtitle">Выберите роль и заполните данные</p>

          <div className="role-selector">
            <div 
              className={`role-card ${formData.role === 'worker' ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, role: 'worker'})}
            >
              <div className="role-card__icon">💼</div>
              <div className="role-card__title">Я ищу работу</div>
              <div className="role-card__desc">Найти подработку рядом</div>
            </div>
            <div 
              className={`role-card ${formData.role === 'employer' ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, role: 'employer'})}
            >
              <div className="role-card__icon">🏢</div>
              <div className="role-card__title">Я работодатель</div>
              <div className="role-card__desc">Найти сотрудников</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">{formData.role === 'employer' ? 'Название компании' : 'Имя и фамилия'}</label>
              <div className="input-wrapper">
                <i className="ph ph-user"></i>
                <input 
                  type="text" 
                  name="name"
                  className="form-input" 
                  placeholder={formData.role === 'employer' ? "ООО Ромашка" : "Иван Иванов"}
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <i className="ph ph-envelope"></i>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="example@mail.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Пароль</label>
                <div className="input-wrapper" style={{ position: 'relative' }}>
                  <i className="ph ph-lock-key"></i>
                  <input 
                    type="password"
                    name="password"
                    className="form-input" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    minLength="6"
                  />
                  <button type="button" className="pw-toggle">
                    <i className="ph ph-eye-slash"></i>
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Город</label>
                <div className="input-wrapper">
                  <i className="ph ph-map-pin"></i>
                  <select name="city" className="form-input" value={formData.city} onChange={handleChange}>
                    <option value="Бишкек">Бишкек</option>
                    <option value="Ош">Ош</option>
                    <option value="Кант">Кант</option>
                    <option value="Токмок">Токмок</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button type="submit" className="btn btn--primary btn--block btn--lg" style={{ marginTop: '16px' }}>
              Создать аккаунт <i className="ph ph-check" style={{verticalAlign:'middle'}}></i>
            </button>
          </form>

          <div className="auth-footer">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
