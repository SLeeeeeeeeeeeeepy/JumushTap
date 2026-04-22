import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goCat = (cat) => {
    if (user) {
      navigate(`/jobs?category=${cat}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__badge"><i className="ph ph-graduation-cap"></i> Для студентов и занятых людей</div>
            <h1 className="hero__title">Найди <span className="gradient-text">подработку</span><br/>за 5 минут</h1>
            <p className="hero__desc">Краткосрочные вакансии без резюме и долгих собеседований. Работай когда хочешь — зарабатывай сколько хочешь.</p>
            <div className="hero__actions">
              {user ? (
                <Link to="/jobs" className="btn btn--primary btn--lg"><i className="ph ph-magnifying-glass" style={{verticalAlign:'middle'}}></i> Найти вакансию</Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn--primary btn--lg"><i className="ph ph-rocket" style={{verticalAlign:'middle'}}></i> Начать бесплатно</Link>
                  <Link to="/login" className="btn btn--outline-white btn--lg">Уже есть аккаунт</Link>
                </>
              )}
            </div>
          </div>
          <div className="hero__visual">
            <div className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="app-header">
                    <div className="app-logo-small"><img src="/images/logo.png" style={{height:'22px', borderRadius:'4px'}} alt="Logo" /></div>
                    <div className="app-notif"><i className="ph-fill ph-bell"></i></div>
                  </div>
                  <div className="app-search"><i className="ph ph-magnifying-glass"></i> Поиск вакансий...</div>
                  <div className="app-tabs">
                    <span className="tab active">Все</span><span className="tab">IT</span><span className="tab">Доставка</span><span className="tab">Промо</span>
                  </div>
                  {/* Mock Cards in Hero */}
                  <div className="app-card">
                    <div className="app-card__top">
                      <div className="company-dot orange"></div>
                      <div><div className="app-card__title">Курьер на велосипеде</div><div className="app-card__company">Glovo Bishkek</div></div>
                      <div className="app-card__salary">800 с/ч</div>
                    </div>
                    <div className="app-card__tags"><span className="tag"><i className="ph-fill ph-map-pin"></i> 2.3 км</span><span className="tag"><i className="ph ph-clock"></i> 4ч</span><span className="tag tag--accent"><i className="ph-fill ph-fire" style={{verticalAlign:'middle'}}></i> Срочно</span></div>
                  </div>
                  <div className="app-card">
                    <div className="app-card__top">
                      <div className="company-dot teal"></div>
                      <div><div className="app-card__title">Промоутер на мероприятие</div><div className="app-card__company">Event Pro KG</div></div>
                      <div className="app-card__salary">1 200 с/ч</div>
                    </div>
                    <div className="app-card__tags"><span className="tag"><i className="ph-fill ph-map-pin"></i> 1.1 км</span><span className="tag"><i className="ph ph-clock"></i> 6ч</span></div>
                  </div>
                  <div className="app-card app-card--featured">
                    <div className="app-card__top">
                      <div className="company-dot orange"></div>
                      <div><div className="app-card__title">Помощник SMM</div><div className="app-card__company">Digital Studio</div></div>
                      <div className="app-card__salary">600 с/ч</div>
                    </div>
                    <div className="app-card__tags"><span className="tag"><i className="ph ph-laptop"></i> Удалённо</span><span className="tag"><i className="ph ph-clock"></i> Гибко</span></div>
                  </div>
                </div>
              </div>
              <div className="phone-glow"></div>
            </div>
          </div>
        </div>
        <div className="hero__wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F4F6F8"/></svg>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Просто и быстро</div>
            <h2 className="section-title">Как это работает?</h2>
            <p className="section-desc">Три шага до первого заработка — без бюрократии и лишних трат времени</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step__icon" style={{background:'linear-gradient(135deg,#F48227,#F35029)'}}>
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="step__num">Шаг 01</div>
              <h3 className="step__title">Создай профиль</h3>
              <p className="step__desc">Регистрация за 2 минуты. Укажи навыки, удобное расписание и ожидаемый доход.</p>
            </div>
            <div className="step__arrow"><svg width="40" height="16" viewBox="0 0 40 16" fill="none"><path d="M0 8H36M36 8L29 1M36 8L29 15" stroke="#F48227" strokeWidth="2" strokeLinecap="round"/></svg></div>
            <div className="step">
              <div className="step__icon" style={{background:'linear-gradient(135deg,#29858D,#1a6b73)'}}>
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </div>
              <div className="step__num">Шаг 02</div>
              <h3 className="step__title">Найди вакансию</h3>
              <p className="step__desc">Фильтруй по категории, зарплате и расстоянию. Все вакансии рядом с тобой.</p>
            </div>
            <div className="step__arrow"><svg width="40" height="16" viewBox="0 0 40 16" fill="none"><path d="M0 8H36M36 8L29 1M36 8L29 15" stroke="#29858D" strokeWidth="2" strokeLinecap="round"/></svg></div>
            <div className="step">
              <div className="step__icon" style={{background:'linear-gradient(135deg,#F35029,#c73d1c)'}}>
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div className="step__num">Шаг 03</div>
              <h3 className="step__title">Зарабатывай</h3>
              <p className="step__desc">Отправь отклик, выйди на смену и получи оплату. Честно и прозрачно!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories" id="categories">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Разнообразие</div>
            <h2 className="section-title">Категории вакансий</h2>
            <p className="section-desc">От IT до промо — найдём работу под любые навыки и расписание</p>
          </div>
          <div className="categories__grid">
            <div className="cat-card" onClick={() => goCat('delivery')}><div className="cat-card__icon" style={{background:'#fff3e8'}}><i className="ph ph-moped"></i></div><h3>Доставка</h3></div>
            <div className="cat-card" onClick={() => goCat('it')}><div className="cat-card__icon" style={{background:'#e8f5f6'}}><i className="ph ph-laptop"></i></div><h3>IT и Digital</h3></div>
            <div className="cat-card" onClick={() => goCat('promo')}><div className="cat-card__icon" style={{background:'#fff3e8'}}><i className="ph ph-megaphone"></i></div><h3>Промо и события</h3></div>
            <div className="cat-card" onClick={() => goCat('food')}><div className="cat-card__icon" style={{background:'#fce8e8'}}><i className="ph ph-pizza"></i></div><h3>Общепит</h3></div>
            <div className="cat-card" onClick={() => goCat('retail')}><div className="cat-card__icon" style={{background:'#e8f5f6'}}><i className="ph ph-shopping-bag"></i></div><h3>Торговля</h3></div>
            <div className="cat-card" onClick={() => goCat('education')}><div className="cat-card__icon" style={{background:'#fff3e8'}}><i className="ph ph-books"></i></div><h3>Репетиторство</h3></div>
            <div className="cat-card" onClick={() => goCat('cleaning')}><div className="cat-card__icon" style={{background:'#fce8e8'}}><i className="ph ph-broom"></i></div><h3>Уборка</h3></div>
            <div className="cat-card" onClick={() => goCat('other')}><div className="cat-card__icon" style={{background:'#f0f0ff'}}><i className="ph-fill ph-sparkle"></i></div><h3>Другое</h3></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Реальные истории</div>
            <h2 className="section-title">Что говорят пользователи</h2>
          </div>
          <div className="testimonials__grid">
            <div className="review-card">
              <div className="review-card__avatar" style={{background:'#F48227'}}>А</div>
              <div className="review-card__body">
                <div className="review-stars"><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i></div>
                <p>"Учусь на 3-м курсе КГТУ. Нашёл подработку промоутером за 2 часа! Удобно выбирать дни самому."</p>
                <div className="review-author">Азиз К. — студент КГТУ</div>
              </div>
            </div>
            <div className="review-card">
              <div className="review-card__avatar" style={{background:'#29858D'}}>М</div>
              <div className="review-card__body">
                <div className="review-stars"><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i></div>
                <p>"Мама в декрете. Через Jumush Tap берy задания по дизайну удалённо — очень выручает финансово!"</p>
                <div className="review-author">Мира Д. — фрилансер</div>
              </div>
            </div>
            <div className="review-card">
              <div className="review-card__avatar" style={{background:'#F35029'}}>Б</div>
              <div className="review-card__body">
                <div className="review-stars"><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i><i className="ph-fill ph-star" style={{color: '#F48227'}}></i></div>
                <p>"Разместил вакансию для кафе — нашёл 3 официантов за день. Сервис работает отлично!"</p>
                <div className="review-author">Бакыт А. — работодатель</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <div className="cta__content">
            <h2>Готов начать зарабатывать?</h2>
            <p>Зарегистрируйся и получи доступ к тысячам вакансий прямо сейчас. Бесплатно!</p>
            <div className="cta__actions">
              {user ? (
                <Link to="/jobs" className="btn btn--white btn--lg"><i className="ph ph-magnifying-glass" style={{verticalAlign:'middle'}}></i> Смотреть вакансии</Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn--white btn--lg"><i className="ph ph-rocket" style={{verticalAlign:'middle'}}></i> Зарегистрироваться</Link>
                  <Link to="/login" className="btn btn--outline-white btn--lg">Войти в аккаунт</Link>
                </>
              )}
            </div>
          </div>
          <div className="cta__visual">
            <div className="cta__badge-float cta__badge-float--2"><i className="ph ph-coins"></i> От 500 с/ч</div>
            <div className="cta__badge-float cta__badge-float--3"><i className="ph-fill ph-lightning" style={{color:'#F48227'}}></i> Срочные задания</div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
