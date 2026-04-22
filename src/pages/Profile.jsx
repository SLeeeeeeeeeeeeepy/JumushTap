import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/Toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('apps'); // 'apps', 'saved', 'settings'

  const mockApps = [
    { id: 1, title: 'Курьер на велосипеде', company: 'Glovo', status: 'pending', date: '22.04.2026', logo: '🚲' },
    { id: 2, title: 'Промоутер', company: 'Event Pro', status: 'accepted', date: '20.04.2026', logo: '📢' },
    { id: 3, title: 'Официант', company: 'Cafe Central', status: 'rejected', date: '18.04.2026', logo: '☕' },
  ];

  const mockSaved = [
    { id: 4, title: 'SMM-менеджер', company: 'Digital Studio', salary: '800 с/ч', logo: '📱' },
    { id: 5, title: 'Фотограф', company: 'Joy Events', salary: '1200 с/ч', logo: '📸' },
  ];

  const handleLogout = () => {
    logout();
    toast('Вы вышли из системы');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-layout container">
        
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-card__avatar">
              {user?.avatar ? <img src={user.avatar} alt="Avatar" /> : <span>{user?.name?.[0] || 'U'}</span>}
            </div>
            <h2 className="profile-card__name">{user?.name}</h2>
            <div className="profile-card__rating">
              <div className="stars">
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star-half"></i>
              </div>
              <span className="rating-value">4.8</span>
              <span className="rating-count">(12 отзывов)</span>
            </div>
            <p className="profile-card__role">{user?.role === 'employer' ? 'Работодатель' : 'Соискатель'}</p>
            <div className="profile-card__stats">
              <div className="stat"><span>Откликов</span><strong>{mockApps.length}</strong></div>
              <div className="stat"><span>Сохранено</span><strong>{mockSaved.length}</strong></div>
            </div>
            <button className="btn btn--outline btn--block btn--sm" onClick={handleLogout} style={{ marginTop: '1.5rem' }}>
              Выйти <i className="ph ph-sign-out"></i>
            </button>
          </div>
          
          <nav className="profile-nav">
            <button className={`profile-nav__item ${activeTab === 'apps' ? 'active' : ''}`} onClick={() => setActiveTab('apps')}>
              <i className="ph ph-paper-plane-tilt"></i> Мои отклики
            </button>
            <button className={`profile-nav__item ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
              <i className="ph ph-bookmark"></i> Сохранённые
            </button>
            <button className={`profile-nav__item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
              <i className="ph ph-gear"></i> Настройки
            </button>
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="profile-content">
          {activeTab === 'apps' && (
            <div className="profile-section">
              <div className="profile-section__header">
                <h3>Мои отклики</h3>
              </div>
              <div className="responses-list">
                {mockApps.map(app => (
                  <div key={app.id} className="response-item">
                    <div className="response-item__logo">{app.logo}</div>
                    <div className="response-item__info">
                      <div className="response-item__title">{app.title}</div>
                      <div className="response-item__company">{app.company} • {app.date}</div>
                    </div>
                    <div className={`response-status response-status--${app.status}`}>
                      {app.status === 'pending' ? 'В ожидании' : app.status === 'accepted' ? 'Принято' : 'Отказ'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="profile-section">
              <div className="profile-section__header">
                <h3>Сохранённые вакансии</h3>
              </div>
              <div className="responses-list">
                {mockSaved.map(job => (
                  <div key={job.id} className="response-item" style={{ cursor: 'pointer' }} onClick={() => navigate(`/jobs/${job.id}`)}>
                    <div className="response-item__logo">{job.logo}</div>
                    <div className="response-item__info">
                      <div className="response-item__title">{job.title}</div>
                      <div className="response-item__company">{job.company} • {job.salary}</div>
                    </div>
                    <i className="ph ph-caret-right" style={{ color: '#cbd5e1' }}></i>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="profile-section">
              <div className="profile-section__header">
                <h3>Настройки профиля</h3>
              </div>
              <div className="settings-form">
                <div className="form-group">
                  <label className="form-label">Имя</label>
                  <input type="text" className="form-input" defaultValue={user?.name} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" defaultValue={user?.email} />
                </div>
                <div className="form-group">
                  <label className="form-label">Телефон</label>
                  <input type="tel" className="form-input" placeholder="+996 (___) __-__-__" />
                </div>
                <button className="btn btn--primary" onClick={() => toast('Настройки сохранены', 'success')}>Сохранить изменения</button>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
