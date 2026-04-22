import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MOCK_JOBS } from '../data/mock';
import { toast } from '../components/Toast';

export default function JobDetail() {
  const { id } = useParams();
  const job = MOCK_JOBS.find(j => j.id == id);
  
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Check saved status
    const saved = JSON.parse(localStorage.getItem('jt_saved') || '[]');
    setIsSaved(saved.includes(job?.id));

    // Check applied status
    const apps = JSON.parse(localStorage.getItem('jt_apps') || '[]');
    setIsApplied(!!apps.find(a => a.jobId === job?.id));
  }, [job]);

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Вакансия не найдена</h2>
        <Link to="/jobs">Вернуться к списку</Link>
      </div>
    );
  }

  const handleSave = () => {
    let saved = JSON.parse(localStorage.getItem('jt_saved') || '[]');
    if (isSaved) {
      saved = saved.filter(savedId => savedId !== job.id);
      setIsSaved(false);
      toast('Удалено из сохранённых');
    } else {
      saved.push(job.id);
      setIsSaved(true);
      toast('Добавлено в сохранённые', 'success');
    }
    localStorage.setItem('jt_saved', JSON.stringify(saved));
  };

  const handleApply = () => {
    if (isApplied) return;
    let apps = JSON.parse(localStorage.getItem('jt_apps') || '[]');
    apps.push({ jobId: job.id, date: new Date().toISOString(), status: 'pending' });
    localStorage.setItem('jt_apps', JSON.stringify(apps));
    setIsApplied(true);
    toast('Вы успешно откликнулись!', 'success');
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '80px', padding: '2rem 1rem' }}>
        <Link to="/jobs" className="btn btn--outline" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
          <i className="ph ph-arrow-left"></i> Назад
        </Link>
        
        <div className="job-detail-card">
          <div className="job-detail-header">
            <div className="job-detail-logo" style={{ backgroundColor: job.color || '#F48227' }}>
              {job.logo ? <span dangerouslySetInnerHTML={{ __html: job.logo }}></span> : <i className="ph ph-briefcase"></i>}
            </div>
            <div className="job-detail-title-block">
              <h1>{job.title}</h1>
              <div className="job-detail-company">{job.company}</div>
              <div className="job-detail-meta">
                <span><i className="ph ph-map-pin"></i> {job.city} ({job.distance})</span>
                <span><i className="ph ph-clock"></i> {job.hours} ч.</span>
                <span><i className="ph ph-calendar"></i> {job.postedAt}</span>
              </div>
            </div>
            <div className="job-detail-salary">
              {job.salary} с/ч
            </div>
          </div>
          
          <div className="job-detail-body">
            <div className="job-detail-section">
              <h3>Описание</h3>
              <p>{job.description}</p>
            </div>
            <div className="job-detail-section">
              <h3>Требования</h3>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', color: 'var(--text-secondary)' }}>
                {job.requirements.map((req, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="job-detail-actions">
            <button 
              className={`btn ${isApplied ? 'btn--ghost' : 'btn--primary'} btn--lg`} 
              onClick={handleApply}
              disabled={isApplied}
            >
              {isApplied ? 'Отклик отправлен' : 'Откликнуться'}
            </button>
            <button className="btn btn--outline btn--lg" onClick={handleSave}>
              {isSaved ? <><i className="ph-fill ph-bookmark"></i> Сохранено</> : <><i className="ph ph-bookmark"></i> В закладки</>}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
