import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className={`job-card ${job.urgent ? 'urgent' : ''}`}>
      <div className="job-card__top">
        <div className="job-logo" style={{ backgroundColor: job.color || '#F4F6F8', color: 'white' }}>
          {job.logo ? <span dangerouslySetInnerHTML={{ __html: job.logo }} /> : '🏢'}
        </div>
        <div className="job-card__info">
          <div className="job-card__title">{job.title}</div>
          <div className="job-card__company">{job.company}</div>
        </div>
        <div className="job-card__right">
          <div className="job-salary">{job.salary}</div>
          <div className="job-salary-unit">с/ч</div>
        </div>
      </div>
      
      <div className="job-card__tags">
        <span className="filter-chip"><i className="ph ph-map-pin"></i> {job.distance}</span>
        <span className="filter-chip"><i className="ph ph-clock"></i> {job.hours}ч смена</span>
        {job.remote && <span className="filter-chip"><i className="ph ph-laptop"></i> Удалённо</span>}
      </div>

      <div className="job-card__footer">
        <div className="job-meta">
          {job.urgent && <div className="urgent-badge"><i className="ph-fill ph-fire"></i> Срочно</div>}
          <div className="job-meta-item"><i className="ph ph-calendar-blank"></i> {job.postedAt || 'Сегодня'}</div>
        </div>
        <button className="save-btn" onClick={(e) => { e.preventDefault(); }}>
          <i className="ph ph-bookmark-simple"></i>
        </button>
      </div>
    </Link>
  );
}
